import { CalendarIcon, ChatBubbleBottomCenterIcon, PlusIcon, ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/16/solid";
import React, { useEffect, useState } from "react";
import { BotonIcono } from "../../../utils/components/BotonIcono";
import { useDispatch, useSelector } from "react-redux";
import { listarObservaciones } from "../../../reducers/observacionesSlice";

export const ObservacionesGrado = ({ cicloId }) => {

  const { observacion } = useSelector((state) => state.observaciones);
  const dispatch = useDispatch();
  const [paginaActual, setPaginaActual] = useState(1);
  const observacionesPorPagina = 5;

  useEffect(() => {
    dispatch(listarObservaciones(cicloId));
  }, [cicloId]);

  const totalPaginas = Math.ceil(observacion.length / observacionesPorPagina);
  const indiceInicio = (paginaActual - 1) * observacionesPorPagina;
  const indiceFin = indiceInicio + observacionesPorPagina;
  const observacionesPaginadas = observacion.slice(indiceInicio, indiceFin);

  const irAPagina = (numeroPagina) => {
    if (numeroPagina >= 1 && numeroPagina <= totalPaginas) {
      setPaginaActual(numeroPagina);
    }
  };
  
  return (
    <div className="rounded-lg shadow-lg px-4 py-3 bg-white overflow-y-scroll">
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
      {observacionesPaginadas.map((o, idx) => (
        <div className="border border-gray-400 p-4 rounded-lg bg-gray-100 hover:bg-gray-300 transition-colors mb-3" key={idx}>
          <div className="flex justify-between mb-4">
            <p className="font-semibold">{o.alumno}</p>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <CalendarIcon className="h-4 w-4 text-gray-600 " />
                <h3 className="text-sm text-gray-600 font-medium">{o.fecha}</h3>
              </div>
              <p className="text-xs font-medium text-white border bg-gray-600 px-2 py-0.5 rounded-lg">
                {o.nombreUsuario}
              </p>
            </div>
          </div>
          <p className="leading-relaxed">
            {o.contenido}
          </p>
        </div>
      ))}

      {totalPaginas > 1 && (
        <div className="flex items-center justify-center gap-2 mt-4 pt-4 border-t border-gray-300">
          <button
            onClick={() => irAPagina(paginaActual - 1)}
            disabled={paginaActual === 1}
            className="p-1 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeftIcon className="h-5 w-5" />
          </button>

          {Array.from({ length: totalPaginas }, (_, i) => i + 1).map((numero) => (
            <button
              key={numero}
              onClick={() => irAPagina(numero)}
              className={`px-3 py-1 rounded-lg transition-colors ${
                paginaActual === numero
                  ? "bg-indigo-600 text-white font-semibold"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {numero}
            </button>
          ))}

          <button
            onClick={() => irAPagina(paginaActual + 1)}
            disabled={paginaActual === totalPaginas}
            className="p-1 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronRightIcon className="h-5 w-5" />
          </button>
        </div>
      )}
    </div>
  );
};
