import React, { ChangeEvent } from "react";

interface EstadosProps {
  value: string;
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
}

const Estados: React.FC<EstadosProps> = ({ value, onChange }) => {
  return (
    <select
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      value={value}
      onChange={onChange}
    >
      <option value="">SELECCIONA ESTADO</option>
      <option value="ESTADOS UNIDOS">ESTADOS UNIDOS</option>
      <option value="OTRO PAIS">OTRO PAIS</option>
      <option value="AGUASCALIENTES">AGUASCALIENTES</option>
      <option value="BAJA CALIFORNIA">BAJA CALIFORNIA</option>
      <option value="BAJA CALIFORNIA SUR">BAJA CALIFORNIA SUR</option>
      <option value="CAMPECHE">CAMPECHE</option>
      <option value="CIUDAD DE MÉXICO">CIUDAD DE MÉXICO</option>
      <option value="COAHUILA">COAHUILA</option>
      <option value="COLIMA">COLIMA</option>
      <option value="CHIAPAS">CHIAPAS</option>
      <option value="CHIHUAHUA">CHIHUAHUA</option>
      <option value="DURANGO">DURANGO</option>
      <option value="ESTADO DE MÉXICO">ESTADO DE MÉXICO</option>
      <option value="GUANAJUATO">GUANAJUATO</option>
      <option value="GUERRERO">GUERRERO</option>
      <option value="HIDALGO">HIDALGO</option>
      <option value="JALISCO">JALISCO</option>
      <option value="MICHOACÁN">MICHOACÁN</option>
      <option value="MORELOS">MORELOS</option>
      <option value="NAYARIT">NAYARIT</option>
      <option value="NUEVO LEÓN">NUEVO LEÓN</option>
      <option value="OAXACA">OAXACA</option>
      <option value="PUEBLA">PUEBLA</option>
      <option value="QUERÉTARO">QUERÉTARO</option>
      <option value="QUINTANA ROO">QUINTANA ROO</option>
      <option value="SAN LUIS POTOSÍ">SAN LUIS POTOSÍ</option>
      <option value="SINALOA">SINALOA</option>
      <option value="SONORA">SONORA</option>
      <option value="TABASCO">TABASCO</option>
      <option value="TAMAULIPAS">TAMAULIPAS</option>
      <option value="TLAXCALA">TLAXCALA</option>
      <option value="VERACRUZ">VERACRUZ</option>
      <option value="YUCATÁN">YUCATÁN</option>
      <option value="ZACATECAS">ZACATECAS</option>
    </select>
  );
};

export default Estados;
