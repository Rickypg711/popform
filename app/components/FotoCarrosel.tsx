import { Carousel } from "react-responsive-carousel";
import Image from "next/image";
import Link from "next/link";
import "react-responsive-carousel/lib/styles/carousel.min.css";

export default function FotoCarrosel({ showButton = true }) {
  return (
    <div className="carouselContainer relative bg-black">
      <Carousel
        autoPlay
        showThumbs={false}
        showIndicators={false}
        showStatus={false}
        infiniteLoop={true}
        interval={4000}
        className=""
      >
        <div className="imageContainer">
          <Image
            src="/ima/hutchilopostly.png"
            alt="Car Image 1"
            width={300}
            height={100}
            layout="responsive"
            priority // Add the priority attribute
          />
        </div>
        <div className="imageContainer">
          <Image
            src="/ima/solmadre.png"
            alt="Car Image 2"
            width={300}
            height={100}
            layout="responsive"
            priority // Add the priority attribute
          />
        </div>
        <div className="imageContainer">
          <Image
            src="/ima/weofthesun.png"
            alt="Car Image 3"
            width={300}
            height={100}
            layout="responsive"
            priority // Add the priority attribute
          />
        </div>
      </Carousel>
      {showButton && (
        <div className="buttonContainer absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center">
          <button className="ticketsButton px-4 py-2 bg-yellow-300 hover:bg-black text-black hover:text-yellow-300 border-black border-2 hover:border-2 hover:border-yellow-300 text-lg rounded-md transition-all duration-300 transform hover:scale-105">
            <Link href="/sorteo">COMPRA TUS BOLETOS</Link>
          </button>
        </div>
      )}
    </div>
  );
}
