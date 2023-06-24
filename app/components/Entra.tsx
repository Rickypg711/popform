"use client";
import { useState } from "react";
import AdmiPage from "../adda/page";

const LOGIN_USERNAME = "ya"; // Hard-coded username
const LOGIN_PASSWORD = "se"; // Hard-coded password

const Entra = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    if (username === LOGIN_USERNAME && password === LOGIN_PASSWORD) {
      setIsLoggedIn(true);
    } else {
      alert("Incorrect username or password");
    }
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  if (isLoggedIn) {
    return <AdmiPage />;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-green-100">
      <div className="p-10 space-y-5 bg-white rounded-lg shadow-md">
        <label className="block">
          <span className="text-gray-700">Username:</span>
          <input
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-300 focus:ring focus:ring-green-200 focus:ring-opacity-50"
            type="text"
            value={username}
            onChange={handleUsernameChange}
          />
        </label>
        <label className="block">
          <span className="text-gray-700">Password:</span>
          <input
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-300 focus:ring focus:ring-green-200 focus:ring-opacity-50"
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </label>
        <button
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          onClick={handleLogin}
        >
          Log in
        </button>
      </div>
    </div>
  );
};

export default Entra;