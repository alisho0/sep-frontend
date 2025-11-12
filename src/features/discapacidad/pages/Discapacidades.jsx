import { PlusIcon, TrashIcon } from "@heroicons/react/16/solid";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listarDiscapacidades } from "../../../reducers/discapacidadesSlice";
import { abrirModal } from "../../../reducers/uiSlice";

export const Discapacidades = () => {
  const { discapacidades, loading } = useSelector(
    (state) => state.discapacidades
  );
  
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listarDiscapacidades());
  }, []);

  return (
    <>
      <div className="container mx-auto px-4 pt-9">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-semibold">Gestión de Discapacidades</h1>
            <p>Administre los tipos de discapacidades disponibles en el sistema</p>
          </div>
          <button className="bg-indigo-600 px-2 py-1 rounded-lg text-white flex gap-1 items-center cursor-pointer hover:bg-indigo-700 transition-colors">
            <PlusIcon className="w-5 h-5" />
            <p className="font-semibold" onClick={() => dispatch(abrirModal({
              modalAbierto: true, 
              tipo: 'crearDiscapacidad', 
              modalData: null
            }))}>Nueva Discapacidad</p>
          </button>
        </div>

        <section className="bg-white p-6 rounded-lg shadow-md border-gray-300 mt-5">
          <h2 className="text-xl font-semibold">Discapacidades del Sistema</h2>
          <p className="text-gray-500 text-md">Total: {discapacidades.length}</p>
          <div className="mt-6 grid md:grid-cols-3 sm:grid-cols-2 gap-3">
            {discapacidades.map((d, idx) => (
              <div className="border border-gray-400 rounded-xl px-4 py-4 bg-white flex flex-col md:flex-row items-center justify-between gap-2 w-full flex-wrap hover:bg-gray-200 transition-colors" key={idx}>
                <h4 className="text-center md:text-left w-full md:w-auto break-words font-semibold">
                  {d.nombre}
                </h4>

                <button className="flex items-center bg-red-700 py-1 px-2 gap-1 rounded-lg hover:bg-red-800 transition-colors w-full md:w-auto justify-center cursor-pointer">
                  <p className="text-white font-semibold">Eliminar</p>
                  <TrashIcon className="w-5 h-5 text-white" />
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
};
