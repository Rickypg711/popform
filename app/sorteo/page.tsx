"use client";
import Buttons from "../components/Buttons";
import CarroYfecha from "../components/CarroYfecha";
import Footer from "../components/Footer";
import FotoCarrosel from "../components/FotoCarrosel";
import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <div className="">
      <Navbar />

      <main className=" flex min-h-screen flex-col items-center justify-between pt-16 md:pt-20 ">
        <CarroYfecha />
        <FotoCarrosel />

        <Buttons />

        <p className="text-center mt-5 text-3xl text-white">
          CON TU BOLETO LIQUIDADO PARTICIPAS POR
        </p>
        <CarroYfecha />
        <FotoCarrosel />
        <p className="mt-5 text-3xl font-bold">COMBO - 30 JUNIO</p>

        <h3 className="mt-5 text-2xl font-bold">PRESORTEOS:</h3>

        <ul className="list-disc list-inside mt-3 text-left">
          <li>$20,000 MXN - ENTREGADO</li>
          <li>$20,000 MXN - ENTREGADO</li>
        </ul>

        <h3 className="mt-5 text-2xl font-bold">BONOS:</h3>

        <p className="mt-3 text-lg text-gray-500">
          SI ERES EL GANADOR DEL COMBO Y PAGAS TU BOLETO ANTES DE 12 HRS TE
          LLEVAS: $50,000 MXN
        </p>

        <p className="mt-3 text-lg text-gray-500">
          SI PAGAS TU BOLETO ANTES DE 6 HRS TE LLEVAS: JEEP MOJAVE + $50,000 MXN
        </p>
        {/* </div> */}
        <FotoCarrosel />
      </main>
      <Footer />
    </div>
  );
}
