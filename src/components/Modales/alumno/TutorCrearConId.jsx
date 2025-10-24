import React from "react";
import { TutorInputs } from "../../tutores/TutorInputs";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { crearTutorVacio } from "../../../reducers/tutoresSlice";
import { showAlert } from "../../../utils/alert";
import { useDispatch } from "react-redux";

export const TutorCrearConId = ({ setTutoresSeleccionados }) => {
  const dispatch = useDispatch();
  const { setValue, getValues } = useFormContext();
  const methods = useForm();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = methods;

  const onSubmit = async (data) => {
    try {
      const result = await dispatch(crearTutorVacio({ tutor: data }));
      if (crearTutorVacio.fulfilled.match(result)) {
        const nuevoTutor = result.payload;
        const nuevoId = nuevoTutor.id;
        const idsActuales = getValues("tutoresIds") || [];

        // Evitar duplicados
        if (!idsActuales.includes(nuevoId)) {
          setValue("tutoresIds", [...idsActuales, nuevoId]);
        }
        setTutoresSeleccionados((prev) => {
          const yaExiste = prev.includes(nuevoId);
          return yaExiste ? prev : [...prev, nuevoId];
        });

        showAlert({
          title: "Éxito",
          text: "El tutor fue creado y agregado correctamente al alumno",
          icon: "success",
        });
      } else if (crearTutorVacio.rejected.match(result)) {
        throw new Error(result.error.message);
      }
    } catch (error) {
      showAlert({
        title: "Error",
        text: error.message || "Ocurrió un error al crear el tutor",
        icon: "error",
      });
    }
  };
  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TutorInputs />
        </form>
      </FormProvider>
    </>
  );
};
