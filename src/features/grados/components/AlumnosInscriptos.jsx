import { PlusIcon, UsersIcon } from "@heroicons/react/16/solid";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { abrirModal } from "../../../reducers/uiSlice";
import { EyeIcon, UserMinusIcon } from "@heroicons/react/24/outline";
import { BotonIcono } from "../../../utils/components/BotonIcono";
import { Link, useParams } from "react-router-dom";
import { desvincularAlumno } from "../../../reducers/alumnosSlice";
import { confirmationAlert, showAlert } from "../../../utils/alert";

export const AlumnosInscriptos = ({alumnosCSG}) => {

    const { cicloGradoActual } = useSelector((state) => state.grados);
    const { cicloId } = useParams();
    const cicloIdParse = parseInt(cicloId);
    const dispatch = useDispatch();

    const handleDesvincularAlumno = async (idAlumno) => {
      await confirmationAlert({
        title: '¿Estás seguro?',
        text: 'Se desvinculará al alumno del grado y se eliminarán todas sus observaciones.',
        confirmButtonText: 'Desvincular',
        cancelButtonText: 'Cancelar',
      }).then( async (res) => {
        if (res.isConfirmed) {
          try {
            const desvincular = await dispatch(desvincularAlumno({idCiclo: cicloIdParse, idAlumno: idAlumno})).unwrap();
            showAlert({
              title: "Alumno desvinculado",
              text: "El alumno fue desvinculado del grado correctamente.",
              icon: "success",
            })
          } catch (error) {
            showAlert({
              title: "Error al desvincular",
              text: error.message || "El alumno no pudo ser desvinculado. Intentalo de nuevo.",
              icon: "error",
            })
          }
        }
      })
    }

  return (
    <div className="rounded-lg shadow-lg px-4 py-3 bg-white">
      <div className="flex flex-col gap-2 mb-4 md:justify-between md:flex-row md:gap-0">
        <div className="flex gap-2 items-center font-semibold text-xl">
          <UsersIcon className="h-5 w-5" />
          <p>Alumnos Inscriptos</p>
        </div>
        { cicloGradoActual.estado == "ACTIVO" && (
        <BotonIcono
          texto={"Agregar Alumno"}
          Icono={PlusIcon}
          className="bg-indigo-600 hover:bg-indigo-700 text-white justify-center"
          onClick={() =>
            dispatch(
              abrirModal({
                modalAbierto: true,
                tipo: "agregarAlumno",
                data: { cicloId: cicloIdParse  },
              })
            )
          }
        />
        )}
      </div>
      <div>
        {alumnosCSG.length > 0 ? (
          alumnosCSG.map((a, idx) => (
            <div
              className="border rounded-lg bg-gray-100 p-3 mb-4 flex md:justify-between md:items-center md:flex-row flex-col shadow-md"
              key={idx}
            >
              <div>
                <h4 className="font-semibold text-lg">{a.nombre}</h4>
                <p className="text-gray-700">{a.dni}</p>
              </div>
              <div className="flex md:flex-row flex-col md:mt-0 mt-2 gap-2">
                <Link
                  className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 transition-colors text-white font-semibold rounded-lg cursor-pointer"
                  to={`/alumnos/${a.id}`}
                >
                  <BotonIcono
                    Icono={EyeIcon}
                    className="w-full justify-center"
                  />
                </Link>
                {cicloGradoActual.estado == "ACTIVO" && (
                <BotonIcono
                  onClick={() => handleDesvincularAlumno(a.id)}
                  Icono={UserMinusIcon}
                  className="bg-indigo-600 text-white hover:bg-red-700 justify-center"
                />
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="text-sm italic text-gray-700">
            No hay alumnos inscriptos
          </p>
        )}
      </div>
    </div>
  );
};
