"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";

export default function FormasDePago() {
  const [bankInfo, setBankInfo] = useState(null);
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
      {/* <Image
        src="https://cdn.builder.io/api/v1/image/assets%2F2505d249531c4f23a777e263cc8ada88%2Feae00687018941f5a40b8bcfbac69134"
        alt="logo"
        width={400}
        height={400}
      /> */}
      <section className="payments_container">
        <div className="payments_heading">
          <h2 className="text-blue-700">exclusivo transferencias y cajero</h2>
          <h3 className="text-sm underline">
            en concepto de pago: numero de boleto
          </h3>
        </div>
        <section className="payments_type-section">
          <ul>
            {bankInfo.map((bank) => (
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
