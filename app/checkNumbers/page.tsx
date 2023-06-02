"use client"
import { useState, FormEvent } from "react";

export default function CheckNumbers() {
  const [id, setId] = useState("");
  const [email, setEmail] = useState("");
  const [reservedNumbers, setReservedNumbers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Display loading spinner
    setIsLoading(true);

    // Fetch the user's reserved numbers from the server
    try {
      const res = await fetch(`http://localhost:3000/api/userReserved`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, email }),
      });
      const data = await res.json();

      if (res.ok) {
        setReservedNumbers(data);
      } else {
        console.error(data.error);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      // Hide loading spinner
      setIsLoading(false);
    }

    setId("");
    setEmail("");
  };

  return (
    <div>
      <h2>Find Your Reserved Numbers</h2>

      <form onSubmit={handleSubmit}>
        <label>
          User ID:
          <input
            type="text"
            value={id}
            onChange={(e) => setId(e.target.value)}
            required
          />
        </label>

        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>

        <button type="submit">Submit</button>
      </form>

      {isLoading ? (
        <p>Loading...</p>
      ) : reservedNumbers.length > 0 ? (
        <div>
          <h3>Your Reserved Numbers:</h3>
          <ul>
            {reservedNumbers.map((number, i) => (
              <li key={i}>{number}</li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No reserved numbers found.</p>
      )}
    </div>
  );
}
