import { useState, useEffect } from "react";
import AccountsForm from "./AccountsForm";

export default function SettModal({ isVisible, onClose }) {
  const [config, setConfig] = useState({
    accounts: "",
    reservationTime: "",
    drawDate: "",
    blackOut: true,
  });

  const [message, setMessage] = useState("");
  const [showAccountsForm, setShowAccountsForm] = useState(false);

  useEffect(() => {
    const fetchPlaceholderMessage = async () => {
      const res = await fetch("/api/whatsappmessage");
      if (res.ok) {
        const data = await res.json();
        setMessage(data.message);
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

  const handleBlackOutChange = (e) => {
    setConfig({
      ...config,
      blackOut: e.target.value === "Yes",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (config.drawDate !== "") {
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

    const res3 = await fetch("/api/displayRemoved", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ blackOut: config.blackOut }),
    });

    if (!res3.ok) {
      console.error("Failed to post blackOut value");
      return;
    }

    onClose();
  };

  const handleClose = (e) => {
    if (e.target.id === "wrapper") {
      onClose();
    }
  };

  // const handleBankInfoSubmit = async (bankInfo) => {
  //   const resBankInfo = await fetch("/api/bankInfo", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(bankInfo),
  //   });

  //   if (!resBankInfo.ok) {
  //     console.error("Failed to post bank info");
  //     return;
  //   }

  //   // onClose(); // close the modal if required
  // };

  if (!isVisible) {
    return null;
  }

  return (
    isVisible && (
      <div
        className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center"
        id="wrapper"
        onClick={handleClose}
      >
        <div className="bg-white w-[600px] rounded-lg overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle">
          <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
            <div>
              <button
                onClick={() => setShowAccountsForm(false)}
                className={`text-lg leading-6 font-medium ${
                  !showAccountsForm ? "text-blue-500" : "text-gray-400"
                }`}
              >
                Config
              </button>
              <button
                onClick={() => setShowAccountsForm(true)}
                className={`ml-4 text-lg leading-6 font-medium ${
                  showAccountsForm ? "text-blue-500" : "text-gray-400"
                }`}
              >
                Accounts
              </button>
            </div>
            <button
              className="text-gray-400 hover:text-gray-500"
              onClick={onClose}
            >
              <span className="sr-only">Close</span>
              {/* Icon X */}x
            </button>
          </div>
          <div className="px-4 py-5 sm:p-6">
            {showAccountsForm ? (
              <AccountsForm 
              // handleBankInfoSubmit={handleBankInfoSubmit} 
              />
            ) : (
              // ...

              // Your existing form JSX...

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
                    htmlFor="blackOut"
                    className="block text-sm font-medium text-gray-700"
                  >
                    BlackOut
                  </label>
                  <div>
                    <label>
                      <input
                        type="radio"
                        value="Yes"
                        name="blackOut"
                        checked={config.blackOut === true}
                        onChange={handleBlackOutChange}
                      />{" "}
                      Yes
                    </label>
                    <label>
                      <input
                        type="radio"
                        value="No"
                        name="blackOut"
                        checked={config.blackOut === false}
                        onChange={handleBlackOutChange}
                      />{" "}
                      No
                    </label>
                  </div>
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
            )}
          </div>
          <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
            {!showAccountsForm && (
              <button
                type="submit"
                onClick={handleSubmit}
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Submit
              </button>
            )}
          </div>

        </div>
      </div>
    )
  );
}
