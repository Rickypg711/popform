import { useState, useEffect } from "react";

export default function SettModal({ isVisible, onClose }) {
  const [config, setConfig] = useState({
    accounts: "",
    reservationTime: 5,
    drawDate: "",
  });
  const [message, setMessage] = useState("");
  const [placeholderMessage, setPlaceholderMessage] = useState("");

  useEffect(() => {
    const fetchPlaceholderMessage = async () => {
      const res = await fetch("/api/whatsappmessage"); // Make sure to replace with the actual endpoint
      if (res.ok) {
        const data = await res.json();
        setPlaceholderMessage(data.message);
        setMessage(data.message); // initialize the message with the placeholder
      } else {
        console.error("Failed to fetch placeholder message");
      }
    };

    fetchPlaceholderMessage();
  }, []);

  const handleChange = (e) => {
    setConfig({
      ...config,
      [e.target.name]: e.target.value,
    });
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent form from reloading the page
  
    if (config.drawDate !== "") {
      // Only send the request if drawDate is not empty
      const res1 = await fetch("/api/title", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: config.drawDate }),
      });
  
      if (!res1.ok) {
        console.error("Failed to post drawDate");
        return;
      }
    }
  
    if (message !== "") {
      // Only send the request if the message is not empty
      const formattedMessage = message
        .replace(/ENTER ENTER/g, "\n")
        .replace(/\\u([\d\w]{4})/gi, (match, grp) =>
          String.fromCharCode(parseInt(grp, 16))
        );
  
      const res2 = await fetch("/api/whatsappmessage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: formattedMessage }),
      });
  
      if (!res2.ok) {
        console.error("Failed to post whatsapp message");
        return;
      }
    }
  
    // Close the modal only if no errors occurred
    onClose();
  }; // This was missing
  

  if (!isVisible) {
    return null;
  }

  const handleClose = (e) => {
    if (e.target.id === "wrapper") {
      onClose();
    }
  };

  return (
    isVisible && (
      <div
        className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center"
        id="wrapper"
        onClick={handleClose}
      >
        <div className="bg-white w-[600px] rounded-lg overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle">
          <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
            <h2 className="text-lg leading-6 font-medium text-gray-900">
              Config
            </h2>
            <button
              className="text-gray-400 hover:text-gray-500"
              onClick={onClose}
            >
              <span className="sr-only">Close</span>
              {/* Icon X */}x
            </button>
          </div>
          <div className="px-4 py-5 sm:p-6">
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="accounts"
                  className="block text-sm font-medium text-gray-700"
                >
                  Cuentas
                </label>
                <input
                  type="text"
                  name="accounts"
                  id="accounts"
                  value={config.accounts}
                  onChange={handleChange}
                  className="mt-1 block w-full shadow-sm sm:text-sm rounded-md"
                />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="whatsapp"
                  className="block text-sm font-medium text-gray-700"
                >
                  Whatsapp
                </label>
                <input
                  type="text"
                  name="whatsapp"
                  id="whatsapp"
                  value={message}
                  onChange={handleMessageChange}
                  className="mt-1 block w-full shadow-sm sm:text-sm rounded-md text-red-300"
                />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="reservationTime"
                  className="block text-sm font-medium text-gray-700"
                >
                  Tiempo de reserva
                </label>
                <input
                  type="number"
                  name="reservationTime"
                  id="reservationTime"
                  value={config.reservationTime}
                  onChange={handleChange}
                  className="mt-1 block w-full shadow-sm sm:text-sm rounded-md text-red-300"
                />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="drawDate"
                  className="block text-sm font-medium text-gray-700"
                >
                  Fecha de sorteo
                </label>
                <input
                  type="date"
                  name="drawDate"
                  id="drawDate"
                  value={config.drawDate}
                  onChange={handleChange}
                  className="mt-1 block w-full shadow-sm sm:text-sm rounded-md"
                />
              </div>
            </div>
          </div>
          <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
            <button
              type="submit"
              onClick={handleSubmit}
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    )
  );
}