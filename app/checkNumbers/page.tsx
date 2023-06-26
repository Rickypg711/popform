"use client";
import { useState, FormEvent } from "react";

export default function CheckNumbers() {
  const [id, setId] = useState("");
  const [email, setEmail] = useState("");
  const [reservedNumbers, setReservedNumbers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [startIndex, setStartIndex] = useState(0);
  const numbersPerPage = 8;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Display loading spinner
    setIsLoading(true);

    // Fetch the user's reserved numbers from the server
    try {
      const res = await fetch(`http://localhost:3000/api/userReserved`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, email }),
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

    setId("");
    setEmail("");
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

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <h2 className="text-3xl mb-4">Find Your Reserved Numbers</h2>

        <form onSubmit={handleSubmit} className="mb-4">
          <label className="block mb-2">
            User ID:
            <input
              type="text"
              value={id}
              onChange={(e) => setId(e.target.value)}
              required
              className="ml-2"
            />
          </label>

          <label className="block mb-2">
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="ml-2"
            />
          </label>

          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Submit
          </button>
        </form>

        {isLoading ? (
          <p>Loading...</p>
        ) : displayedNumbers.length > 0 ? (
          <div>
            <h3>Your Reserved Numbers:</h3>
            <div className="grid grid-cols-4 gap-4">
              {displayedNumbers.map((number, i) => (
                <div key={i}>{number}</div>
              ))}
            </div>
            <div className="mt-4">
              <button
                onClick={previousPage}
                disabled={startIndex === 0}
                className="px-4 py-2 bg-blue-500 text-white rounded mr-2"
              >
                Previous
              </button>
              <button
                onClick={nextPage}
                disabled={startIndex + numbersPerPage >= reservedNumbers.length}
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                Next
              </button>
            </div>
          </div>
        ) : (
          <p>No reserved numbers found.</p>
        )}
      </div>
    </div>
  );
}
