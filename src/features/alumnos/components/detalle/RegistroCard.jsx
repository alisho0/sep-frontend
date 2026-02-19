import React, { useState } from "react";
import { CalendarIcon } from "@heroicons/react/20/solid";
import { useDispatch, useSelector } from "react-redux";
import { ChevronLeftIcon, ChevronRightIcon, PlusIcon } from "@heroicons/react/16/solid";
import { abrirModal } from "../../../../reducers/uiSlice";
import { RegistroDatos } from "./RegistroDatos";
import { showAlert } from "../../../../utils/alert";
import { detalleRegistro } from "../../../../reducers/registrosSlice";
import { BotonIcono } from "../../../../utils/components/BotonIcono";
import { EyeIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useObservacion } from "../../../../hooks/useObservacion";

export const RegistroCard = () => {
  const { handleDelete } = useObservacion();
  const { aniosDisponibles, registro } = useSelector(
    (state) => state.registros
  );
  const { alumno } = useSelector((state) => state.alumnos);
  const [selected, setSelected] = useState();
  const dispatch = useDispatch();

  const [page, setPage] = useState(0);
  const itemsPorPage = 6;
  const startIndex = page * itemsPorPage;
  const endIndex = startIndex + itemsPorPage;

  const observacion = registro.observaciones || [];
  const observacionesPaginadas = observacion.slice(startIndex, endIndex);

  const handleChangeRegistro = async (anio) => {
    try {
      await dispatch(detalleRegistro({ id: anio.id }));
    } catch (error) {
      showAlert({
        title: "Cambio fallido",
        text:
          error.message ||
          "Error al cambiar de registro. Intentalo nuevamente.",
        icon: "error",
      });
    }
  };
  

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border-gray-300 md:col-span-3">
      <div className="flex justify-between items-center ">
        <div>
          <h3 className="text-md font-semibold">Registros y Observaciones</h3>
          <p className="text-gray-600 text-sm">
            Historial de observaciones por año lectivo
          </p>
        </div>
        <button
          className="bg-indigo-600 text-white px-3 py-1 rounded-lg hover:bg-indigo-700 transition-colors font-medium hover:cursor-pointer flex items-center gap-1"
          onClick={() =>
            dispatch(
              abrirModal({
                modalAbierto: true,
                tipo: "crearRegistro",
                data: alumno,
              }),
            )
          }
        >
          <PlusIcon className="h-5 w-5" />
          Nuevo Registro
        </button>
      </div>

      <RegistroDatos registro={registro} />

      <div className="flex justify-between items-center mt-6">
        <div className="flex bg-indigo-600 w-fit rounded-lg p-1">
          {Array.isArray(aniosDisponibles) && aniosDisponibles.length > 0 ? aniosDisponibles.map((anio) => {
            const isSelected = anio.anio == registro.anioCiclo;
            return (
              <button
                key={anio.id}
                className={`text-white px-2 py-0.5 rounded font-semibold hover:cursor-pointer hover:bg-indigo-700 transition ${
                  isSelected ? "bg-indigo-900" : ""
                }`}
                onClick={() => handleChangeRegistro(anio)}
              >
                {anio.anio}
              </button>
            );
          }) : <span className="text-gray-300 italic px-2 py-0.5">No hay registros</span>}
        </div>

        <button
          className="bg-indigo-600 text-white px-3 py-1 rounded-lg hover:bg-indigo-700 transition-colors font-medium hover:cursor-pointer flex items-center gap-1"
          onClick={() =>
            dispatch(
              abrirModal({
                modalAbierto: true,
                tipo: "agregarObservacion",
                data: alumno,
              }),
            )
          }
        >
          <PlusIcon className="h-5 w-5" />
          Nueva Observación
        </button>
      </div>

      <div className="flex flex-col gap-3 mt-6">
        {observacionesPaginadas?.length > 0 &&
          observacionesPaginadas.map((obs, idx) => (
            <div
              className="border border-gray-400 p-4 rounded-lg bg-gray-100 hover:bg-gray-300 transition-colors"
              key={idx}
            >
              <div className="flex justify-between mb-4">
                <div className="flex gap-3">
                  <div className="flex items-center gap-1">
                    <CalendarIcon className="h-4 w-4 text-gray-600 " />
                    <h3 className="text-sm text-gray-600 font-medium">
                      {obs.fecha}
                    </h3>
                  </div>
                  <span className="bg-indigo-600 text-sm text-white px-2 py-0.5 rounded-lg font-semibold shadow-lg">{obs.motivo}</span>
                </div>
                <p className="text-xs font-medium text-white border bg-gray-600 px-2 py-0.5 rounded-lg ">
                  {obs.nombreUsuario}
                </p>
              </div>
              <div className="flex flex-col md:flex-row md:gap-2 gap-3 justify-between">
                <p className="leading-relaxed line-clamp-3">{obs.contenido}</p>
                <div className="flex flex-col gap-2">
                  <BotonIcono
                    texto={""}
                    Icono={EyeIcon}
                    className="bg-indigo-600 text-white hover:bg-indigo-700 transition hover:shadow-md flex justify-center"
                    onClick={() =>
                      dispatch(
                        abrirModal({
                          modalAbierto: true,
                          tipo: "mostrarObservacion",
                          data: obs,
                        }),
                      )
                    }
                  />
                  <BotonIcono
                    texto={""}
                    Icono={TrashIcon}
                    className="bg-red-600 text-white hover:bg-red-700 transition hover:shadow-md flex justify-center"
                    onClick={() => handleDelete(obs.id)}
                  />
                </div>
              </div>
            </div>
          ))}
      </div>
      <nav className="flex gap-1 mt-4 justify-center">
        <button
          disabled={page === 0}
          className="cursor-pointer"
          onClick={() => setPage(page-1)}
        >
          <ChevronLeftIcon
            className={`h-5 w-5 text-indigo-600  hover:text-indigo-800 ${page === 0 ? "opacity-50 cursor-not-allowed" : ""}`}
          />
        </button>
        {Array.from(
          { length: Math.ceil(observacion.length / itemsPorPage) },
          (_, i) => (
            <button
              key={i}
              onClick={() => setPage(i)}
              className={`${i === page ? 'bg-indigo-700' : 'border bg-indigo-600/70'} transition cursor-pointer text-white font-semibold px-3 py-1 rounded-md hover:bg-indigo-700`}
            >
              {i + 1}
            </button>
          ),
        )}
        <button
          disabled={page === Math.ceil(observacion.length / itemsPorPage) - 1}
          className="cursor-pointer"
          onClick={() => setPage(page+1)}
        >
          <ChevronRightIcon
            className={`h-5 w-5 text-indigo-600 hover:text-indigo-800 ${page === Math.ceil(observacion.length / itemsPorPage) - 1 ? "opacity-50 cursor-not-allowed" : ""}`}
          />
        </button>
      </nav>
    </div>
  );
};
