import {
  InformationCircleIcon,
  PlusIcon,
  TrashIcon,
} from "@heroicons/react/16/solid";
import React, { useEffect } from "react";
import { BotonIcono } from "../../../utils/components/BotonIcono";
import { useDispatch, useSelector } from "react-redux";
import {
  listarMaestros,
} from "../../../reducers/maestrosSlice";
import { abrirModal } from "../../../reducers/uiSlice";
import { desvincularMaestro } from "../../../reducers/gradosSlice";
import { confirmationAlert, showAlert } from "../../../utils/alert";

export const UsuariosGrado = ({ cicloId }) => {
  const dispatch = useDispatch();
  const { maestrosAsignados, maestrosDisponibles } = useSelector(
    (state) => state.maestros
  );

  useEffect(() => {
    dispatch(listarMaestros(cicloId));
  }, [cicloId]);

  const handleDesvincularMaestro = async (idCiclo, idMaestro) => {
    confirmationAlert({
      title: "¿Quieres eliminar a este maestro?",
      icon: "warning",
      confirmButtonText: "Confirmar",
      cancelButtonText: "Cancelar",
    }).then((res) => {
      if (res.isDenied) {
        return;
      }
    });

    try {
      const desvincular = dispatch(desvincularMaestro({ idCiclo, idMaestro }));
      if (desvincularMaestro.fulfilled.match(desvincular)) {
        showAlert({
          title: "Maestro desvinculado",
          text: "El maestro se desvinculó correctamente.",
          icon: "success",
        });
      } else if (desvincularMaestro.rejected.match(desvincular)) {
        throw new Error(
          "El maestro no pudo ser desvinculado. Intentalo de nuevo."
        );
      }
    } catch (error) {
      showAlert({
        title: "Error al desvincular",
        text: error.message,
        icon: "error",
      });
    }
  };

  return (
    <div className="rounded-lg px-4 py-3 bg-white shadow-lg">
      <div className="flex items-center gap-2 mb-3">
        <InformationCircleIcon className="h-5 w-5" />
        <h2 className="text-xl font-semibold">Maestros a cargo</h2>
      </div>

      {maestrosAsignados.length > 0 ? maestrosAsignados.map((m, idx) => (
        <div
          key={idx} 
          className="flex justify-between items-center border rounded-xl px-3 py-2 shadow-lg bg-gray-100 mb-2"
        >
          <div>
            <p className="font-semibold">{m.usuario}</p>
            <p className="text-sm text-gray-700">{m.correo}</p>
          </div>
          <BotonIcono
            Icono={TrashIcon}
            className="bg-indigo-600 hover:bg-red-600 text-white transition-colors"
            onClick={() => handleDesvincularMaestro(cicloId, m.id)
            }
          />
        </div>
      )) : <p className="text-sm italic text-gray-700 mb-2">No hay maestros asignados</p>  }
      
      <BotonIcono
        onClick={() =>
          dispatch(
            abrirModal({
              modalAbierto: true,
              tipo: "agregarMaestro",
              data: {cicloId},
            })
          )
        }
        texto={"Agregar maestro"}
        Icono={PlusIcon}
        className="bg-indigo-600 hover:bg-indigo-700 transition-colors text-white"
      />
    </div>
  );
};
