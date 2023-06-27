"use client";
import Buttons from "../components/Buttons";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <div className=" bg-red-300">
      <Navbar />

      <main className="flex flex-col items-center justify-center w-full flex-1 px-2 sm:px-4 md:px-8 lg:px-20 text-center py-20">
        <h1 className="text-3xl lg:text-6xl font-bold">
          JEEP MOJAVE 2023 + CHEYENNE HIGH COUNTRY 2023
        </h1>
        <p className="mt-3 text-2xl font-bold text-gray-500">
          30 DE JUNIO 2023
        </p>
        {/* <h2 className="text-4xl font-bold">LISTA DE BOLETOS ABAJO</h2> */}

        <Buttons />
        <h1 className="text-6xl font-bold">
          JEEP MOJAVE 2023 + CHEYENNE HIGH COUNTRY 2023
        </h1>

        <p className="mt-3 text-2xl">$50,000 MXN</p>

        <p className="mt-3 text-lg text-gray-500">30 DE JUNIO 2023</p>

        <div className="mt-5">
          <h2 className="text-4xl font-bold">LISTA DE BOLETOS ABAJO</h2>

          <ul className="list-disc list-inside mt-3 text-left">
            <li>1 BOLETO POR $63</li>
            <li>2 BOLETOS POR $124</li>
            <li>3 BOLETOS POR $184</li>
            <li>4 BOLETOS POR $239</li>
            <li>5 BOLETOS POR $298</li>
            <li>10 BOLETOS POR $595</li>
            <li>100 BOLETOS POR $5,950</li>
          </ul>

          <p className="mt-5">Con tu boleto liquidado participas por:</p>

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
            SI PAGAS TU BOLETO ANTES DE 6 HRS TE LLEVAS: JEEP MOJAVE + $50,000
            MXN
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}