"use client";

import { useState, useEffect } from "react";
import Buttons from "./components/Buttons";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Image from "next/image";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

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
        <div className="carouselContainer  pt-16 md:pt-16 ">
          <Carousel
            autoPlay
            showThumbs={false}
            infiniteLoop={true}
            interval={4000}
          >
            <div className="imageContainer">
              <Image
                src="/ima/hutchilopostly.png"
                alt="Car Image 1"
                width={300}
                height={300}
                layout="responsive"
              />
            </div>
            <div className="imageContainer">
              <Image
                src="/ima/solmadre.png"
                alt="Car Image 2"
                width={300}
                height={300}
                layout="responsive"
              />
            </div>
            <div className="imageContainer">
              <Image
                src="/ima/weofthesun.png"
                alt="Car Image 3"
                width={300}
                height={300}
                layout="responsive"
              />
            </div>
          </Carousel>
          <div className="buttonContainer absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center">
            <button className="ticketsButton px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-lg rounded border border-white transition-all duration-300">
              BOLETOS
            </button>
          </div>
        </div>
        <div className="faqContainer flex flex-col items-center pt-5">
          <h2 className="bg-yellow-300 w-full text-4xl text-center font-bold mb-4">
            PREGUNTAS FRECUENTES
          </h2>
          <p className="text-center">
            ¿CÓMO SE ELIGE A LOS GANADORES?
            <br />
            Todos nuestros sorteos se realizan en base a la Lotería Nacional
            para la Asistencia Pública mexicana.​
            <br />
            El ganador de Rifas Economicas Chihuahua será el participante cuyo
            número de boleto coincida con las últimas cifras del primer premio
            ganador de la Lotería Nacional (las fechas serán publicadas en
            nuestra página oficial).
          </p>
          <p className="text-center">
            ¿QUÉ SUCEDE CUANDO EL NÚMERO GANADOR ES UN BOLETO NO VENDIDO?
            <br />
            Se elige un nuevo ganador realizando la misma dinámica en otra fecha
            cercana (se anunciará la nueva fecha).
            <br />
            Esto significa que, ¡Tendrías el doble de oportunidades de ganar con
            tu mismo boleto!
          </p>
          <p className="text-center">
            ¿DÓNDE SE PUBLICA A LOS GANADORES?
            <br />
            En nuestra página oficial de Facebook Rifas Economicas Chihuahua
            puedes encontrar todos y cada uno de nuestros sorteos anteriores,
            así como las transmisiones en vivo con Lotería Nacional y las
            entregas de premios a los ganadores!
            <br />
            Encuentra transmisión en vivo de los sorteos en nuestra página de
            Facebook en las fechas indicadas a las 20:00 hrs CDMX. ¡No te lo
            pierdas!
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
