import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { BotonIcono } from "../../../utils/components/BotonIcono";
import {
  ArrowLeftIcon,
  EyeIcon,
  TrashIcon,
  UsersIcon,
} from "@heroicons/react/16/solid";
import { useDispatch, useSelector } from "react-redux";
import { detalleGrado, eliminarCiclo } from "../../../reducers/gradosSlice";
import { CardMetrica } from "../../../utils/components/CardMetrica";
import { confirmationAlert, showAlert } from "../../../utils/alert";
import { abrirModal } from "../../../reducers/uiSlice";
export const GradoDetalle = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { gradoActual } = useSelector((state) => state.grados);

  const [seccionSelected, setSeccionSelected] = useState(0);
  const idSeccion = gradoActual.seccionCiclos[seccionSelected]?.id;

  useEffect(() => {
    dispatch(detalleGrado(id));
  }, []);

  const handleDeleteCiclo = async (id) => {
    const res = await confirmationAlert({
      title: 'Eliminar',
      text: '¿Estás seguro de eliminar este ciclo?',
      icon: 'warning'
    })

      if (!res.isConfirmed) {
        return
      }
      try {
        const delCiclo = await dispatch(eliminarCiclo(id));
        if (eliminarCiclo.fulfilled.match(delCiclo)) {
          showAlert({
            title: 'Ciclo eliminado',
            text: 'El ciclo fue eliminado correctamente',
            icon: 'success'
          })
        } else if(eliminarCiclo.rejected.match(delCiclo)) {
          throw new Error("El ciclo no pudo ser eliminado correctamente. Intentalo de nuevo.");
        }
      } catch(e) {
        showAlert({
          title: 'Error al eliminar ciclo',
          text: e.message || 'El ciclo no se pudo eliminar',
          icon: 'error'
        });
      }
  }

  return (
    <>
      <div className="container mx-auto md:px-28 px-4 pt-9">
        <div > 
          <button
            className="col-span-1 md:col-span-3 text-left flex gap-2 items-center hover:bg-indigo-700 hover:text-white mb-3 w-fit py-1 px-2 rounded-lg transition-colors"
            onClick={() => navigate(-1)}
          >
            <ArrowLeftIcon className="w-5 h-5" />
            <span className="font-semibold">Volver</span>
          </button>
          <h1 className="font-semibold text-3xl mb-2">{gradoActual.nro}° Grado</h1>
        </div>
        <div>
          <CardMetrica
            texto={"Total de alumnos actual"}
            Icono={UsersIcon}
            data={gradoActual.inscriptosActuales}
          />
        </div>
        <div className="mt-6">
          <h2 className="font-semibold text-2xl mb-4">Secciones y Ciclos</h2>
          <div className="flex gap-3 border-b border-gray-400 mb-6">
          {/* El map para cada seccion */}
            {gradoActual.seccionCiclos.map((sc, idx) => (
              <button key={idx} className={`p-4 font-semibold hover:text-black transition ${seccionSelected === idx ? "text-black border-b-2 border-black" : "text-gray-600 hover:text-black"}`} onClick={() => {
                setSeccionSelected(idx)
              }}>
                Seccion {sc.seccion} | T{sc.turno}
              </button>
            ))}
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md border-gray-300">
            <div className="flex md:justify-between md:items-center mb-4 md:flex-row flex-col border-b pb-3">
              <h3 className="font-semibold text-xl">Ciclos de la Sección</h3>
              <BotonIcono
                className="hover:bg-indigo-700 justify-center"
                texto={"Nuevo Ciclo"}
                onClick={() =>
                  dispatch(abrirModal({ tipo: "crearCiclo", data: { id: idSeccion, grado: gradoActual.nro, idActual: id }}))}/>
            </div>
              {/* Aquí van los ciclos de lo seleccionado */}
              {gradoActual.seccionCiclos[seccionSelected]?.gradoCiclos?.length > 0 ? (
                <>
                  {gradoActual.seccionCiclos[seccionSelected]?.gradoCiclos.map((ciclo) => (
                    <div key={ciclo.id} className="border rounded-lg bg-gray-100 p-3 mb-4 flex md:justify-between md:items-center md:flex-row flex-col shadow-md">
                      <div>
                        <h4 className="font-semibold text-lg">Ciclo {ciclo.anio}</h4>
                        <p className="text-gray-700">{ciclo.cantAlumnos} alumnos</p>
                      </div>
                      <div className="flex md:flex-row flex-col md:mt-0 mt-2 gap-2">
                        <BotonIcono Icono={EyeIcon} className="hover:bg-indigo-700 justify-center" />
                        <BotonIcono onClick={() => handleDeleteCiclo(ciclo.id)} Icono={TrashIcon} className="hover:bg-red-700 justify-center" />
                      </div>
                    </div>
                  ))}
                </>
              ) : (<p className="text-gray-500 italic">No hay ciclos disponibles.</p>)}
          </div>
        </div>
      </div>
    </>
  );
};
