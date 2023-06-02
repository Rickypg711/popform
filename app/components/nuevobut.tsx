


// big change here 
import { useState, useEffect, FormEvent } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Modal from "./modal";

export default function Buttons() {
  const [hasMore, setHasMore] = useState(true);
  const [reserved, setReserved] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [removed, setRemoved] = useState([1, 15, 24, 417]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // Create initial buttons array excluding the numbers already removed
  const [buttons, setButtons] = useState(Array.from({ length: 500 }, (_, i) => i + 1).filter(num => !removed.includes(num)));

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

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setShowModal(false); // hide the modal

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

    if (res.ok) {
      setRemoved([...removed, ...reserved]);
      setReserved([]);
    } else {
      console.error("An error occurred while processing the request.");
    }

    const result = await res.json();
    console.log(result);

    // Reset name and email fields
    setName("");
    setEmail("");
  };

  // Watch for changes in 'removed' state and update 'buttons' state accordingly
  useEffect(() => {
    const availableNumbers = Array.from({ length: 500 }, (_, i) => i + 1).filter(num => !removed.includes(num));
    setButtons(availableNumbers);
  }, [removed]);

  // The rest of your component code...


  // The rest of your component code...}


// big change here 

  return (
    <div>
      <p>HAZ CLICK ABAJO EN TU NÚMERO DE LA SUERTE</p>

      <section className="h-96 overflow-y-scroll mt-5 px-4 w-full">
        <InfiniteScroll
          dataLength={buttons.length}
          // next={fetchMoreData}
          hasMore={hasMore}
          loader={<h4 className="animate-pulse">Loading...</h4>}
          endMessage={
            <p className="text-center font-bold mt-5">
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          <div className="grid grid-cols-4 gap-1 place-items-center py-4">
        {buttons.map((number) => {
          if (reserved.includes(number) || removed.includes(number)) {
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
