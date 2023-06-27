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

  return (
    <div
      className="ruleta-container  mx-auto "
      style={{ border: "1px solid black" }}
    >
      {/* Ruleta button */}
      <div
        className="flex items-center justify-center mt-4   mb-3 "
        style={{ border: "1px solid black" }}
      >
        <button
          className="lg:text-5xl bg-pink-200 hover:bg-pink-300 text-black py-2 px-4 rounded-full focus:outline-none border border-black transform hover:scale-110 transition-transform duration-200 ease-in-out md:py-3 md:px-6"
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
            className="bg-green-200 hover:bg-green-300 text-black py-1 px-3 rounded-lg focus:outline-none transform hover:scale-110 transition-transform duration-200 ease-in-out md:py-2 md:px-4"
            onClick={() => {
              setRandomCount(1);
              reserveRandomTickets();
            }}
          >
            1 BOLETO POR $63{" "}
          </button>
          <button
            className="bg-green-200 hover:bg-green-300 text-black py-1 px-3 rounded-lg focus:outline-none transform hover:scale-110 transition-transform duration-200 ease-in-out md:py-2 md:px-4"
            onClick={() => {
              setRandomCount(3);
              reserveRandomTickets();
            }}
          >
            3 BOLETOS POR $184
          </button>
          <button
            className="bg-green-200 hover:bg-green-300 text-black py-1 px-3 rounded-lg focus:outline-none transform hover:scale-110 transition-transform duration-200 ease-in-out md:py-2 md:px-4"
            onClick={() => {
              setRandomCount(5);
              reserveRandomTickets();
            }}
          >
            5 BOLETOS POR $298{" "}
          </button>
          <button
            className="bg-green-200 hover:bg-green-300 text-black py-1 px-3 rounded-lg focus:outline-none transform hover:scale-110 transition-transform duration-200 ease-in-out md:py-2 md:px-4"
            onClick={() => {
              setRandomCount(10);
              reserveRandomTickets();
            }}
          >
            10 BOLETOS POR $595
          </button>
          <button
            className="bg-green-200 hover:bg-green-300 text-black py-1 px-3 rounded-lg focus:outline-none transform hover:scale-110 transition-transform duration-200 ease-in-out md:py-2 md:px-4"
            onClick={() => {
              setRandomCount(100);
              reserveRandomTickets();
            }}
          >
            100 BOLETOS POR $5,950{" "}
          </button>
        </div>
      )}

      {/* Randomly selected tickets */}
      {showRandomOptions && selectedRandomTickets.length > 0 && (
        <div className="flex flex-col items-center mt-8 space-y-3 bg-gray-100 bg-opacity-50 p-4 rounded-lg shadow-lg">
          <h2 className="text-lg md:text-xl font-semibold text-center text-blue-600">
            Randomly selected tickets:
          </h2>
          <p className="text-md md:text-lg text-center text-gray-800">
            {selectedRandomTickets.join(", ")}
          </p>
          {/* Display randomly selected tickets */}
          <button
            className="mt-4 bg-green-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-green-600 focus:outline-none transition-colors duration-200 ease-in-out"
            onClick={confirmSelection}
          >
            Confirm selection
          </button>
        </div>
      )}
    </div>
  );
};

export default Ruleta;
