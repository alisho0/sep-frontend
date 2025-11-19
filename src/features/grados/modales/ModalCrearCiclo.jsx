import React from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

export const ModalCrearCiclo = () => {
  const { modalData } = useSelector((state) => state.ui);
  const { register, handleSubmit, formState: {errors} } = useForm()

  return (
    <>
      <div>
        <div className="mb-3">
          <h2 className="font-semibold text-xl">Crear nuevo ciclo</h2>
          <p className="text-sm text-gray-700">
            Agrega un nuevo ciclo para {modalData.grado}° grado
          </p>
        </div>

        <form>
          <div className="flex flex-col">
            <label className="text-sm font-semibold" htmlFor="año">
              Año del ciclo
            </label>
            <input
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              type="text"
              placeholder="Ej: 2026"
              id="año"
              {...register("anio", {required: true})}
            />
            { errors?.anio && (<span className="text-xs text-red-700">Este campo es obligatorio</span>) }
          </div>
          <div className="text-white font-semibold flex gap-2 justify-end mt-4">
            <button
              className="bg-red-700 py-2 px-4 gap-1 rounded-lg hover:bg-red-800 transition-colors cursor-pointer"
              onClick={() => dispatch(cerrarModal())}
            >
              Cancelar
            </button>
            <button className="bg-indigo-600 py-2 px-4 gap-1 rounded-lg hover:bg-indigo-700 transition-colors cursor-pointer" >
              Agregar
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
