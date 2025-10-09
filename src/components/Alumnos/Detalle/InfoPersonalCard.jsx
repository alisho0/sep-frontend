import React from "react";
import { useDispatch, useSelector } from "react-redux";

export const InfoPersonalCard = () => {

    const { alumno } = useSelector((state) => state.alumnos);

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
        </div>
      </div>
    </>
  );
};
