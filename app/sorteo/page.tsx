"use client";
import Buttons from "../components/Buttons";
import CarroYfecha from "../components/CarroYfecha";
import Footer from "../components/Footer";
import FotoCarrosel from "../components/FotoCarrosel";
import Navbar from "../components/Navbar";
import CountdownTimer from "../components/CountdownTimer";

export default function Home() {
  return (
    <div className="">
      <Navbar />

      <main className=" flex min-h-screen flex-col items-center justify-between pt-16 md:pt-20 ">
        <CarroYfecha />
        <FotoCarrosel />

        <Buttons />
        <CountdownTimer />
        <p className="text-center my-5 text-4xl text-white">
          CON TU BOLETO LIQUIDADO PARTICIPAS POR
        </p>
        <CarroYfecha />
        <FotoCarrosel />
        <div className="text-center text-2xl pb-2 ">
          <p className="mt-5 text-5xl font-bold my-5 bg-yellow-300 w-full ">
            COMBO - 30 JUNIO
          </p>

          <h3 className="mt-5 text-4xl font-bold">PRESORTEOS:</h3>

          <ul className="list-disc list-inside mt-3 text-center">
            <li>$50,000 </li>
          </ul>

          <h3 className="mt-5 text-4xl font-bold">BONOS:</h3>

          <p className="mt-3 text-2xg text-black px-2">
            SI ERES EL GANADOR DEL COMBO Y PAGAS TU BOLETO ANTES DE 12 HRS TE
            LLEVAS: <span className="text-yellow-300">$50,000 MXN</span>
            <br />
            <br /> SI PAGAS TU BOLETO ANTES DE 6 HRS TE LLEVAS:{" "}
            <span className="text-yellow-300">JEEP MOJAVE + $50,000 MXN</span>
          </p>
        </div>
        {/* </div> */}
      </main>
      <Footer />
    </div>
  );
}
