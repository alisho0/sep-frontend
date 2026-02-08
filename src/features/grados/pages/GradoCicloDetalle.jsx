import React, { useEffect } from "react";
import { CardMetrica } from "../../../utils/components/CardMetrica";
import {
  ArrowLeftIcon,
  UsersIcon,
} from "@heroicons/react/16/solid";
import { useDispatch, useSelector } from "react-redux";
import { detalleCiclo, finalizarCiclo } from "../../../reducers/gradosSlice";
import { Link, useNavigate, useParams } from "react-router-dom";
import { BotonIcono } from "../../../utils/components/BotonIcono";
import { ObservacionesGrado } from "../components/ObservacionesGrado";
import { UsuariosGrado } from "../components/UsuariosGrado";
import { metricasPorCicloDetalle } from "../../../reducers/metricasSlice";
import { listarAlumnosPorCSG } from "../../../reducers/alumnosSlice";
import { confirmationAlert, showAlert } from "../../../utils/alert";
import { eliminarRegistro } from "../../../reducers/registrosSlice";
import { AlumnosInscriptos } from "../components/AlumnosInscriptos";
import { ArchiveBoxArrowDownIcon, ArrowDownIcon, ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { fi } from "zod/v4/locales";

export const GradoCicloDetalle = () => {
  const { cicloGradoActual } = useSelector((state) => state.grados);
  const { metricasCicloDetalle } = useSelector((state) => state.metricas);
  const { alumnosCSG } = useSelector((state) => state.alumnos);
  const dispatch = useDispatch();
  const { cicloId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(detalleCiclo(cicloId));
    dispatch(metricasPorCicloDetalle(cicloId));
    dispatch(listarAlumnosPorCSG(cicloId))
  }, [cicloId]);
  
  const desvincularAlumno = async (registroId, alumnoId) => {
    // console.log("registro: ", registroId, "alumno: ", alumnoId)
    await confirmationAlert({
      title: '¿Estás seguro?',
      text: 'Se desvinculará al alumno del grado y se eliminarán todas sus observaciones.',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
      icon: 'warning'
    }).then((res) => {
          if (res.isConfirmed) {
          try {
            const desvincular = dispatch(eliminarRegistro({registroId, alumnoId}));
            if (eliminarRegistro.fulfilled.match(desvincular)) {
              showAlert({
                title: "Alumno desvinculado",
                text: "El alumno se desvinculó correctamente.",
                icon: "success",
              });
            } else if (eliminarRegistro.rejected.match(desvincular)) {
              throw new Error(
                "El alumno no pudo ser desvinculado. Intentalo de nuevo."
              );
            }
          } catch (error) {
            showAlert({
              title: "Error al desvincular",
              text: error.message,
              icon: "error",
            });
          }
          }
        });
  }

  const handleFinalizarCiclo = async (cicloId) => {
    await confirmationAlert({
      title: '¿Estás seguro?',
      text: 'Se finalizará el ciclo. Esta acción no se puede deshacer.',
      confirmButtonText: 'Finalizar',
      cancelButtonText: 'Cancelar',
      icon: 'warning'
    }).then(async (res) => {
      if (res.isConfirmed) {
        try {
          await dispatch(finalizarCiclo(cicloId)).unwrap();
          showAlert({
            title: "Ciclo finalizado",
            text: "El ciclo se finalizó correctamente.",
            icon: "success",
          });
        } catch (error) {
          showAlert({
            title: "Error al finalizar",
            text: `No se pudo finalizar el ciclo. Intentalo de nuevo. ${error.message}`,
            icon: "error",
          });
        }
      }
    });
  }

  return (
    <>
      <section className="container mx-auto px-4 pt-9 pb-12">
        <div className="flex gap-3 items-center md:items-end md:flex-row flex-col mb-4 justify-between">
          <div>
            <BotonIcono
              Icono={ArrowLeftIcon}
              texto={"Volver"}
              onClick={() => navigate(-1)}
              className="hover:bg-indigo-700 hover:text-white text-black"
              />
            <div>
              <h1 className="text-3xl font-semibold">
                {cicloGradoActual.grado}° Grado | Sección{" "}
              </h1>
              <p className="text-gray-700">Ciclo {cicloGradoActual.ciclo}</p>
            </div>
          </div>
          {cicloGradoActual.estado == "ACTIVO" ? (
            <BotonIcono onClick={() => handleFinalizarCiclo(cicloId)} className="bg-indigo-600 w-full justify-center md:w-fit hover:bg-red-700 transition text-white shadow-lg " Icono={ArchiveBoxArrowDownIcon} texto={"Finalizar Ciclo"} />
          ) : (
            <div className="bg-red-800/95 border border-red-700 shadow-xl rounded-2xl py-3 px-5 text-red-300 flex gap-2 items-center">
              <ExclamationTriangleIcon className="h-5 w-5" />
              <span className="italic font-semibold">Este ciclo ya está finalizado</span>
            </div>
          )}
        </div>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 mb-3">
          <CardMetrica
            texto={metricasCicloDetalle[0].nombre}
            Icono={UsersIcon}
            data={metricasCicloDetalle[0].valor}
          />
          <CardMetrica
            texto={metricasCicloDetalle[1].nombre}
            Icono={ExclamationTriangleIcon}
            data={metricasCicloDetalle[1].valor}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
          <AlumnosInscriptos alumnosCSG={alumnosCSG} />
          <ObservacionesGrado cicloId={cicloId} />
        </div>

        <UsuariosGrado cicloId={cicloId} />
      </section>
    </>
  );
};
