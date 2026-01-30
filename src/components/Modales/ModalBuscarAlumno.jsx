import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { InputBuscarAlumno } from "../../features/alumnos/components/utils/InputBuscarAlumno";

export const ModalBuscarAlumno = () => {
  const dispatch = useDispatch();
  const { alumnos } = useSelector((state) => state.alumnos);
  return (
    <>
      <div className="mb-4">
        <h2 className="font-semibold text-xl">Buscar alumno</h2>
        <p className="text-sm text-gray-800">
          Busca y selecciona un alumno para ver su perfil.
        </p>
      </div>
      <form>
        <InputBuscarAlumno />
        {Array.isArray(alumnos) && alumnos.length > 0 ? (
          <div className="max-h-60 overflow-y-auto mt-4">
            {alumnos.map((alumno) => (
              <div
                key={alumno.id}
                className="border rounded-lg bg-gray-100 hover:bg-gray-300 transition-colors p-3 mb-2 flex md:justify-between md:items-center md:flex-row flex-col shadow-md gap-2"
              >
                <div>
                  <h4 className="font-semibold text-lg">
                    {alumno.nombre} {alumno.apellido}
                  </h4>
                  <p className="text-gray-700">{alumno.dni}</p>
                </div>
                <Link
                  to={`/alumnos/${alumno.id}`}
                  className="self-center md:justify-self-end w-full bg-indigo-600 p-2 rounded-lg cursor-pointer hover:bg-indigo-700 transition duration-150 flex justify-center md:w-auto"
                >
                    <p className="text-white font-semibold">Ver Perfil</p>
                    <MagnifyingGlassIcon className="h-5 w-5 text-white ml-2" />
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm italic text-gray-700 mt-4">
            No hay alumnos disponibles
          </p>
        )}
      </form>
    </>
  );
};
