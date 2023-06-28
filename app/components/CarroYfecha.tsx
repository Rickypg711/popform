"use client";
import React, { useEffect, useState } from "react";

export default function CarroYfecha() {
  const [rifa, setRifa] = useState("");
  const [bono, setBono] = useState("");
  const [fechaDeSorteo, setFechaDeSorteo] = useState("");
  // Inside your fetchData function

  useEffect(() => {
    async function fetchData() {
      try {
        const rifaRes = await fetch("/api/config/rifaYbono");
        const rifaData = await rifaRes.json();
        setRifa(rifaData.rifa);

        const bonoRes = await fetch("/api/config/rifaYbono");
        const bonoData = await bonoRes.json();
        setBono(bonoData.bono);

        const fechaDeSorteoRes = await fetch("/api/config/fechaDeSorteo");
        const fechaDeSorteoData = await fechaDeSorteoRes.json();
        const fechaDeSorteoDate = new Date(fechaDeSorteoData.fechaDeSorteo);
        const formattedDate =
          `${fechaDeSorteoDate.getDate()} ${fechaDeSorteoDate.toLocaleString(
            "es",
            { month: "long" }
          )} ${fechaDeSorteoDate.getFullYear()}`.toUpperCase();
        setFechaDeSorteo(formattedDate);
      } catch (error) {
        console.error("Failed to fetch data: ", error);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="pt-20 bg-black w-full">
      <h1 className="rifa text-3xl lg:text-6xl font-bold text-center text-yellow-300">
        {rifa}
      </h1>
      <p className="bono mt-3 text-2xl font-bold text-center text-red-500">
        {bono}
      </p>
      <p className="fecha-de-sorteo mt-3 text-2xl font-bold text-center text-yellow-300">
        {fechaDeSorteo}
      </p>
    </div>
  );
}
