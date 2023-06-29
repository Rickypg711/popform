// components/Navbar.js

import Link from "next/link";
import { useState } from "react";
import { FaTicketAlt } from "react-icons/fa"; // Import the ticket icon

// ...

export default function Navbar() {
  const [isOpen, setOpen] = useState(false);

  return (
    <div className="fixed  w-full bg-black py-3 z-10 mb-4">
      <nav
        className=" bg-yellow-300 px-4 py-2 shadow"
        // style={{ marginTop: "64px" }}
      >
        <div className="flex flex-col mx-auto md:flex-row md:items-center md:justify-between md:max-w-4xl">
          <div className="flex justify-between items-center">
            <Link className="flex items-center" href="/sorteo">
              <FaTicketAlt className=" md:hidden text-9xl h-8 w-8 mr-2 text-black" />

              <div className="hidden md:block" />
            </Link>
            <div className="flex justify-center flex-grow">
              <Link
                className="text-xl font-bold text-gray-800 md:text-2xl"
                href="/"
              >
                PAREDES
              </Link>
            </div>
            <div className="flex">
              <button
                type="button"
                className="block text-gray-800 hover:text-gray-600 focus:text-gray-600 focus:outline-none md:hidden"
                onClick={() => setOpen(!isOpen)}
              >
                <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current">
                  {isOpen ? (
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M20 13H4v-2h16v2zM4 6h16v2H4V6zm16 10H4v2h16v-2z"
                    ></path>
                  ) : (
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M4 5h16v2H4V5zm0 6h16v2H4v-2zm0 6h16v2H4v-2z"
                    ></path>
                  )}
                </svg>
              </button>
            </div>
          </div>
          <div className={`md:flex ${isOpen ? "block" : "hidden"}`}>
            <div className="flex flex-col mt-2 md:flex-row md:mt-0 md:mx-1 text-center">
              <Link
                className="my-1 text-sm text-gray-700 leading-5 hover:underline hover:text-red-500 md:mx-4 md:my-0"
                href="/"
              >
                Inicio
              </Link>
              <Link
                className="my-1 text-sm text-gray-700 leading-5 hover:underline hover:text-red-500 md:mx-4 md:my-0"
                href="/sorteo"
              >
                Boletos
              </Link>
              <Link
                className="my-1 text-sm text-gray-700 leading-5 hover:underline hover:text-red-500 md:mx-4 md:my-0"
                href="/formasDePago"
              >
                Formas De Pago
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
