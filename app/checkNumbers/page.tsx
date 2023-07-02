"use client";
import { useState, FormEvent } from "react";
import Navbar from "../components/Navbar";

export default function CheckNumbers() {
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [reservedNumbers, setReservedNumbers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [startIndex, setStartIndex] = useState(0);
  const numbersPerPage = 8;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Display loading spinner
    setIsLoading(true);
    // const phoneNumber = phone.slice(-11);

    // Fetch the user's reserved numbers from the server
    try {
      console.log("Request Body:", { phone, name }); // Added console log

      const res = await fetch(`https://popform.vercel.app/api/userReserved`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, name }),
      });
      const data = await res.json();

      if (res.ok) {
        setReservedNumbers(data);
        setStartIndex(0);
      } else {
        console.error(data.error);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      // Hide loading spinner
      setIsLoading(false);
    }

    setPhone("");
    setName("");
  };

  const nextPage = () => {
    setStartIndex((prevIndex) => prevIndex + numbersPerPage);
  };

  const previousPage = () => {
    setStartIndex((prevIndex) => Math.max(prevIndex - numbersPerPage, 0));
  };

  const displayedNumbers = reservedNumbers.slice(
    startIndex,
    startIndex + numbersPerPage
  );

  // Rest of the component remains the same, only change 'id' to 'phone' and 'email' to 'name' in the form inputs and labels.

  return (
    <div>
      <Navbar />

      <div className="font-sans min-h-screen bg-gray-200 py-6 flex flex-col justify-center sm:py-12">
        <div className="relative py-3 sm:max-w-xl mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
          <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
            <h2 className="text-2xl font-semibold mb-4 text-center">
              Busca tus Boletos Apartados
            </h2>
            <p className="text-gray-500 mb-10 text-center">
              Encuentra los boletos que has apartado durante la actual rifa, y
              mira cuales de han sido confirmados como pagados.
            </p>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div>
                <label
                  htmlFor="phone"
                  className="text-sm font-medium text-gray-700 tracking-wide"
                >
                  Numero de WhatsApp
                </label>
                <input
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                  type="text"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="name"
                  className="text-sm font-medium text-gray-700 tracking-wide"
                >
                  Nombre
                </label>
                <input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                  type="text"
                  required
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
                >
                  BUSCAR
                </button>
              </div>
            </form>

            {isLoading ? (
              <div className="flex justify-center items-center space-x-2 animate-bounce mt-4">
                <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                <div className="w-4 h-4 bg-blue-700 rounded-full"></div>
                <div className="w-4 h-4 bg-blue-900 rounded-full"></div>
              </div>
            ) : displayedNumbers.length > 0 ? (
              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-2">
                  Tus Boletos Reservados:
                </h3>
                <div className="grid grid-cols-4 gap-4">
                  {displayedNumbers.map((number, i) => (
                    <div key={i} className="py-4 px-2 bg-gray-200 rounded">
                      {number}
                    </div>
                  ))}
                </div>
                <div className="flex justify-between mt-4">
                  <button
                    onClick={previousPage}
                    disabled={startIndex === 0}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    anterior
                  </button>
                  <button
                    onClick={nextPage}
                    disabled={
                      startIndex + numbersPerPage >= reservedNumbers.length
                    }
                    className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
                  >
                    siguiente
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-center mt-4">no se encontro ningun numero .</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
