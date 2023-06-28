"use client";

import { useState, useEffect } from "react";
import Buttons from "./components/Buttons";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Image from "next/image";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Link from "next/link";

export default function Home() {
  const [title, setTitle] = useState("");

  useEffect(() => {
    const fetchTitle = async () => {
      const res = await fetch("/api/title");
      const data = await res.json();
      setTitle(data.title);
    };

    // Fetch the title immediately
    fetchTitle();

    // Then set up polling
    const intervalId = setInterval(fetchTitle, 1200000); // Fetch every 20 minutes

    // Clean up function
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <Navbar />
      <main className=" flex min-h-screen flex-col items-center justify-between ">
        <div className="carouselContainer  pt-16 md:pt-20 ">
          <Carousel
            autoPlay
            showThumbs={false}
            showIndicators={false}
            showStatus={false}
            infiniteLoop={true}
            interval={4000}
            className=" "
          >
            <div className="imageContainer">
              <Image
                src="/ima/hutchilopostly.png"
                alt="Car Image 1"
                width={300}
                height={100} // fixed height
                layout="fixed"
              />
            </div>
            <div className="imageContainer">
              <Image
                src="/ima/solmadre.png"
                alt="Car Image 2"
                width={300}
                height={100} // fixed height
                layout="fixed"
              />
            </div>
            <div className="imageContainer">
              <Image
                src="/ima/weofthesun.png"
                alt="Car Image 3"
                width={300}
                height={100} // fixed height
                layout="fixed"
              />
            </div>
          </Carousel>
          <div className="buttonContainer absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center">
            <button className="ticketsButton px-4 py-2 bg-red-500 text-white text-lg rounded-md border border-white transition-all duration-300 transform hover:scale-105">
              <Link href="/sorteo">COMPRAR BOLETOS</Link>
            </button>
          </div>
        </div>
        <h2 className="bg-yellow-300 w-full text-5xl text-white text-center font-bold mb-4">
          PREGUNTAS FRECUENTES
        </h2>
        <div className=" faqContainer  flex flex-col items-center pt-5   md:w-1/2 ">
          <p className="text-center  md:text-2xl">
            <br />
            <span className="text-yellow-300 text-3xl">
              ¿COMO SE ELIGE A LOS GANADOES?
            </span>
            <br />
            Todos nuestros sorteos se realizan en base a la{" "}
            <Link
              target="_blank"
              href={"https://www.lotenal.gob.mx/Home/Resultados"}
              className="text-yellow-300 hover:underline hover:text-white"
            >
              Lotería Nacional mexicana
            </Link>{" "}
            .​
            <br />
            <br />
            El ganador de Rifas Economicas Chihuahua será el participante cuyo
            número de boleto coincida con las últimas cifras del primer premio
            ganador de la Lotería Nacional (las fechas serán publicadas en
            nuestra página oficial).
          </p>
          <br />
          <br />
          <div className="h-0.5 bg-black w-1/4"></div>

          <br />

          <p className="text-center  md:text-2xl">
            <span className="text-yellow-300 text-3xl">
              ¿QUÉ SUCEDE CUANDO EL NÚMERO GANADOR ES UN BOLETO NO VENDIDO?
            </span>
            <br />
            Se elige un nuevo ganador realizando la misma dinámica en otra fecha
            cercana (se anunciará la nueva fecha).
            <br />
            Esto significa que, ¡Tendrías el doble de oportunidades de ganar con
            tu mismo boleto!
          </p>
          <br />
          <br />
          <div className="h-0.5 bg-black w-1/4"></div>
          <br />

          <p className="text-center  md:text-2xl">
            <span className="text-yellow-300 text-3xl">
              ¿DÓNDE SE PUBLICA A LOS GANADORES?
            </span>
            <br />
            En nuestra página oficial de Facebook{" "}
            <Link
              target="_blank"
              href={"https://www.facebook.com/"}
              className="text-yellow-300 hover:underline hover:text-white"
            >
              Rifas Economicas Chihuahua
            </Link>{" "}
            puedes encontrar todos y cada uno de nuestros sorteos anteriores,
            así como las transmisiones en vivo con Lotería Nacional y las
            entregas de premios a los ganadores!
            <br />
            <span className="text-center">
              {" "}
              Encuentra transmisión en vivo de los sorteos en nuestra página de
              Facebook en las fechas indicadas a las 20:00 hrs CDMX. ¡No te lo
              pierdas!
            </span>
            <br />
            <br />
          </p>
        </div>
        <section className="w-full ">
          <h2 className="bg-yellow-300 w-full text-5xl text-white text-center font-bold mb-4">
            Sobre Nosotors
          </h2>
          <p className="text-center  md:text-2xl">
            Sorteos ENTRE AMIGOS en base a LOTERIA NACIONAL ARRIESGA POCO Y GANA
            MUCHO!
          </p>
        </section>
        <br />
        <div className="h-0.5 bg-black w-1/4"></div>
        <br />
      </main>
      <div>
        <h2 className="bg-yellow-300 w-full text-5xl text-white text-center font-bold ">
          contactanos
        </h2>
      </div>
      <Footer />
    </div>
  );
}
