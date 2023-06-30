import React from "react";

const GraciasySuerte = () => {
  // Sample data
  const boletoNumbers = [3996, 4003, 7996, 8003];
  const sorteo = "JEEP COMPASS 2023";
  const nombre = "MARÍA DE LOURDES";
  const apellido = "HERNÁNDEZ ALMANZA";
  const estado = "GUANAJUATO";
  const pagado = "PAGADO";
  const compra = "MAY 28 2023 08:46:24";

  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold">LOTTO SORTEOS</h1>
      <h2 className="text-2xl font-bold mt-4">Boleto:</h2>
      <p className="text-xl">{boletoNumbers.join(", ")}</p>
      <h2 className="text-2xl font-bold mt-4">SORTEO:</h2>
      <p className="text-xl">{sorteo}</p>
      <h2 className="text-2xl font-bold mt-4">NOMBRE:</h2>
      <p className="text-xl">{nombre}</p>
      <h2 className="text-2xl font-bold mt-4">APELLIDO:</h2>
      <p className="text-xl">{apellido}</p>
      <h2 className="text-2xl font-bold mt-4">ESTADO:</h2>
      <p className="text-xl">{estado}</p>
      <h2 className="text-2xl font-bold mt-4">PAGADO:</h2>
      <p className="text-xl">{pagado}</p>
      <h2 className="text-2xl font-bold mt-4">COMPRA:</h2>
      <p className="text-xl">{compra}</p>
      <p className="text-2xl font-bold mt-8">¡MUCHA SUERTE!</p>
    </div>
  );
};

export default GraciasySuerte;
