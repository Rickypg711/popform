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
        <Buttons />
      </main>
      <Footer />
    </div>
  );
}
