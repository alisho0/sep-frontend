import React from "react";
import { CalendarIcon } from "@heroicons/react/20/solid";
import { useDispatch, useSelector } from "react-redux";
import { PlusIcon } from "@heroicons/react/16/solid";
import { abrirModal } from "../../../reducers/uiSlice";
import { RegistroDatos } from "./RegistroDatos";

export const RegistroCard = () => {

    const { aniosDisponibles, registro } = useSelector((state) => state.registros);
    const { alumno } = useSelector((state) => state.alumnos);
    const dispatch = useDispatch();


  return (
    <div className="bg-white p-6 rounded-lg shadow-md border-gray-300 md:col-span-3">
      <div className="flex justify-between items-center ">
        <div>
            <h3 className="text-md font-semibold">Registros y Observaciones</h3>
            <p className="text-gray-600 text-sm">
            Historial de observaciones por año lectivo
            </p>
        </div>
        <button className="bg-indigo-600 text-white px-3 py-1 rounded-lg hover:bg-indigo-700 transition-colors font-medium hover:cursor-pointer flex items-center gap-1" onClick={() => dispatch(abrirModal({ modalAbierto: true, tipo: 'detalleAlumno', data: alumno }))}>
            <PlusIcon className="h-5 w-5" />
            Nuevo Registro
        </button>
      </div>

      <RegistroDatos registro={registro} />

      <div className="flex justify-between items-center mt-6">
        <div className="flex bg-indigo-600 w-fit rounded-lg p-1">
            {aniosDisponibles.map((anio) => {
                const isSelected = anio.anio == registro.anioCiclo
            return (
                <button
                key={anio.id}
                className={`text-white px-2 py-0.5 rounded font-semibold hover:cursor-pointer ${isSelected ? 'bg-indigo-900' : ''}`}
                onClick={() => console.log("Enviado")}
                >
                {anio.anio}
                </button>
            );
            })}
        </div>
        
        <button className="bg-indigo-600 text-white px-3 py-1 rounded-lg hover:bg-indigo-700 transition-colors font-medium hover:cursor-pointer flex items-center gap-1" onClick={() => dispatch(abrirModal({ modalAbierto: true, tipo: 'agregarObservacion', data: alumno }))} >
            <PlusIcon className="h-5 w-5" />
            Nueva Observación
        </button>
      </div>

      {registro?.observaciones?.length > 0 &&
        registro.observaciones.map((obs, idx) => (
          <div
            className="mt-6  border border-gray-400 p-4 rounded-lg bg-gray-100 hover:bg-gray-300 transition-colors"
            key={idx}
          >
            <div className="flex justify-between mb-4">
              <div className="flex items-center gap-1">
                <CalendarIcon className="h-4 w-4 text-gray-600 " />
                <h3 className="text-sm text-gray-600 font-medium">
                  {obs.fecha}
                </h3>
              </div>
              <p className="text-xs font-medium text-white border bg-gray-600 px-2 py-0.5 rounded-lg ">
                {obs.nombreUsuario}
              </p>
            </div>
            <p className="leading-relaxed">{obs.contenido}</p>
          </div>
        ))}

      <div></div>
    </div>
  );
};
