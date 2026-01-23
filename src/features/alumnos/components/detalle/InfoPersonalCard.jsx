import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export const InfoPersonalCard = () => {

    const { alumno } = useSelector((state) => state.alumnos);
    // Usar las discapacidades del alumno, no el catálogo global
    const discapacidades = alumno?.discapacidades || [];

  return (
    <>
      <div className="bg-white p-6 rounded-lg shadow-md border-gray-300 md:col-span-2">
        <div>
          <h3 className="text-md font-semibold">Información Personal</h3>
          <p className="text-gray-600 text-sm">Datos del alumno</p>
        </div>
        <div className="grid md:grid-cols-2 gap-6 mt-6">
          <div>
            <label className="text-sm font-medium text-gray-600">
              Nombre Completo
            </label>
            <p className="font-medium">{`${alumno?.nombre || ""} ${
              alumno?.apellido || ""
            }`}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-600">DNI</label>
            <p className="font-medium">{alumno?.dni || ""}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-600">
              Domicilio
            </label>
            <p className="font-medium">{alumno?.domicilio || ""}</p>
          </div>
          <div className="bg-amber-500/10 col-span-2 p-3 rounded-lg text-white border border-amber-500/20">
            <div className="flex gap-2 items-center text-amber-500 mb-2">
              <ExclamationCircleIcon className="w-5 h-5" />
              <h3 className="font-semibold">Discapacidades Registradas</h3>
            </div>
            <div className="flex gap-1">
              {Array.isArray(discapacidades) && discapacidades.length > 0 ? discapacidades.map((d, idx) => (
                  <span key={idx} className="px-2 py-0.5 font-semibold bg-amber-500/20 border-amber-500/40 text-amber-700 rounded-xl text-sm border">{d}</span>
              )) : <span className="italic  text-amber-700 text-sm">No hay discapacidades registradas</span>}
            </div>
            {alumno?.detalleDiscap && (
              <div className="bg-gray-800 p-2 mt-4 rounded-lg border border-gray-700">
                <h4 className="font-semibold">Descripción adicional</h4>
                <p className="text-sm italic">{alumno?.detalleDiscap || "No hay detalle registrado"}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
