import { useState, useEffect } from "react";

const Ruleta = ({ onSelection }) => {
  const [showRandomOptions, setShowRandomOptions] = useState(false);
  const [randomCount, setRandomCount] = useState(0);
  const [selectedRandomTickets, setSelectedRandomTickets] = useState([]);

  const toggleRandomOptions = () => {
    if (showRandomOptions) {
      // If closing the options, reset the states
      setRandomCount(0);
      setSelectedRandomTickets([]);
    }
    setShowRandomOptions(!showRandomOptions);
  };

  const reserveRandomTickets = () => {
    const randomTickets = [];

    for (let i = 0; i < randomCount; i++) {
      const randomTicket = Math.floor(Math.random() * 500) + 1;
      randomTickets.push(randomTicket);
    }

    setSelectedRandomTickets(randomTickets);
  };

  const confirmSelection = () => {
    onSelection(selectedRandomTickets);
    setSelectedRandomTickets([]);
  };

  useEffect(() => {
    // This effect will run whenever randomCount changes
    if (randomCount > 0) {
      // Add a check to prevent running at initial render
      reserveRandomTickets();
    }
  }, [randomCount]);

  return (
    <>
      {/* Ruleta button */}
      <div className="flex items-center justify-center mt-4">
        <button
          className="bg-pink-200 hover:bg-pink-300 text-black py-2 px-4 rounded-full focus:outline-none"
          onClick={toggleRandomOptions}
        >
          RULETA
        </button>
      </div>

      {/* Random options */}
      {showRandomOptions && (
        <div className="flex items-center justify-center mt-4 space-x-4">
          <button
            className="bg-green-200 hover:bg-green-300 text-black py-2 px-4 rounded-lg focus:outline-none"
            onClick={() => {
              setRandomCount(1);
              reserveRandomTickets();
            }}
          >
            1 ticket
          </button>
          <button
            className="bg-green-200 hover:bg-green-300 text-black py-2 px-4 rounded-lg focus:outline-none"
            onClick={() => {
              setRandomCount(2);
              reserveRandomTickets();
            }}
          >
            2 tickets
          </button>
          <button
            className="bg-green-200 hover:bg-green-300 text-black py-2 px-4 rounded-lg focus:outline-none"
            onClick={() => {
              setRandomCount(10);
              reserveRandomTickets();
            }}
          >
            10 tickets
          </button>
          <button
            className="bg-green-200 hover:bg-green-300 text-black py-2 px-4 rounded-lg focus:outline-none"
            onClick={() => {
              setRandomCount(30);
              reserveRandomTickets();
            }}
          >
            30 tickets
          </button>
          <button
            className="bg-green-200 hover:bg-green-300 text-black py-2 px-4 rounded-lg focus:outline-none"
            onClick={() => {
              setRandomCount(50);
              reserveRandomTickets();
            }}
          >
            50 tickets
          </button>
        </div>
      )}

      {/* Randomly selected tickets */}
      {showRandomOptions && selectedRandomTickets.length > 0 && (
        <div className="flex flex-col items-center mt-4">
          <h2 className="text-center">Randomly selected tickets:</h2>
          <p className="text-center">{selectedRandomTickets.join(", ")}</p>
          <button className="mt-4" onClick={confirmSelection}>
            Confirm selection
          </button>
        </div>
      )}
    </>
  );
};

export default Ruleta;
