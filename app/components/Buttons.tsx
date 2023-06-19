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

  const [isLoading, setIsLoading] = useState(true);

  // Create initial buttons array excluding the numbers already removed
  // const [buttons, setButtons] = useState(
  //   Array.from({ length: 500 }, (_, i) => i + 1).filter((num) =>
  //     removed ? !removed.includes(num) : true
  //   )
  // );
  const [buttons, setButtons] = useState(Array.from({ length: 500 }, (_, i) => i + 1));

  //

  const [blackOut, setBlackOut] = useState(null);

  const fetchBlackOut = async () => {
    const res = await fetch("/api/displayRemoved");
    const data = await res.json();
    console.log('BlackOut value from server:', data.blackOut);
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
          phone, // Add phone here
          numbers: reserved,
        }),
      });

      const result = await res.json();

      if (res.ok) {
        // After reserving numbers, fetch the updated list of removed numbers
        await fetchRemovedNumbers();
        setReserved([]);

        let baseMessage = `Hola, Aparte boletos de la rifa!! LOBO RAPTOR 2019!! \n \u{1F534} *1 BOLETO:* \n *${reserved.join(
          ", "
        )}* \n\n *Nombre:* ${name} \n *Celular:* ${phone} \n \u{1F535}1 BOLETO POR $67 \n 2 BOLETOS POR $129 \n 3 BOLETOS POR $193 \n 4 BOLETOS POR $255 \n 5 BOLETOS POR $310 \n 10 BOLETOS POR $599 \n 100 BOLETOS POR $5,900 \n \u{1F6AF} *CUENTAS DE PAGO AQUÍ:* www.rifaseconomicaschihuahua.com/pagos \n\n El siguiente paso es enviar foto del comprobante de pago por aquí`;
        let encodedMessage = encodeURIComponent(baseMessage);
        window.location.href = `https://wa.me/17026751900?text=${encodedMessage}`; // Your number
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

  // // new adittion handle display shwo or no shwo
  // const fetchDisplayRemoved = async () => {
  //   try {
  //     const res = await fetch("http://localhost:3000/api/displayRemoved");
  //     const data = await res.json();

  //     if (res.ok) {
  //       setDisplayRemoved(data.displayRemoved);
  //     } else {
  //       console.error(data.error);
  //     }
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // };

  // useEffect(() => {
  //   fetchDisplayRemoved();
  // }, []);

  //

  //
  // this here controols list update and color
  // Watch for changes in 'removed' state and update 'buttons' state accordingly
  // useEffect(() => {
  //   const availableNumbers = Array.from(
  //     { length: 500 },
  //     (_, i) => i + 1
  //   ).filter((num) => (removed ? !removed.includes(num) : true));
  //   console.log("Available numbers:", availableNumbers);

  //   setButtons(availableNumbers);
  // }, [removed]);
// Watch for changes in 'removed' state and update 'buttons' state accordingly
// useEffect(() => {
//   const availableNumbers = Array.from(
//     { length: 500 },
//     (_, i) => i + 1
//   ).filter((num) => (removed ? !removed.includes(num) : true));
//   console.log("Available numbers:", availableNumbers);

//   setButtons(availableNumbers);
// }, [removed]);

  // big change here

  // useEffect(() => {
  //   setButtons((prevButtons) => prevButtons.filter((num) => !removed.includes(num)));
  // }, [removed]);
  

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
              {/* {buttons.map((number) => {
                if (reserved?.includes(number) || removed?.includes(number)) {
                  return null;
                }
                return (
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-white hover:text-red-500 focus:outline-none active:translate-y-1 transform transition-all duration-100 ease-in-out"
                    key={number}
                    onClick={() => reserveTicket(number)}
                  >
                    {number}
                  </button>
                );
              })} */}



              {/* {buttons.map((number) => {
  const isReserved = reserved?.includes(number);
  const isRemoved = removed?.includes(number);

  if (!displayRemoved && (isReserved || isRemoved)) {
    return null;  // If displayRemoved is false, don't display removed or reserved numbers
  }

  return (
    <button
      className={
        isReserved || isRemoved
          ? "bg-black text-white px-4 py-2 rounded-full"
          : "bg-red-500 text-white px-4 py-2 rounded-full hover:bg-white hover:text-red-500"
      }
      key={number}
      onClick={() => !isRemoved && reserveTicket(number)}
      disabled={isReserved || isRemoved}
    >
      {number}
    </button>
  );
})} */}



{buttons.map((number) => {
  const isReserved = reserved?.includes(number);
  const isRemoved = removed?.includes(number);

  if (blackOut === false && isRemoved) {
    return null; // Don't display removed numbers when blackout is false
  }

  const buttonClass = blackOut && isRemoved
      ? "bg-black text-white px-4 py-2 rounded-full"
      : "bg-red-500 text-white px-4 py-2 rounded-full hover:bg-white hover:text-red-500";

  const handleOnClick = blackOut && isRemoved
      ? null
      : () => !isRemoved && reserveTicket(number);

  return (
    <button
      className={buttonClass}
      key={number}
      onClick={handleOnClick}
      disabled={blackOut && isRemoved || isReserved}
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
