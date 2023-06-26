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
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <h1 className="text-red-300">{title}</h1>
        <details></details>
        <summary>perro</summary>

        <div className="carouselContainer">
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
              <p className="legend">Legend 1</p>
            </div>
            <div className="imageContainer">
              <Image
                src="/ima/solmadre.png"
                alt="Car Image 2"
                width={300}
                height={300}
                layout="responsive"
              />
              <p className="legend">Legend 2</p>
            </div>
            <div className="imageContainer">
              <Image
                src="/ima/weofthesun.png"
                alt="Car Image 3"
                width={300}
                height={300}
                layout="responsive"
              />
              <p className="legend">Legend 3</p>
            </div>
          </Carousel>
        </div>

        <Buttons />

        <style jsx>{`
          .carouselContainer {
            width: 100%;
            max-width: 300px;
          }

          @media (min-width: 600px) {
            .carouselContainer {
              max-width: 200px;
            }
          }
        `}</style>
      </main>
      <Footer />
    </div>
  );
}
