import React, { useEffect } from "react";
import { InfoGradoInputs } from "./InfoGradoInputs";
import { FormProvider, useForm } from "react-hook-form";
import { BotonIcono } from "../../../../utils/components/BotonIcono";
import { cerrarModal } from "../../../../reducers/uiSlice";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { aniosRegistros, crearRegistro, detalleRegistro } from "../../../../reducers/registrosSlice";
import { confirmationAlert, showAlert } from "../../../../utils/alert";

export const ModalCrearRegistro = () => {
    const { aniosDisponibles, registro } = useSelector(
      (state) => state.registros
    );
    const { alumno } = useSelector(
      (state) => state.alumnos
    );
    const dispatch = useDispatch();
    // const { id } = useParams();

  const methods = useForm({
    defaultValues: {
      idAlumno: Number(alumno.id)
    }
  });

  const { register } = methods;

  const onSubmit = async (data) => {
    console.log(data);
      try {
        const nuevoRegistro = await dispatch(crearRegistro({registroData: data}));
        if (crearRegistro.fulfilled.match(nuevoRegistro)) {
          showAlert({
            title: "Registro creado",
            text: "El registro fue creado y agregado correctamente",
            icon: "success",
          });
          await dispatch(aniosRegistros({ id }));
          dispatch(cerrarModal());
        } else if (crearRegistro.rejected.match(nuevoRegistro)) {
          throw new Error(crearRegistro.error.message);
        }
      } catch (error) {
        showAlert({
          title: "Creación fallida",
          text:
            error.message ||
            "El registro no pudo ser creado. Intentalo nuevamente.",
          icon: "error",
        });
      }
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
          <input type="hidden" {...register("idAlumno", { valueAsNumber: true })} />
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
