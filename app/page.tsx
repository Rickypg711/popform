"use client";
import React from "react";
import {
  FaHandHolding,
  FaMoneyBill,
  FaRegHandPointer,
  FaWhatsapp,
} from "react-icons/fa";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Link from "next/link";
import FotoCarrosel from "./components/FotoCarrosel";
import Image from "next/image";
import {
  AiFillFacebook,
  AiFillInstagram,
  AiOutlineWhatsApp,
} from "react-icons/ai";

export default function Home() {
  // Then set up polling

  // Clean up function

  return (
    <div>
      <Navbar />
      <main className="flex min-h-screen flex-col items-center justify-between">
        <FotoCarrosel />

        <h2 className="bg-yellow-300 w-full text-5xl text-white text-center font-bold mb-4">
          PREGUNTAS FRECUENTES
        </h2>
        {/* FAQ section */}
        <div className="faqContainer flex flex-col items-center pt-5 md:w-1/2">
          {/* FAQ question 1 */}
          <p className="text-center md:text-2xl">
            <br />
            <span className="text-yellow-300 text-3xl">
              ¿CÓMO SE ELIGE A LOS GANADORES?
            </span>
            <br />
            Todos nuestros sorteos se realizan en base a la{" "}
            <Link
              target="_blank"
              href={"https://www.lotenal.gob.mx/Home/Resultados"}
              className="text-yellow-300 hover:underline hover:text-white"
            >
              Lotería Nacional mexicana
            </Link>
            <br />
            <br />
            El ganador de Rifas Económicas Chihuahua será el participante cuyo
            número de boleto coincida con las últimas cifras del primer premio
            ganador de la Lotería Nacional (las fechas serán publicadas en
            nuestra página oficial).
          </p>
          <Image
            alt="loteria nacional"
            src={"/ima/Logo_lotenal.png"}
            width={200}
            height={200}
          />
          <br />
          <br />
          <div className="h-0.5 bg-black w-1/4"></div>

          <br />

          {/* FAQ question 2 */}
          <p className="text-center md:text-2xl">
            <span className="text-yellow-300 text-3xl">
              ¿QUÉ SUCEDE CUANDO EL NÚMERO GANADOR ES UN BOLETO NO VENDIDO?
            </span>
            <br />
            Se elige un nuevo ganador realizando la misma dinámica en otra fecha
            cercana (se anunciará la nueva fecha).
            <br />
            Esto significa que ¡tendrías el doble de oportunidades de ganar con
            tu mismo boleto!
          </p>
          <br />
          <br />
          <div className="h-0.5 bg-black w-1/4"></div>
          <br />

          {/* FAQ question 3 */}
          <p className="text-center md:text-2xl ">
            <span className="text-yellow-300 text-3xl">
              ¿DÓNDE SE PUBLICAN A LOS GANADORES?
            </span>
            <br />
            En nuestra página oficial de Facebook{" "}
            <Link
              target="_blank"
              href={"https://www.facebook.com/"}
              className="text-yellow-300 hover:underline hover:text-white"
            >
              Rifas Económicas Chihuahua
            </Link>{" "}
            puedes encontrar todos y cada uno de nuestros sorteos anteriores,
            así como las transmisiones en vivo con Lotería Nacional y las
            entregas de premios a los ganadores.
            <br />
            <span className="text-center">
              Encuentra transmisión en vivo de los sorteos en nuestra página de
              Facebook en las fechas indicadas a las 20:00 hrs CDMX. ¡No te lo
              pierdas!
            </span>
            <br />
            <br />
          </p>
          <Link
            href="https://www.facebook.com/yourpage"
            target="_blank"
            rel="noopener noreferrer
            "
            className="mb-3"
          >
            <AiFillFacebook className="mx-2 text-6xl md:text-5xl text-black" />
          </Link>
        </div>

        {/* PASOS PARA APARTAR TUS BOLETOS section */}
        <section className="w-full mb-6">
          <h2 className="bg-yellow-300 text-5xl text-white text-center font-bold mb-4">
            PASOS PARA APARTAR TUS BOLETOS
          </h2>
          {/* Step 1 */}
          <p className="text-yellow-300 text-3xl text-center md:text-2xl">
            <br />
            <FaRegHandPointer
              size={42}
              color="#FFD700"
              className="inline-block align-middle"
            />{" "}
            Paso 1
            <br />
            <span className="text-center md:text-2xl text-black">
              <span className="text-yellow-300 text-3xl text-center md:text-2xl">
                1.
              </span>
              Elige un número de nuestra lista para apartarlo con tu nombre y
              teléfono.
            </span>
          </p>
          <br />
          {/* Step 2 */}
          <p className="text-yellow-300 text-3xl text-center md:text-2xl">
            <FaMoneyBill className="text-center text-yellow-300 inline-block align-middle" />{" "}
            Paso 2
            <br />
            <span className="text-center md:text-2xl text-black">
              <span className="text-yellow-300 text-3xl text-center md:text-2xl">
                2.
              </span>
              Elige tu método de pago: depósito en banco, OXXO o transferencia
              bancaria.
            </span>
          </p>
          <br />
          {/* Step 3 */}
          <p className="text-yellow-300 text-3xl text-center md:text-2xl">
            <FaWhatsapp
              size={42}
              color="#FFD700"
              className="inline-block align-middle"
            />{" "}
            Paso 3
            <br />
            <span className="text-center md:text-2xl text-black">
              <span className="text-yellow-300 text-3xl text-center md:text-2xl">
                3.
              </span>
              Envíanos tu comprobante y recibe de inmediato tu boleto por
              WhatsApp.
            </span>
          </p>
        </section>

        <section className="w-full">
          <h2 className="bg-yellow-300 text-5xl text-white text-center font-bold mb-4">
            Sobre Nosotros
          </h2>
          <p className="text-center md:text-2xl">
            Sorteos ENTRE AMIGOS en base a LOTERIA NACIONAL. ¡ARRIESGA POCO Y
            GANA MUCHO!
          </p>
        </section>
        <br />
        <div className="h-0.5 bg-black w-1/4"></div>
        <br />
      </main>
      <div>
        <h2 className="bg-yellow-300 w-full text-5xl text-white text-center font-bold">
          Contáctanos
        </h2>
      </div>
      <Footer />
    </div>
  );
}
