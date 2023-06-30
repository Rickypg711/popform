import { useState, useEffect, FormEvent } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Modal from "./modal";
import Ruleta from "./Ruleta";
import Estados from "./Estados";
import { FixedSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";

export default function Buttons() {
  const [searchQuery, setSearchQuery] = useState("");
  const [reserved, setReserved] = useState<number[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [removed, setRemoved] = useState<number[]>([]);
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");

  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [state, setState] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [buttons, setButtons] = useState(
    Array.from({ length: 35000 }, (_, i) => i + 1)
  );

  const [blackOut, setBlackOut] = useState(null);

  // THIS HANDLES THE FORMSUMISION STATE
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false); // New state variable for success message
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
  // for black out
  const fetchBlackOut = async () => {
    const res = await fetch("/api/displayRemoved");
    const data = await res.json();
    console.log("BlackOut value from server:", data.blackOut);
    setBlackOut(data.blackOut);
  };

  useEffect(() => {
    fetchBlackOut();
  }, []);
  // to check numbes on data base
  const fetchRemovedNumbers = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/reservedNumbers");
      const data = await res.json();

      if (res.ok) {
        setRemoved(data);
        // setIsLoading(false);
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

    // Check if all inputs are filled out
    if (!name || !email || !phone || !state || reserved.length === 0) {
      setErrorMessage("Please fill out all fields.");
      return;
    }

    // Validate phone number
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phone)) {
      setErrorMessage("Please enter a valid phone number.");
      return;
    }

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
          lastName,
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
        setIsFormSubmitted(true); // Set the form submission status

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
    setIsFormSubmitted(true); // Set the form submission status
    setShowSuccessMessage(true); // Show the success message
  };

  const handleSelection = (selectedTickets: number[]) => {
    setReserved([...reserved, ...selectedTickets]);
    setShowModal(true); // Open the modal form
  };

  //
  // This will give you an array of arrays, where each inner array has groupSize elements
  const filteredButtons = buttons.filter((number) =>
    number.toString().includes(searchQuery)
  );

  const groupedButtons = filteredButtons.reduce<number[][]>(
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

  const handleSearch = () => {
    const numberExists = buttons.some((button) =>
      button.toString().includes(searchQuery)
    );

    if (!numberExists) {
      setErrorMessage(
        "¡Ese número no existe! 🎟️🤷🏽‍♂️ ¡Inténtalo de nuevo con otro número de la suerte! 🍀"
      );
    } else {
      setErrorMessage(""); // Limpiar el mensaje de error si no hay errores
    }
  };

  useEffect(() => {
    if (isFormSubmitted) {
      window.location.reload(); // Reload the page
    }
  }, [isFormSubmitted]);

  // uUI  dounw here
  //
  //
  //
  //
  //
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

      <Ruleta onSelection={handleSelection} Butt={buttons} removed={removed} />

      {/* SEARCH BAR DOWN HERE  */}

      <div className="">
        <input
          className="text-center shadow appearance-none border rounded w-full   text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          placeholder="🍀  BUSCA TU NUMERO DE LA SUERTE 🍀"
          value={searchQuery}
          onChange={(e) => {
            const input = e.target.value;
            const regex = /^[0-9]*$/; // Regular expression to match numbers only

            if (regex.test(input)) {
              setSearchQuery(input);
              setErrorMessage(""); // Clear the error message if there are no errors
            } else {
              setErrorMessage("Invalid input! Please enter numbers only.");
            }

            handleSearch(); // Call handleSearch function on input change
          }}
        />

        <p className="text-2xl md:text-3xl text-center my-4">{errorMessage}</p>
      </div>

      {/* SEARCH BAR */}

      {reserved.length > 0 && (
        <div
          className="
          flex flex-col 
          items-center 
          mt-4 
          bg-white 
          shadow-sm 
          rounded-lg 
          p-4"
        >
          <h2 className="text-center text-2xl font-semibold text-gray-700 mb-2">
            ESTOS SON TUS TICKETS :
          </h2>
          <p className="text-center text-gray-600 mb-4">
            {reserved.join(", ")}
          </p>
          <button
            className="
            mt-1 
            bg-red-500 
            text-white 
            block 
            w-full 
            rounded-md 
            border-red-700 
            shadow-sm 
            hover:bg-red-700 
            focus:border-red-300 
            focus:ring focus:ring-red-200 
            focus:ring-opacity-50 
            transition-colors 
            duration-200"
            onClick={() => setShowModal(true)}
          >
            APARTA YA 👆
          </button>
        </div>
      )}
      {/*  aqui reserveas o eliminas buttons*/}

      {reserved.length > 0 && (
        <aside
          className="list__tickets show mt-3 "
          style={{ borderColor: "rgb(55, 94, 151)" }}
        >
          <p className="text-center"> Para remover haz click en el boleto</p>

          <section
            className="list__tickets-reserved-container text-center my-3 mb-6 "
            style={{ overflow: "auto", maxHeight: "80px" }}
          >
            {reserved.map((index) => (
              <button
                className="list__button m-2 bg-yellow-300 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded-lg"
                key={index}
                onClick={() => reserveTicket(index)}
              >
                {index}
              </button>
            ))}
          </section>
          <section className="list__tickets-reserved-container text-center">
            <small>
              {" "}
              {reserved.length} BOLETO{reserved.length > 1 ? "S" : ""}{" "}
              SELECCIONADO{reserved.length > 1 ? "S" : ""}
            </small>
            <button
              className="list__button m-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg"
              onClick={() => setReserved([])}
            >
              Remover Todos
            </button>
          </section>
          {/* <small>Para remover haz click en el boleto</small> */}
        </aside>
      )}

      <div className="h-96 overflow-y-scroll mt-5 px-4 w-full mb-1">
        <AutoSizer>
          {({ height, width }: Size) => (
            <List
              className="List"
              height={height}
              itemCount={groupedButtons.length}
              itemSize={55}
              width={width}
            >
              {({ index, style }) => {
                const group = groupedButtons[index];

                return (
                  <div style={style}>
                    {filteredButtons.length === 0 ? (
                      <p>No matching numbers found.</p>
                    ) : (
                      <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-7 lg:grid-cols-11 gap-4">
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
                              {!isRemoved && ( // Check if the button is not removed
                                <button
                                  className={`${buttonClass} m-1`}
                                  onClick={handleOnClick}
                                  disabled={
                                    (blackOut && isRemoved) || isReserved
                                  }
                                >
                                  {number}
                                </button>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}
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
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 text-center"
            onSubmit={handleSubmit}
          >
            {/* nombre */}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="name"
              >
                Nombre
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="name"
                type="text"
                placeholder="Ingresa tu Nombre"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required // Added required attribute
              />
            </div>
            {/* appelido */}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="lastName"
              >
                Apellido
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="lastName"
                type="text"
                placeholder="Ingresa tu Apellido"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required // Added required attribute
              />
            </div>

            {/* phone */}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="phone"
              >
                Numero de WhatsApp
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="phone"
                type="tel"
                placeholder="Ingresa Tu Numero de WhatsApp"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                maxLength={10} // Set the maximum length to 10 digits
                required // Added required attribute
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
                placeholder="Ingresa tu Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required // Added required attribute
              />
            </div>
            {/* estado */}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="state"
              >
                Estado
              </label>
              <Estados
                value={state}
                onChange={handleStateChange}
                required // Added required attribute
              />
            </div>
            <div className="flex flex-col items-center mt-4 bg-white rounded-lg p-4">
              <p>Estos son Tus Boletos:</p>
              <ul className="flex text-center">
                {reserved.map((index) => (
                  <li className="text-red-300 inline-block mx-2" key={index}>
                    {index}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex items-center justify-center ">
              <button
                className="bg-blue-500 shadow-sm  hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
                disabled={isFormSubmitted} // Disable the button when form is submitted
              >
                {isFormSubmitted ? "Mandando...👍" : "APARTAR "}
              </button>
            </div>
            <p className="mt-5 text-center text-red-500 text-xs">
              ¡Al finalizar serás redirigido a whatsapp para enviar la
              información de tu boleto! Tu boleto sólo dura 24 horas apartado
            </p>
          </form>
        </div>
      </Modal>
      {/*  */}
    </div>
  );
}
