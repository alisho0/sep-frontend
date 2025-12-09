import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listarMaestrosDisponibles } from "../../../reducers/maestrosSlice";
import { useForm } from "react-hook-form";
import { vincularMaestro } from "../../../reducers/gradosSlice";
import { showAlert } from "../../../utils/alert";

export const ModalAgregarMaestro = ({ modalData }) => {
  const dispatch = useDispatch();
  const { maestrosDisponibles } = useSelector((state) => state.maestros);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  useEffect(() => {
    dispatch(listarMaestrosDisponibles());
  }, [modalData]);

  const onSubmit = async (data) => {
    console.log(data.id_maestro, modalData.cicloId)
    
        try { // idCiclo, idMaestro
          const vincular = dispatch(vincularMaestro({ idCiclo: modalData.cicloId, idMaestro: data.id_maestro }));
          if (vincularMaestro.fulfilled.match(vincular)) {
            showAlert({
              title: "Maestro vinculado",
              text: "El maestro se vinculó correctamente.",
              icon: "success",
            });
          } else if (vincularMaestro.rejected.match(vincular)) {
            throw new Error(
              "El maestro no pudo ser vinculado. Intentalo de nuevo."
            );
          }
        } catch (error) {
          showAlert({
            title: "Error al vincular",
            text: error.message,
            icon: "error",
          });
        }
  };

  return (
    <>
      <h2 className="font-semibold text-xl">Asignar maestro</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="maestro" className="text-gray-800 text-sm">
          Selecciona un tutor
        </label>
        <div className="flex flex-col gap-2 mt-3">
          <select
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 "
            name="maestro"
            id="maestro"
            {...register("id_maestro", {
              required: "Debes seleccionar un maestro",
              valueAsNumber: true
            })}
            defaultValue=""
          >
            <option value="" disabled>
              Selecciona un maestro
            </option>
            {maestrosDisponibles.map((m, idx) => (
              <option key={idx} value={m.id}>
                {m.nombre} | {m.usuario}
              </option>
            ))}
          </select>
          {errors?.id_maestro && (
            <span className="text-xs text-red-700">
              {errors.id_maestro.message}
            </span>
          )}
          <button className="bg-indigo-600 py-2 px-4 gap-1 rounded-lg hover:bg-indigo-700 transition-colors cursor-pointer w-fit text-white font-semibold">
            Agregar
          </button>
        </div>
      </form>
    </>
  );
};
