import { InformationCircleIcon, TrashIcon } from "@heroicons/react/16/solid";
import React from "react";
import { BotonIcono } from "../../../utils/components/BotonIcono";

export const UsuariosGrado = () => {
  return (
    <div className="rounded-lg px-4 py-3 bg-white shadow-lg">
      <div className="flex items-center gap-2 mb-3">
        <InformationCircleIcon className="h-5 w-5" />
        <h2 className="text-xl font-semibold">Maestros a cargo</h2>
      </div>

      <div className="flex justify-between items-center border rounded-xl px-3 py-2 shadow-lg bg-gray-100">
        <div>
          <p className="font-semibold">Juan Pérez</p>
          <p className="text-sm text-gray-700">correo@correo.com</p>
        </div>
        <BotonIcono
          Icono={TrashIcon}
          className="bg-indigo-600 hover:bg-red-600 text-white"
        />
      </div>
    </div>
  );
};
