import { CalendarIcon, ChatBubbleBottomCenterIcon, PlusIcon, ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/16/solid";
import React, { useEffect, useState } from "react";
import { BotonIcono } from "../../../utils/components/BotonIcono";
import { useDispatch, useSelector } from "react-redux";
import { eliminarObservacion, listarObservaciones } from "../../../reducers/observacionesSlice";
import { abrirModal } from "../../../reducers/uiSlice";
import { EyeIcon, TrashIcon } from "@heroicons/react/24/outline";
import { confirmationAlert, showAlert } from "../../../utils/alert";

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

  const handleDelete = async (id) => {
    await confirmationAlert({
      title: "¿Estás seguro?",
      text: "¿Estás seguro de eliminar esta observación?",
      icon: "warning",
      confirmButtonText:"Eliminar",
      cancelButtonText: "Cancelar"
    }).then((res) => {
          if (res.isConfirmed) {
          try {
            const eliminar = dispatch(eliminarObservacion(id));
            if (eliminarObservacion.fulfilled.match(eliminar)) {
              showAlert({
                title: "Observación eliminada",
                text: "La observación se eliminó correctamente.",
                icon: "success",
              });
            } else if (eliminarObservacion.rejected.match(eliminar)) {
              throw new Error(
                "La observación no pudo ser eliminado. Intentalo de nuevo."
              );
            }
          } catch (error) {
            showAlert({
              title: "Error al eliminar",
              text: error.message,
              icon: "error",
            });
          }
          }
        });
  }
  
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
          onClick={() => dispatch(abrirModal({
              modalAbierto: true,
              tipo: "agregarObservacionGrado",
              data: null
            }))}
        />
      </div>
      {observacionesPaginadas.map((o, idx) => (
        <div className="border border-gray-400 p-4 rounded-lg bg-gray-100 hover:bg-gray-300 transition-colors mb-3" key={idx}>
          <div className="flex flex-col md:flex-row justify-between mb-4">
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
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2 text-left">
            <p className="leading-relaxed line-clamp-3">
              {o.contenido}
            </p>
            <div className="flex flex-col gap-2">
              <BotonIcono texto={""} Icono={EyeIcon} className="bg-indigo-600 text-white hover:bg-indigo-700 transition hover:shadow-md flex justify-center" onClick={() => dispatch(abrirModal({
                modalAbierto: true,
                tipo: "mostrarObservacion",
                data: o,
              }))}/>
              <BotonIcono texto={""} Icono={TrashIcon} className="bg-red-600 text-white hover:bg-red-700 transition hover:shadow-md flex justify-center" onClick={() => handleDelete(o.id)}/>
            </div>
          </div>
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
