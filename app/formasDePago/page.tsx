"use client";
import React, { useState, useEffect } from "react";

import Image from "next/image";

interface BankInfo {
  id: number;
  paymentMethod: string;
  bank: string;
  cardNumber: string | null;
  routingNumber: string | null;
  accountName: string | null;
  cardHolderName: string | null;
}

export default function FormasDePago() {
  const [bankInfo, setBankInfo] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/api/bankInfo")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load bank info...");
        }
        return response.json();
      })
      .then((data) => setBankInfo(data))
      .catch((error) => setError(error.message));
  }, []);

  if (error) return <div>{error}</div>;
  if (!bankInfo) return <div>Loading...</div>;

  return (
    <section className="payments bg-blue-700 text-white">
      <section className="payments_container">
        <div className="payments_heading">
          <h2 className="text-blue-700">exclusivo transferencias y cajero</h2>
          <h3 className="text-sm underline">
            en concepto de pago: numero de boleto
          </h3>
        </div>
        <section className="payments_type-section">
          <ul>
            {bankInfo.map((bank: BankInfo) => (
              <li key={bank.id} className="text-red-500">
                Banco:{" "}
                {/* <img
                  src={`data:image/png;base64,${bank.logo}`}
                  alt={bank.bank}
                /> */}
                <p>Tipo: {bank.paymentMethod}</p>
                <p>Banco: {bank.bank}</p>
                {/* Render other bank details */}
              </li>
            ))}
          </ul>
        </section>
      </section>
    </section>
  );
}
