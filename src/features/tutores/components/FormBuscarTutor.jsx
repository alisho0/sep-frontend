import React, { useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asignarTutor } from "../../../reducers/alumnosSlice";
import { showAlert } from "../../../utils/alert";
import { cerrarModal } from "../../../reducers/uiSlice";
import { CardSelectTutor } from "./CardSelectTutor";
import { CardsTutor } from "./CardsTutor";

export const FormBuscarTutor = ({ tutores }) => {
  const { alumno } = useSelector((state) => state.alumnos);
  const {tutoresAlumno } = useSelector((state) => state.tutores)
  const dispatch = useDispatch();

  const onAgregarTutor = async (e, idTutor) => {
    e.preventDefault();
    const existeTutor = tutoresAlumno.some(t => t.id === idTutor);
    if (existeTutor) {
      showAlert({
        title: 'Error',
        text: 'Este tutor ya está vinculado al alumno',
        icon: 'error',
      })
    }
    try {
      const asignar = await dispatch(
        asignarTutor({ idTutor, idAlumno: alumno.id })
      );

      if (asignarTutor.fulfilled.match(asignar)) {
        showAlert({
          title: "Éxito",
          text: "El tutor fue asignado correctamente al alumno",
          icon: "success",
        });
        dispatch(cerrarModal());
      }
    } catch (error) {
      showAlert({
        title: "Error",
        text: error.message || "Ocurrió un error al asignar el tutor",
        icon: "error",
      });
    }
  };

  return (
    <>
      <CardsTutor onAgregarTutor={onAgregarTutor} />
    </>
  );
};
