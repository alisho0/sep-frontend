import { PlusIcon } from "@heroicons/react/16/solid";
import React from "react";

export const FormNuevoTutor = () => {
  return (
    <>
      <form className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {/* Nombre */}
        <div className="flex flex-col">
          <label htmlFor="nombre" className="text-sm font-medium text-gray-700">
            Nombre *
          </label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            placeholder="Nombre del tutor"
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Apellido */}
        <div className="flex flex-col">
          <label
            htmlFor="apellido"
            className="text-sm font-medium text-gray-700"
          >
            Apellido *
          </label>
          <input
            type="text"
            id="apellido"
            name="apellido"
            placeholder="Apellido del tutor"
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* DNI */}
        <div className="flex flex-col">
          <label htmlFor="dni" className="text-sm font-medium text-gray-700">
            DNI *
          </label>
          <input
            type="number"
            id="dni"
            name="dni"
            placeholder="DNI del tutor"
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Domicilio */}
        <div className="flex flex-col">
          <label
            htmlFor="domicilio"
            className="text-sm font-medium text-gray-700"
          >
            Domicilio *
          </label>
          <input
            type="text"
            id="domicilio"
            name="domicilio"
            placeholder="Domicilio del tutor"
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="domicilio"
            className="text-sm font-medium text-gray-700"
          >
            Teléfono *
          </label>
          <input
            type="text"
            id="domicilio"
            name="domicilio"
            placeholder="Teléfono del tutor"
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="domicilio"
            className="text-sm font-medium text-gray-700"
          >
            Teléfono Auxiliar
          </label>
          <input
            type="text"
            id="domicilio"
            name="domicilio"
            placeholder="Teléfono auxiliar (opcional)"
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <button className="flex bg-indigo-600 px-2 py-1 rounded-lg text-white w-full gap-2 font-semibold col-span-2 justify-center items-center hover:cursor-pointer hover:bg-indigo-700 transition-colors">
            <PlusIcon className="w-5 h-5"/>
            <p>Crear y Agregar Tutor</p>
        </button>
      </form>
    </>
  );
};
