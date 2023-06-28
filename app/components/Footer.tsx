import Link from "next/link";
import React, { useState, useEffect } from "react";
import {
  AiFillFacebook,
  AiFillInstagram,
  AiOutlineWhatsApp,
} from "react-icons/ai";

const Footer = () => {
  const [phoneNumber, setPhoneNumber] = useState("");

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

    fetchPhoneNumber();
  }, []);

  const formatPhoneNumber = (s: string) => {
    var s2 = ("" + s).replace(/\D/g, "");
    var m = s2.match(/^(\d{3})(\d{3})(\d{4})$/);
    return !m ? null : "(" + m[1] + ") " + m[2] + "-" + m[3];
  };

  return (
    <footer className="bg-yellow-300 py-4 text-center">
      <p className="text-lg text-white font-bold mb-2">PREGUNTAS AL WHATSAPP</p>
      <p className="text-2xl mb-4 text-red-500">
        {formatPhoneNumber(phoneNumber) || "(000) 000-0000"}
      </p>
      <div className="flex justify-center mb-4">
        <Link
          href="https://www.facebook.com/yourpage"
          target="_blank"
          rel="noopener noreferrer"
        >
          <AiFillFacebook className="mx-2 text-2xl md:text-5xl text-black" />
        </Link>
        <Link
          href="https://www.instagram.com/youraccount"
          target="_blank"
          rel="noopener noreferrer"
        >
          <AiFillInstagram className="mx-2 text-2xl md:text-5xl text-black" />
        </Link>
        <Link
          href="whatsapp://send?text=Hello&phone=+yourphonenumber"
          target="_blank"
          rel="noopener noreferrer"
        >
          <AiOutlineWhatsApp className="mx-2 text-2xl md:text-5xl text-black" />
        </Link>
      </div>
      <p className="text-sm">Sitio desarrollado por PAREDES</p>
      <p className="text-sm">Aviso de Privacidad</p>
    </footer>
  );
};

export default Footer;
