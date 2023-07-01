"sue client";
import { useState, useEffect } from "react";
import AccountsForm from "./AccountsForm";

interface SettModalProps {
  isVisible: boolean;
  onClose: () => void;
}
const phoneRegEx =
  /^((\+\d{1,2}\s?)?((\(\d{1,3}\))|\d{1,3})[-.\s]?)?(\d{3}[-.\s]?\d{4})$/;

const SettModal: React.FC<SettModalProps> = ({ isVisible, onClose }) => {
  // Add these fields to the initial state
  const [config, setConfig] = useState({
    phoneNumber: "",
    reservationTime: "",
    fechaDeSorteo: "", // <-- Field name is fechaDeSorteo
    blackOut: true,
    rifa: "",
    bono: "",
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfig({
      ...config,
      [e.target.name]: e.target.value,
    });
  };

  const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const handleBlackOutChange = () => {
    setConfig({
      ...config,
      blackOut: !config.blackOut,
    });
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    // fecha change
    if (config.fechaDeSorteo !== "") {
      const res1 = await fetch("/api/config/fechaDeSorteo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fechaDeSorteo: config.fechaDeSorteo }),
      });

      if (!res1.ok) {
        console.error("Failed to post fechaDeSorteo");
        return;
      }
    }

    // message change
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
    // blaxk out
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
    // 4 submit number
    if (config.phoneNumber !== "") {
      // Validate the phone number format
      if (!phoneRegEx.test(config.phoneNumber)) {
        alert("Please enter a valid phone number.");
        return;
      }

      const res4 = await fetch("/api/config/phoneNumber", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phoneNumber: config.phoneNumber }),
      });

      if (!res4.ok) {
        console.error("Failed to post phone number");
        return;
      }
    }

    if (config.rifa !== "") {
      const resRifa = await fetch("/api/config/rifaYbono", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ rifa: config.rifa }),
      });

      if (!resRifa.ok) {
        console.error("Failed to post rifa");
        return;
      }
    }

    if (config.bono !== "") {
      const resBono = await fetch("/api/config/rifaYbono", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ bono: config.bono }),
      });

      if (!resBono.ok) {
        console.error("Failed to post bono");
        return;
      }
    }

    onClose();
  };

  // const handleClose = (e: React.MouseEvent<HTMLButtonElement>) => {
  //   if (e.target.id === "wrapper") {
  //     onClose();
  //   }
  // };

  const handleClose = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLElement;
    if (target.id === "wrapper") {
      onClose();
    }
  };

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
                {/* numero de telefono  */}
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="phoneNumber"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Número de Teléfono
                  </label>
                  <input
                    type="text"
                    name="phoneNumber"
                    id="phoneNumber"
                    value={config.phoneNumber}
                    onChange={handleChange}
                    className="mt-1 block w-full shadow-sm sm:text-sm rounded-md text-black"
                  />
                </div>
                {/* rifa grande  */}

                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="rifa"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Rifa
                  </label>
                  <input
                    type="text"
                    name="rifa"
                    id="rifa"
                    value={config.rifa}
                    onChange={handleChange}
                    className="mt-1 block w-full shadow-sm sm:text-sm rounded-md text-black"
                  />
                </div>
                {/* bono de rifa */}
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="bono"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Bono
                  </label>
                  <input
                    type="text"
                    name="bono"
                    id="bono"
                    value={config.bono}
                    onChange={handleChange}
                    className="mt-1 block w-full shadow-sm sm:text-sm rounded-md text-red-300"
                  />
                </div>
                {/* whaast app mesage */}
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="whatsapp"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Whatsapp Recordatorio
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
                {/* tiempo de reserva  */}
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
                    {/* mostrar numeros or no  */}
                    BlackOut
                  </label>
                  <div>
                    <label className="text-blue-500">
                      <input
                        type="checkbox"
                        name="blackOut"
                        checked={config.blackOut}
                        onChange={handleBlackOutChange}
                      />{" "}
                      Enabled
                    </label>
                  </div>
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="fechaDeSorteo"
                    className="block text-sm font-medium text-gray-700"
                  >
                    {/* fecha de sorteo  */}
                    Fecha de sorteo
                  </label>
                  <input
                    type="date"
                    name="fechaDeSorteo"
                    id="fechaDeSorteo"
                    value={config.fechaDeSorteo}
                    onChange={handleChange}
                    className="mt-1 block w-full shadow-sm sm:text-sm rounded-md text-blue-700"
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
};
export default SettModal;
