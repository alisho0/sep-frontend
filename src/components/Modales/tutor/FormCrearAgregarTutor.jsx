import { PlusIcon } from "@heroicons/react/16/solid";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { crearTutorConAlumno } from "../../../reducers/tutoresSlice";
import { crearObservacion } from "../../../reducers/observacionesSlice";
import { showAlert } from "../../../utils/alert";
import { cerrarModal } from "../../../reducers/uiSlice";
import { FormCrearTutor } from "../../tutores/FormCrearTutor";

export const FormCrearAgregarTutor = () => {
  const token = localStorage.getItem("token")
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    try {
      const resultAction = await dispatch(crearTutorConAlumno({ token, tutor: data }));
      if (crearTutorConAlumno.fulfilled.match(resultAction)) {
        showAlert({
          title: "Éxito",
          text: "El tutor fue creado y agregado correctamente al alumno",
          icon: "success",
        });
        dispatch(cerrarModal());
      } else if (crearTutorConAlumno.rejected.match(resultAction)) {
        throw new Error(resultAction.error.message);
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
     <FormCrearTutor onSubmit={onSubmit}  />
    </>
  );
};
