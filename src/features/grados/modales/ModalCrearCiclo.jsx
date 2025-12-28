import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { cerrarModal } from "../../../reducers/uiSlice";
import { crearCiclo, detalleGrado, listarGrados } from "../../../reducers/gradosSlice";
import { showAlert } from "../../../utils/alert";
import { useParams } from "react-router-dom";

export const ModalCrearCiclo = () => {
  const { modalData } = useSelector((state) => state.ui);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const nuevoCiclo = await dispatch(crearCiclo(data));
      if (crearCiclo.fulfilled.match(nuevoCiclo)) {
        showAlert({
          title: "Ciclo creado",
          text: "El ciclo creado y agregado correctamente",
          icon: "success",
        });
        await dispatch(detalleGrado(modalData.idActual));
        dispatch(cerrarModal());
      } else if (crearCiclo.rejected.match(nuevoCiclo)) {
        throw new Error(nuevoCiclo.error.message);
      }
    } catch (error) {
      showAlert({
        title: "Creación fallida",
        text:
          error.message ||
          "El ciclo no pudo ser creado. Intentalo nuevamente.",
        icon: "error",
      });
    }
  };

  return (
    <>
      <div>
        <div className="mb-3">
          <h2 className="font-semibold text-xl">Crear nuevo ciclo</h2>
          <p className="text-sm text-gray-700 italic">
            Agrega un nuevo ciclo para {modalData.grado}° grado
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col">
            <label className="text-sm font-semibold" htmlFor="año">
              Año del ciclo
            </label>
            <input
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              type="number"
              placeholder="Ej: 2026"
              id="año"
              {...register("anio", { required: true, valueAsNumber: true })}
            />
            {errors?.anio && (
              <span className="text-xs text-red-700">
                Este campo es obligatorio
              </span>
            )}
            <input
              type="text"
              value={modalData.id}
              disabled
              hidden
              {...register("id_grado_seccion_grado", { valueAsNumber: true })}
            />
          </div>
          <div className="text-white font-semibold flex flex-col md:flex-row gap-2 md:justify-end mt-4 ">
            <button
              className="bg-red-700 py-2 px-4 gap-1 rounded-lg hover:bg-red-800 transition-colors cursor-pointer"
              onClick={() => dispatch(cerrarModal())}
              type="button"
            >
              Cancelar
            </button>
            <button className="bg-indigo-600 py-2 px-4 gap-1 rounded-lg hover:bg-indigo-700 transition-colors cursor-pointer">
              Agregar
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
