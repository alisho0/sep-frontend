import React from "react";
import { InfoGradoInputs } from "./InfoGradoInputs";
import { FormProvider, useForm } from "react-hook-form";
import { BotonIcono } from "../../../../utils/components/BotonIcono";
import { cerrarModal } from "../../../../reducers/uiSlice";
import { useDispatch } from "react-redux";

export const ModalCrearRegistro = () => {
    const dispatch = useDispatch();
  const methods = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <>
      <div>
        <h2 className="font-semibold text-xl">Crear Nuevo Registro</h2>
        <p className="text-sm text-gray-800">
          Registra al alumno en un nuevo ciclo lectivo.
        </p>
      </div>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="flex flex-col"
        >
          <InfoGradoInputs />
          <div className="flex justify-end mt-3 gap-2 text-white font-semibold">
            <button
              className="bg-red-700 py-2 px-4 gap-1 rounded-lg hover:bg-red-800 transition-colors cursor-pointer "
              onClick={() => dispatch(cerrarModal())}
              type="button"
            >
              Cancelar
            </button>
            <button className="bg-indigo-600 py-2 px-4 gap-1 rounded-lg hover:bg-indigo-700 transition-colors cursor-pointer">
                Crear Registro
            </button>
          </div>
        </form>
      </FormProvider>
    </>
  );
};
