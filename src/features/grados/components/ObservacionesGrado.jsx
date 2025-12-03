import { CalendarIcon, ChatBubbleBottomCenterIcon, PlusIcon } from "@heroicons/react/16/solid";
import React from "react";
import { BotonIcono } from "../../../utils/components/BotonIcono";

export const ObservacionesGrado = () => {
  return (
    <div className="rounded-lg shadow-lg px-4 py-3 bg-white">
      <div className="flex items-center justify-between mb-5 flex-wrap">
        <div className="flex items-center gap-2">
          <ChatBubbleBottomCenterIcon className="h-5 w-5" />
          <h2 className="text-xl font-semibold">Observaciones realizadas</h2>
        </div>
        <BotonIcono
          texto={"Agregar observación"}
          Icono={PlusIcon}
          className="bg-indigo-600 hover:bg-indigo-700 text-white"
        />
      </div>
      <div className="border border-gray-400 p-4 rounded-lg bg-gray-100 hover:bg-gray-300 transition-colors mb-3">
        <div className="flex justify-between mb-4">
          <div className="flex items-center gap-1">
            <CalendarIcon className="h-4 w-4 text-gray-600 " />
            <h3 className="text-sm text-gray-600 font-medium">2025/12/10</h3>
          </div>
          <p className="text-xs font-medium text-white border bg-gray-600 px-2 py-0.5 rounded-lg ">
            Magdalena Quintana
          </p>
        </div>
        <p className="leading-relaxed">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dignissimos,
          ut. Dolor quae facilis molestias dignissimos voluptate laboriosam ea
          provident, corporis temporibus, cupiditate aut, harum blanditiis
          minima qui ullam repellendus quia!
        </p>
      </div>
    </div>
  );
};
