import React, { useEffect, useState } from "react";

export default function CarroYfecha() {
  const [rifa, setRifa] = useState("");
  const [bono, setBono] = useState("");
  const [title, setTitle] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const rifaRes = await fetch("/api/config/rifaYbono");
        const rifaData = await rifaRes.json();
        setRifa(rifaData.rifa);

        const bonoRes = await fetch("/api/config/rifaYbono");
        const bonoData = await bonoRes.json();
        setBono(bonoData.bono);

        const titleRes = await fetch("/api/title");
        const titleData = await titleRes.json();
        setTitle(titleData.title);
      } catch (error) {
        console.error("Failed to fetch data: ", error);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="">
      <h1 className="rifa text-3xl lg:text-6xl font-bold">{rifa}</h1>
      <p className="bono mt-3 text-2xl font-bold">{bono}</p>
      <p className="title mt-3 text-2xl font-bold text-gray-500">{title}</p>
    </div>
  );
}
