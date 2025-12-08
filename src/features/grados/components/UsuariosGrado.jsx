import { InformationCircleIcon, PlusIcon, TrashIcon } from "@heroicons/react/16/solid";
import React, { useEffect } from "react";
import { BotonIcono } from "../../../utils/components/BotonIcono";
import { useDispatch, useSelector } from "react-redux";
import { listarMaestros } from "../../../reducers/maestrosSlice";

export const UsuariosGrado = ({cicloId}) => {

  const dispatch = useDispatch();
  const { maestrosAsignados, maestrosDisponibles } = useSelector((state) => state.maestros);

  useEffect(() => {
    dispatch(listarMaestros(cicloId))
  }, [cicloId]);

  return (
    <div className="rounded-lg px-4 py-3 bg-white shadow-lg">
      <div className="flex items-center gap-2 mb-3">
        <InformationCircleIcon className="h-5 w-5" />
        <h2 className="text-xl font-semibold">Maestros a cargo</h2>
      </div>

      {maestrosAsignados.map((m, idx) => (
          <div key={idx} className="flex justify-between items-center border rounded-xl px-3 py-2 shadow-lg bg-gray-100 mb-2">
            <div>
              <p className="font-semibold">{m.usuario}</p>
              <p className="text-sm text-gray-700">{m.correo}</p>
            </div>
            <BotonIcono
              Icono={TrashIcon}
              className="bg-indigo-600 hover:bg-red-600 text-white transition-colors"
            />
          </div>
      ))}
      <BotonIcono texto={"Agregar maestro"} Icono={PlusIcon} className="bg-indigo-600 hover:bg-indigo-700 transition-colors text-white" />
    </div>
  );
};
