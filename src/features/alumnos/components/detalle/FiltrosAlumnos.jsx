import React, { useState } from "react";
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'
export const FiltrosAlumnos = () => {

  const grados = ['1ro', '2do', '3ro', '4to', '5to'];
  const turnos = ['Mañana', 'Tarde'];
  const [gradoSelect, setGradoSelect] = useState("");
  const [turnoSelect, setTurnoSelect] = useState("");

  

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <div className="flex items-center border border-gray-400 rounded-lg px-3 py-2 bg-white">
          <MagnifyingGlassIcon className="w-5 h-5 text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Buscar por nombre"
            className="w-full outline-none text-gray-700 placeholder-gray-400"
          />
        </div>
        <div className="flex items-center border border-gray-400 rounded-lg px-3 py-2 bg-white">
          <MagnifyingGlassIcon className="w-5 h-5 text-gray-500 mr-2" />
          <select className="w-full outline-none text-gray-700 bg-white" value={gradoSelect} onChange={(e) => setGradoSelect(e.target.value)}>
            <option value="" disabled>
              Seleccionar Grado
            </option>
            {grados.map((grado, idx) => (
              <option value={grado} key={idx}>
                {grado}
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
              <option value={turno} key={idx}>
                {turno}
              </option>
            ))}
          </select>
        </div>
      </div>
    </>
  );
};
