import React from "react";

export const CardMetrica = ({texto, data, Icono}) => {
  return (
    <div
      className="bg-white p-6 rounded-lg shadow-md border-gray-300 border  px-4 py-4 grid "
>
      <div className="flex justify-between self-center items-center">
        <span className="text-sm">{texto}</span>
        <Icono className="w-4 h-4" />
      </div>
      <span className="text-2xl font-semibold">{data}</span>
    </div>
  );
};
