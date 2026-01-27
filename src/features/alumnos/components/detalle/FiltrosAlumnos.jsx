import React, { useState } from "react";
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import { InputBuscarAlumno } from "../utils/InputBuscarAlumno";
export const FiltrosAlumnos = ({ gradoSelect, setGradoSelect, turnoSelect, setTurnoSelect }) => {
  const grados = ['1', '2', '3', '4', '5', '6', '7'];
  const turnos = ['Mañana', 'Tarde'];

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <InputBuscarAlumno />
        <div className="flex items-center border border-gray-400 rounded-lg px-3 py-2 bg-white">
          <MagnifyingGlassIcon className="w-5 h-5 text-gray-500 mr-2" />
          <select className="w-full outline-none text-gray-700 bg-white" value={gradoSelect} onChange={(e) => setGradoSelect(e.target.value)}>
            <option value="" disabled>
              Seleccionar Grado
            </option>
            {grados.map((grado, idx) => (
              <option value={grado} key={idx}>
                {grado}°
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center border border-gray-400 rounded-lg px-3 py-2 bg-white">
          <MagnifyingGlassIcon className="w-5 h-5 text-gray-500 mr-2" />
          <select
            name="turnos"
            id="turnos"
            className="w-full outline-none text-gray-700 bg-white"
            value={turnoSelect}
            onChange={(e) => setTurnoSelect(e.target.value)}
          >
            <option value="" disabled>
              Seleccionar Turno
            </option>
            {turnos.map((turno, idx) => (
              <option value={turno.substring(0,1)} key={idx}>
                {turno}
              </option>
            ))}
          </select>
        </div>
      </div>
    </>
  );
};
