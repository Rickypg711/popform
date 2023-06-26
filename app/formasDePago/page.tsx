"use client";
import React, { useState, useEffect } from "react";
import Footer from "../components/Footer";
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
  const [bankInfo, setBankInfo] = useState<BankInfo[]>([]);
  const [error, setError] = useState<string | null>(null);

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
    <div>
      <section className="flex items-center justify-center bg-red-500 text-white h-screen">
        <div className="text-center">
          <h1 className="text-3xl mb-4 flex items-center justify-center">
            <span className="gold-text">INFORMACIÓN DE PAGO</span>
          </h1>
          <p>
            Debes realizar el pago por alguna de éstas opciones y enviar tu
            comprobante de pago al <span className="gold-text">whatsapp</span>
          </p>
          <section className="mt-8">
            <ul>
              {bankInfo.map((bank: BankInfo) => (
                <li
                  key={bank.id}
                  className="text-white bg-gold bg-opacity-25 p-4 rounded-md mb-4 border-4 border-yellow-300 "
                >
                  <p className="font-bold gold-text">Banco: {bank.bank}</p>
                  <p className="">Tipo: {bank.paymentMethod}</p>
                  {/* Render other bank details */}
                </li>
              ))}
            </ul>
          </section>
        </div>
      </section>
      <Footer />
    </div>
  );
}
