import { useState, useEffect, FC, useCallback } from "react";

interface RuletaProps {
  onSelection: (selectedTickets: any[]) => void;
  Butt: any[]; // Replace 'any' with the appropriate type if possible.
  removed: any[]; // Replace 'any' with the appropriate type if possible.
}

const Ruleta: FC<RuletaProps> = ({ onSelection, Butt, removed }) => {
  const [showRandomOptions, setShowRandomOptions] = useState(false);
  const [randomCount, setRandomCount] = useState(0);
  const [selectedRandomTickets, setSelectedRandomTickets] = useState<number[]>(
    []
  );

  const toggleRandomOptions = () => {
    if (showRandomOptions) {
      // If closing the options, reset the states
      setRandomCount(0);
      setSelectedRandomTickets([]);
      removed.length = 0; // Clear the 'removed' array
    }
    setShowRandomOptions(!showRandomOptions);
  };

  const reserveRandomTickets = useCallback(() => {
    const randomTickets: number[] = [];
    let availableTickets = Butt.filter((ticket) => !removed.includes(ticket));

    for (let i = 0; i < randomCount; i++) {
      if (availableTickets.length === 0) break; // no available tickets left

      const randomIndex = Math.floor(Math.random() * availableTickets.length);
      randomTickets.push(availableTickets[randomIndex]);
      availableTickets.splice(randomIndex, 1); // remove the selected ticket from available tickets
    }

    setSelectedRandomTickets(randomTickets);
    removed.length = 0; // Clear the 'removed' array
  }, [randomCount, Butt, removed]);

  useEffect(() => {
    if (randomCount > 0) {
      reserveRandomTickets();
    }
  }, [randomCount, reserveRandomTickets]);

  const confirmSelection = () => {
    onSelection(selectedRandomTickets);
    setSelectedRandomTickets([]);
  };

  const removeTicket = (ticket: number) => {
    setSelectedRandomTickets((prev) => prev.filter((t) => t !== ticket));
  };

  return (
    <div className="ruleta-container  mx-auto ">
      {/* Ruleta button */}
      <div className="flex items-center justify-center mt-4   mb-3 ">
        <button
          className="animate-bounce lg:text-5xl bg-yellow-300 hover:bg-black text-black hover:text-yellow-300 py-2 px-4 rounded-full focus:outline-none border-2 border-black  hover:border-2 hover:border-yellow-300 transform hover:scale-110 transition-transform duration-200 ease-in-out md:py-3 md:px-6"
          onClick={toggleRandomOptions}
        >
          RULETA DE LA SUERTE
        </button>
      </div>

      {/* Random options */}
      {showRandomOptions && (
        <div
          className="
          flex 
          flex-col
          mt-4 
          mb-3

           items-center 
           space-y-4

          md:flex-row 
          md:justify-center
           md:items-center

            md:space-x-4 md:space-y-0
        "
        >
          <button
            className="bg-green-700 hover:bg-green-800 text-white py-1 px-3 rounded-lg focus:outline-none transform hover:scale-110 transition-transform duration-200 ease-in-out md:py-2 md:px-4"
            onClick={() => {
              setRandomCount(1);
              reserveRandomTickets();
            }}
          >
            1 BOLETO 🎟️ POR $63{" "}
          </button>
          <button
            className="bg-green-700 hover:bg-green-800 text-white py-1 px-3 rounded-lg focus:outline-none transform hover:scale-110 transition-transform duration-200 ease-in-out md:py-2 md:px-4"
            onClick={() => {
              setRandomCount(3);
              reserveRandomTickets();
            }}
          >
            3 BOLETOS 🎟️ POR $184
          </button>
          <button
            className="bg-green-700 hover:bg-green-800 text-white py-1 px-3 rounded-lg focus:outline-none transform hover:scale-110 transition-transform duration-200 ease-in-out md:py-2 md:px-4"
            onClick={() => {
              setRandomCount(5);
              reserveRandomTickets();
            }}
          >
            5 BOLETOS 🎟️ POR $298{" "}
          </button>
          <button
            className="bg-green-700 hover:bg-green-800 text-white py-1 px-3 rounded-lg focus:outline-none transform hover:scale-110 transition-transform duration-200 ease-in-out md:py-2 md:px-4"
            onClick={() => {
              setRandomCount(10);
              reserveRandomTickets();
            }}
          >
            10 BOLETOS 🎟️ POR $595
          </button>
          <button
            className="bg-green-700 hover:bg-green-800 text-white py-1 px-3 rounded-lg focus:outline-none transform hover:scale-110 transition-transform duration-200 ease-in-out md:py-2 md:px-4"
            onClick={() => {
              setRandomCount(100);
              reserveRandomTickets();
            }}
          >
            100 BOLETOS 🎟️ POR $5,950{" "}
          </button>
        </div>
      )}

      {/* Randomly selected tickets */}
      {showRandomOptions && selectedRandomTickets.length > 0 && (
        <div className="flex flex-col items-center mt-8 space-y-3 bg-gray-100 bg-opacity-50 p-4 rounded-lg shadow-lg">
          <h2 className="text-lg md:text-xl font-semibold text-center text-yellow-300">
            Estos son tus Tickets:
          </h2>
          <p className="text-md md:text-lg text-center text-gray-800">
            {selectedRandomTickets.map((ticket) => (
              <button
                key={ticket} // <-- Add this line
                className="border rounded bg-gray-200 m-2 "
                onClick={() => removeTicket(ticket)}
              >
                {ticket}
              </button>
            ))}
          </p>

          {/* Display randomly selected tickets */}
          <button
            className="mt-4           bg-yellow-300 hover:bg-black text-black hover:text-yellow-300 border-black  hover:border-3 hover:border-yellow-300
            py-2 px-4 rounded-lg shadow-md  focus:outline-none transition-colors duration-200 ease-in-out"
            onClick={confirmSelection}
          >
            Aparta y Gana
          </button>
        </div>
      )}
    </div>
  );
};

export default Ruleta;
