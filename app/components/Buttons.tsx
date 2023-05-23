
import { useState, useEffect, FormEvent } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Modal from "./modal";

export default function Buttons() {
  // const [buttons, setButtons] = useState(Array.from({ length: 600 }));
  const [hasMore, setHasMore] = useState(true);
  const [reserved, setReserved] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showAside, setShowAside] = useState(false);
  const [removed, setRemoved] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const availableNumbers = Array.from({ length: 600 })
  .map((_, index) => index)
  .filter((index) => !reserved.includes(index) && !removed.includes(index));

const [buttons, setButtons] = useState(availableNumbers);

  const fetchMoreData = () => {
    if (buttons.length - removed.length >= 30000) {
      setHasMore(false);
      return;
    }

    setTimeout(() => {
      const newButtons = [];
      for (let i = 0; i < 200; i++) {
        let index = buttons.length + i;
        while (reserved.includes(index) || removed.includes(index)) {
          index++;
        }
        newButtons.push(index);
      }
      setButtons([...buttons.filter((_, index) => !removed.includes(index)), ...newButtons]);
    }, 1000);
  };

  const reserveTicket = (index) => {
    if (reserved.includes(index)) {
      setReserved(reserved.filter((i) => i !== index));
    } else {
      setReserved([...reserved, index]);
    }
  };

  const handleClick = () => {
    setShowModal(true);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setShowModal(false); // hide the modal
    setRemoved([...removed, ...reserved]);
    setReserved([]);
    setShowAside(false);

    // Send data to API route
    const res = await fetch("http://localhost:3000/api/reservedNumbers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        numbers: reserved,
      }),
    });
    // 
    if (res.ok) {
      // Remove reserved numbers from the available buttons
      const updatedButtons = buttons.filter((_, index) => !reserved.includes(index));
      setButtons(updatedButtons);
    } else {
      console.error("An error occurred while processing the request.");
    }
    // 

    const result = await res.json();
    console.log(result);


    // Reset name and email fields
    setName("");
    setEmail("");
  };

  return (
    <div>
      <p>HAZ CLICK ABAJO EN TU NÚMERO DE LA SUERTE</p>

      <section className="h-96 overflow-y-scroll mt-5 px-4 w-full">
        <InfiniteScroll
          dataLength={buttons.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={<h4 className="animate-pulse">Loading...</h4>}
          endMessage={
            <p className="text-center font-bold mt-5">
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          <div className="grid grid-cols-4 gap-1 place-items-center py-4">
            {buttons.map((_, index) => {
              if (reserved.includes(index) || removed.includes(index)) {
                return null;
              }
              return (
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-white hover:text-red-500 focus:outline-none active:translate-y-1 transform transition-all duration-100 ease-in-out"
                  key={index}
                  onClick={() => reserveTicket(index)}
                >
                  {index}
                </button>
              );
            })}
          </div>
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
            onClick={() => handleClick()}
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
