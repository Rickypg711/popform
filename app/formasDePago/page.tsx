"use client";
import React, { useState, useEffect } from "react";
import Footer from "../components/Footer";
import Image from "next/image";
import Navbar from "../components/Navbar";
import { AiOutlineWhatsApp } from "react-icons/ai";

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
  const [phoneNumber, setPhoneNumber] = useState("");
  const [bankInfo, setBankInfo] = useState<BankInfo[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Move the useEffect to the top level
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

  useEffect(() => {
    const fetchPhoneNumber = async () => {
      try {
        const res = await fetch("/api/config/phoneNumber");
        if (res.ok) {
          const data = await res.json();
          setPhoneNumber(data.phoneNumber);
        } else {
          console.error("Failed to fetch phone number");
        }
      } catch (error) {
        console.error(
          "An error occurred while fetching the phone number",
          error
        );
      }
    };
    // fetch phone number
    fetchPhoneNumber();
  }, []);

  // After calling all hooks, conditional return can occur
  if (error) return <div>{error}</div>;
  if (!bankInfo || bankInfo.length === 0) return <div>Loading...</div>;

  // Separate the bankInfo by payment method
  const creditCardInfo = bankInfo.filter(
    (info) => info.paymentMethod === "Transferencias"
  );
  const debitCardInfo = bankInfo.filter(
    (info) => info.paymentMethod === "Oxxo"
  );
  const bankTransferInfo = bankInfo.filter(
    (info) => info.paymentMethod === "Extranjero"
  );

  function formatCardNumber(cardNumber: string | null): string | null {
    if (cardNumber == null) return null;
    cardNumber = cardNumber.replace(/\s+/g, ""); // remove existing spaces
    return cardNumber.replace(/(.{4})/g, "$1 ").trim(); // insert spaces every 4 digits
  }

  // Create a helper function to display bank info
  const renderBankInfo = (bankList: BankInfo[]) => {
    return bankList.map((bank: BankInfo) => (
      <li
        key={bank.id}
        className="text-black bg-yellow-300 bg-opacity-25  rounded-md mb-4 border-4 border-yellow-300 my-2"
      >
        <div className="flex items-center">
          <Image
            src={`/ima//bankpictures/${bank.bank}.png`}
            alt={`${bank.bank} Logo`}
            width={50}
            height={50}
          />
          <p className="font-bold text-gold ml-2">Banco: {bank.bank}</p>
        </div>{" "}
        {/* <p className="">Tipo: {bank.paymentMethod}</p> */}
        <p>Nombre: {bank.cardHolderName}</p>
        <p className="mb-2">
          Numero de Tarjeta: {formatCardNumber(bank.cardNumber)}
        </p>
        {/* Render other bank details */}
      </li>
    ));
  };

  const formatPhoneNumber = (s: string) => {
    var s2 = ("" + s).replace(/\D/g, "");
    var m = s2.match(/^(\d{3})(\d{3})(\d{4})$/);
    return !m ? null : "(" + m[1] + ") " + m[2] + "-" + m[3];
  };
  return (
    <div className=" flex flex-col min-h-screen ">
      <Navbar />
      <section className=" flex items-center justify-center bg-red-500 text-white mt-20 mx-3 ">
        <div className="text-center">
          <h1 className="text-3xl mb-4">
            <span className="text-gold">INFORMACIÓN DE PAGO</span>
          </h1>
          <p className="text-center text-2xl">
            Debes realizar el pago por alguna de estas opciones y enviar tu
            comprobante de pago al{" "}
            <span className="text-yellow-300">
              whatsapp
              {formatPhoneNumber(phoneNumber) || "(000) 000-0000"}{" "}
            </span>
          </p>

          {/* Credit Card Section */}
          {creditCardInfo.length > 0 && (
            <section className="mt-8">
              <h2 className="text-2xl mb-4">TRANSFERENCIAS</h2>
              <ul className="">{renderBankInfo(creditCardInfo)}</ul>
            </section>
          )}

          {/* Debit Card Section */}
          {debitCardInfo.length > 0 && (
            <section className="mt-8">
              <h2 className="text-2xl mb-4">OXXO</h2>
              <ul>{renderBankInfo(debitCardInfo)}</ul>
            </section>
          )}

          {/* Bank Transfer Section */}
          {bankTransferInfo.length > 0 && (
            <section className="mt-8">
              <h2 className="text-2xl mb-4">EXTRANJERO</h2>
              <ul>{renderBankInfo(bankTransferInfo)}</ul>
            </section>
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
}
