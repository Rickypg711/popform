import { useState, useEffect, FormEvent } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Modal from "./modal";
import Ruleta from "./Ruleta";
import Estados from "./Estados";
import { FixedSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";

export default function Buttons() {
  const [hasMore, setHasMore] = useState(true);
  const [reserved, setReserved] = useState<number[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [removed, setRemoved] = useState<number[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [state, setState] = useState("");

  const [isLoading, setIsLoading] = useState(true);

  const [buttons, setButtons] = useState(
    Array.from({ length: 35000 }, (_, i) => i + 1)
  );

  const [blackOut, setBlackOut] = useState(null);

  // ruleta handling show numbers
  const [groupSize, setGroupSize] = useState(getGroupSize());

  function getGroupSize() {
    if (typeof window !== "undefined") {
      if (window.innerWidth < 768) {
        return 4; // For small screens
      } else if (window.innerWidth < 1024) {
        return 8; // For medium screens
      } else {
        return 11; // For large screens
      }
    } else {
      return 4; // Default to large screens if window is undefined
    }
  }
  useEffect(() => {
    function handleResize() {
      setGroupSize(getGroupSize());
    }

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // setting states up

  interface Size {
    height: number;
    width: number;
  }

  const fetchBlackOut = async () => {
    const res = await fetch("/api/displayRemoved");
    const data = await res.json();
    console.log("BlackOut value from server:", data.blackOut);
    setBlackOut(data.blackOut);
  };

  useEffect(() => {
    fetchBlackOut();
  }, []);

  const fetchRemovedNumbers = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/reservedNumbers");
      const data = await res.json();

      if (res.ok) {
        setRemoved(data);
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

  const reserveTicket = (number: number) => {
    if (reserved.includes(number)) {
      setReserved(reserved.filter((i) => i !== number));
    } else {
      setReserved([...reserved, number]);
    }
  };

  const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setState(e.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setShowModal(false);

    let countryCode;
    if (state === "ESTADOS UNIDOS") {
      countryCode = "+1";
    } else {
      countryCode = "+52 1";
    }

    const phoneNumber = `${countryCode}${phone}`;

    try {
      const res = await fetch("http://localhost:3000/api/reservedNumbers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          phone: phoneNumber,
          numbers: reserved,
          state,
        }),
      });

      const result = await res.json();

      if (res.ok) {
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

        if (message !== "") {
          const formattedMessage = message
            .replace(/ENTER ENTER/g, "\n")
            .replace(/\\u([\d\w]{4})/gi, (match, grp) =>
              String.fromCharCode(parseInt(grp, 16))
            );

          encodedMessage += formattedMessage;
        }

        window.open(`https://wa.me/17026751900?text=${encodedMessage}`);
      } else {
        console.error(result.error);
      }
    } catch (error) {
      console.error("Error:", error);
    }

    setName("");
    setEmail("");
    setPhone("");
  };

  const handleSelection = (selectedTickets: number[]) => {
    setReserved([...reserved, ...selectedTickets]);
    setShowModal(true); // Open the modal form
  };

  //

  // This will give you an array of arrays, where each inner array has groupSize elements
  const groupedButtons = buttons.reduce<number[][]>(
    (grouped, button, index) => {
      const groupIndex = Math.floor(index / groupSize);

      if (!grouped[groupIndex]) {
        grouped[groupIndex] = [];
      }

      grouped[groupIndex].push(button);

      return grouped;
    },
    []
  );

  //

  return (
    <div
      className=" w-full
       px-4 
      buttons-container "
    >
      <h1
        className="
    text-4xl sm:text-5xl lg:text-6xl font-bold text-center text-yellow-300
    mt-8 mb-4
  "
      >
        ELIGE UNA OPCION
      </h1>
      <p
        className="
    text-lg sm:text-xl lg:text-2xl text-center text-black font-semibold 
    bg-yellow-300 p-2 rounded shadow-md
  "
      >
        HAZ CLICK ABAJO EN TU NÚMERO DE LA SUERTE
      </p>
      <div className="flex justify-center mt-4">
        <span className="text-4xl animate-bounce">&#8595;</span>
      </div>

      {/* <Ruleta onSelection={handleSelection} Butt={buttons} removed={removed} /> */}
      <Ruleta onSelection={handleSelection} Butt={buttons} removed={removed} />
      {/* <div className="flex justify-center mt-4">
        <span className="text-4xl animate-bounce">&#8593;</span>
      </div> */}

      {reserved.length > 0 && (
        <div
          className="
        flex flex-col items-center mt-4"
        >
          <h2 className="text-center">Selected tickets:</h2>
          <p className="text-center">{reserved.join(", ")}</p>
          <button className="mt-4" onClick={() => setShowModal(true)}>
            Confirm selection
          </button>
        </div>
      )}
      {/*  aqui reserveas o eliminas buttons*/}

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

      <div className="h-96 overflow-y-scroll mt-5 px-4 w-full">
        <AutoSizer>
          {({ height, width }: Size) => (
            <List
              className="List"
              height={height}
              itemCount={groupedButtons.length}
              itemSize={35}
              width={width}
            >
              {({ index, style }) => {
                const group = groupedButtons[index];

                return (
                  <div
                    className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-7 lg:grid-cols-11 gap-4"
                    style={style}
                  >
                    {group.map((number) => {
                      const isReserved = reserved?.includes(number);
                      const isRemoved = removed?.includes(number);

                      if (blackOut === false && isRemoved) {
                        return null; // Don't display removed numbers when blackout is false
                      }

                      const buttonClass =
                        blackOut && isRemoved
                          ? "bg-black text-white px-4 py-2 my-2 rounded-md"
                          : "bg-yellow-300 text-black px-4 py-2 my-2 rounded-md hover:bg-white hover:text-yellow-300";

                      const handleOnClick =
                        blackOut && isRemoved
                          ? undefined
                          : () => !isRemoved && reserveTicket(number);

                      return (
                        <div key={number} className="">
                          <button
                            className={buttonClass}
                            onClick={handleOnClick}
                            disabled={(blackOut && isRemoved) || isReserved}
                          >
                            {number}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                );
              }}
            </List>
          )}
        </AutoSizer>
      </div>
      {/*  */}
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
              <Estados value={state} onChange={handleStateChange} />
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
