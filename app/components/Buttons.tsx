// big change here
import { useState, useEffect, FormEvent } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Modal from "./modal";

export default function Buttons() {
  const [hasMore, setHasMore] = useState(true);
  const [reserved, setReserved] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [removed, setRemoved] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState(""); // Add the message state
  const [state, setState] = useState("");

  const [isLoading, setIsLoading] = useState(true);

  const [buttons, setButtons] = useState(
    Array.from({ length: 500 }, (_, i) => i + 1)
  );

  //

  const [blackOut, setBlackOut] = useState(null);

  const fetchBlackOut = async () => {
    const res = await fetch("/api/displayRemoved");
    const data = await res.json();
    console.log("BlackOut value from server:", data.blackOut);
    setBlackOut(data.blackOut);
  };

  useEffect(() => {
    fetchBlackOut();
  }, []);

  // useEffect(() => {
  const fetchRemovedNumbers = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/reservedNumbers");
      const data = await res.json();

      if (res.ok) {
        setRemoved(data);
        // Set isLoading to false when data has been successfully fetched
        setIsLoading(false);
      } else {
        console.error(data.error);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchRemovedNumbers();
  }, []);

  //
  console.log("Reserved: ", reserved);
  console.log("Removed: ", removed);
  console.log("Buttons: ", buttons);

  const reserveTicket = (number) => {
    if (reserved.includes(number)) {
      setReserved(reserved.filter((i) => i !== number));
    } else {
      setReserved([...reserved, number]);
    }
  };

  // let see handle submit
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setShowModal(false);

    let countryCode;
    if (state === "ESTADOS UNIDOS") {
      countryCode = "+1";
    } else {
      countryCode = "+52 1";
    }

    // append country code to phone number
    const phoneNumber = `${countryCode}${phone}`;

    try {
      // Send data to API route
      const res = await fetch("http://localhost:3000/api/reservedNumbers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          phone: phoneNumber, // Use the phoneNumber with the country code
          numbers: reserved,
          state,
        }),
      });

      const result = await res.json();

      if (res.ok) {
        // After reserving numbers, fetch the updated list of removed numbers
        await fetchRemovedNumbers();
        setReserved([]);

        let baseMessage = `Hola, Aparte boletos de la rifa!! LOBO RAPTOR 2019! 🎟️
  \n✨ *1 BOLETO RESERVADO:*
  *${reserved.join(", ")}*
  \n✏️ *Nombre:* ${name}
  ☎️ *Teléfono:* ${phone}
  💲 *PRECIOS DE LOS BOLETOS:*
  1 BOLETO: $67
  2 BOLETOS: $129
  3 BOLETOS: $193
  4 BOLETOS: $255
  5 BOLETOS: $310
  10 BOLETOS: $599
  100 BOLETOS: $5,900
  🌐 *PAGO EN LÍNEA:* www.rifaseconomicaschihuahua.com/pagos
  \n📸 Una vez realizado el pago, por favor envía una foto del comprobante de pago aquí.`;

        let encodedMessage = encodeURI(baseMessage);

        // Format the message with emojis and newlines
        if (message !== "") {
          const formattedMessage = message
            .replace(/ENTER ENTER/g, "\n")
            .replace(/\\u([\d\w]{4})/gi, (match, grp) =>
              String.fromCharCode(parseInt(grp, 16))
            );

          encodedMessage += formattedMessage;
        }

        window.open(`https://wa.me/17026751900?text=${encodedMessage}`); // Open in a new tab
      } else {
        console.error(result.error);
      }
    } catch (error) {
      console.error("Error:", error);
    }

    setName("");
    setEmail("");
    setPhone(""); // clear phone state
  };

  return (
    <div>
      <h1>titulo por cambiar </h1>
      <p>HAZ CLICK ABAJO EN TU NÚMERO DE LA SUERTE</p>

      <section className="h-96 overflow-y-scroll mt-5 px-4 w-full">
        <InfiniteScroll
          dataLength={buttons.length}
          hasMore={hasMore}
          loader={<h4 className="animate-pulse">Loading...</h4>}
          endMessage={
            <p className="text-center font-bold mt-5">
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          {isLoading ? (
            <h4 className="animate-pulse">Loading...</h4>
          ) : (
            <div className="grid grid-cols-4 gap-1 place-items-center py-4">
              {buttons.map((number) => {
                const isReserved = reserved?.includes(number);
                const isRemoved = removed?.includes(number);

                if (blackOut === false && isRemoved) {
                  return null; // Don't display removed numbers when blackout is false
                }

                const buttonClass =
                  blackOut && isRemoved
                    ? "bg-black text-white px-4 py-2 rounded-full"
                    : "bg-red-500 text-white px-4 py-2 rounded-full hover:bg-white hover:text-red-500";

                const handleOnClick =
                  blackOut && isRemoved
                    ? null
                    : () => !isRemoved && reserveTicket(number);

                return (
                  <button
                    className={buttonClass}
                    key={number}
                    onClick={handleOnClick}
                    disabled={(blackOut && isRemoved) || isReserved}
                  >
                    {number}
                  </button>
                );
              })}
            </div>
          )}
        </InfiniteScroll>
      </section>
      {/*  */}
      {/*  */}
      {reserved.length > 0 && (
        <aside
          className="list__tickets show"
          style={{ borderColor: "rgb(55, 94, 151)" }}
        >
          <button
            className="list__tickets-button"
            style={{ borderColor: "rgb(55, 94, 151)" }}
            onClick={() => setShowModal(true)}
          >
            Apartar
          </button>
          <section
            className="list__tickets-reserved-container"
            style={{ overflow: "auto", maxHeight: "80px" }}
          >
            {reserved.map((index) => (
              <button
                className="list__button"
                style={{ borderColor: "rgb(55, 94, 151)", fontSize: "14px" }}
                key={index}
                onClick={() => reserveTicket(index)}
              >
                remove {index}
              </button>
            ))}
          </section>
          <section className="list__tickets-reserved-container">
            <small>
              {" "}
              {reserved.length} BOLETO{reserved.length > 1 ? "S" : ""}{" "}
              SELECCIONADO{reserved.length > 1 ? "S" : ""}
            </small>
          </section>
          <small>Para remover haz click en el boleto</small>
        </aside>
      )}

      {/*  */}
      <Modal
        isVisible={showModal}
        onClose={() => setShowModal(false)}
        reserved={reserved}
      >
        <div className="max-w-md mx-auto">
          <form
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
            onSubmit={handleSubmit}
          >
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="name"
              >
                Name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="name"
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            {/* phone */}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="phone"
              >
                Phone
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="phone"
                type="tel"
                placeholder="Enter your phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            {/* email */}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            {/* estado */}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="state"
              >
                State
              </label>
              <select
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="state"
                value={state}
                onChange={(e) => setState(e.target.value)}
              >
                <option value="">SELECCIONA ESTADO</option>
                <option value="ESTADOS UNIDOS">ESTADOS UNIDOS</option>
                <option value="OTRO PAIS">OTRO PAIS</option>
                <option value="AGUASCALIENTES">AGUASCALIENTES</option>
                <option value="BAJA CALIFORNIA">BAJA CALIFORNIA</option>
                <option value="BAJA CALIFORNIA SUR">BAJA CALIFORNIA SUR</option>
                <option value="CAMPECHE">CAMPECHE</option>
                <option value="CIUDAD DE MÉXICO">CIUDAD DE MÉXICO</option>
                <option value="COAHUILA">COAHUILA</option>
                <option value="COLIMA">COLIMA</option>
                <option value="CHIAPAS">CHIAPAS</option>
                <option value="CHIHUAHUA">CHIHUAHUA</option>
                <option value="DURANGO">DURANGO</option>
                <option value="ESTADO DE MÉXICO">ESTADO DE MÉXICO</option>
                <option value="GUANAJUATO">GUANAJUATO</option>
                <option value="GUERRERO">GUERRERO</option>
                <option value="HIDALGO">HIDALGO</option>
                <option value="JALISCO">JALISCO</option>
                <option value="MICHOACÁN">MICHOACÁN</option>
                <option value="MORELOS">MORELOS</option>
                <option value="NAYARIT">NAYARIT</option>
                <option value="NUEVO LEÓN">NUEVO LEÓN</option>
                <option value="OAXACA">OAXACA</option>
                <option value="PUEBLA">PUEBLA</option>
                <option value="QUERÉTARO">QUERÉTARO</option>
                <option value="QUINTANA ROO">QUINTANA ROO</option>
                <option value="SAN LUIS POTOSÍ">SAN LUIS POTOSÍ</option>
                <option value="SINALOA">SINALOA</option>
                <option value="SONORA">SONORA</option>
                <option value="TABASCO">TABASCO</option>
                <option value="TAMAULIPAS">TAMAULIPAS</option>
                <option value="TLAXCALA">TLAXCALA</option>
                <option value="VERACRUZ">VERACRUZ</option>
                <option value="YUCATÁN">YUCATÁN</option>
                <option value="ZACATECAS">ZACATECAS</option>
              </select>
            </div>
            <div className="bg-white p-2 rounded">
              <p>These numbers have been reserved:</p>
              <ul className="flex">
                {reserved.map((index) => (
                  <li className="text-red-300 inline-block mx-2" key={index}>
                    {index}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </Modal>
      {/*  */}
    </div>
  );
}
