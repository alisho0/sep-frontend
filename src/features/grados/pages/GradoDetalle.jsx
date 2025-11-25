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
import { confirmationAlert } from "../../../utils/alert";
export const GradoDetalle = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { gradoActual } = useSelector((state) => state.grados);

  const [seccionSelected, setSeccionSelected] = useState(0);

  useEffect(() => {
    dispatch(detalleGrado(id));
  }, []);

  const handleDeleteCiclo = async (id) => {
    await confirmationAlert({
      title: 'Eliminar',
      text: '¿Estás seguro de eliminar este ciclo?',
      icon: 'warning'
    }).then((res) => {
      if (!res.isConfirmed) {
        return
      }
      try {
        const delCiclo = dispatch(eliminarCiclo(id));
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
    })
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
              <button key={idx} className={`p-4 font-semibold hover:text-black transition ${seccionSelected === idx ? "text-black border-b-2 border-black" : "text-gray-600 hover:text-black"}`} onClick={() => setSeccionSelected(idx)}>
                Seccion {sc.seccion}
              </button>
            ))}
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md border-gray-300">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-xl">Ciclos de la Sección</h3>
              <BotonIcono
                texto={"Nuevo Ciclo"}
                onClick={() =>
                  dispatch(abrirModal({ tipo: "crearCiclo", data: { id: g.id, grado: g.grado }}))}/>
            </div>
              {/* Aquí van los ciclos de lo seleccionado */}
              {gradoActual.seccionCiclos[seccionSelected]?.gradoCiclos?.length > 0 ? (
                <>
                  {gradoActual.seccionCiclos[seccionSelected]?.gradoCiclos.map((ciclo) => (
                    <div key={ciclo.id} className="border rounded-lg bg-gray-100 p-3 mb-4 flex justify-between items-center">
                      <div>
                        <h4 className="font-semibold text-lg">Ciclo {ciclo.anio}</h4>
                        <p className="text-gray-700">{ciclo.cantAlumnos} alumnos</p>
                      </div>
                      <div className="flex gap-2">
                        <BotonIcono onClick={() => handleDeleteCiclo(ciclo.id)} Icono={TrashIcon} className="hover:bg-red-700 justify-center" />
                        <BotonIcono Icono={EyeIcon} className="hover:bg-indigo-700 justify-center" />
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
