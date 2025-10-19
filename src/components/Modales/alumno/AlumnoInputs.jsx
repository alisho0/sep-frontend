import React from "react";
import { useFormContext } from "react-hook-form";

export const AlumnoInputs = () => {
    const { register } = useFormContext();
  return (
    <>
      <div className="flex flex-col col-span-2 md:col-span-1">
        <label htmlFor="nombre" className="text-sm font-medium text-gray-700">
          Nombre
        </label>
        <input
          className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          type="text"
          placeholder="Escribe el nombre..."
          id="nombre"
          name="nombre"
          {...register("nombre", { required: true })}
        />
      </div>
      <div className="flex flex-col col-span-2 md:col-span-1">
        <label htmlFor="apellido" className="text-sm font-medium text-gray-700">
          Apellido
        </label>
        <input
          className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          type="text"
          placeholder="Escribe el apellido..."
          id="apellido"
          name="apellido"
          {...register("apellido", { required: true })}
        />
      </div>
      <div className="flex flex-col col-span-2 md:col-span-1">
        <label htmlFor="dni" className="text-sm font-medium text-gray-700">
          Documento
        </label>
        <input
          className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          type="text"
          placeholder="Escribe el DNI..."
          id="dni"
          name="dni"
          {...register("dni", { required: true })}
        />
      </div>
      <div className="flex flex-col col-span-2 md:col-span-1">
        <label
          htmlFor="domicilio"
          className="text-sm font-medium text-gray-700"
        >
          Domicilio
        </label>
        <input
          className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          type="text"
          placeholder="Escribe el domicilio..."
          id="domicilio"
          name="domicilio"
          {...register("domicilio", { required: true })}
        />
      </div>
    </>
  );
};
