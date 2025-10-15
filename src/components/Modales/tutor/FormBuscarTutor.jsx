import React, { useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asignarTutor } from "../../../reducers/alumnosSlice";
import { showAlert } from "../../../utils/alert";
import { cerrarModal } from "../../../reducers/uiSlice";
import { CardSelectTutor } from "../../tutores/CardSelectTutor";

export const FormBuscarTutor = ({ tutores }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const token = localStorage.getItem("token");
  const { alumno } = useSelector((state) => state.alumnos);
  const {tutoresAlumno} = useSelector((state) => state.tutores)
  const dispatch = useDispatch();

  const filteredTutores = useMemo(() => {
    return tutores.filter((tutor) => {
      const searchTermLower = searchTerm.toLowerCase();
      return (
        tutor.nombre.toLowerCase().includes(searchTermLower) ||
        tutor.apellido.toLowerCase().includes(searchTermLower) ||
        tutor.dni.toLowerCase().includes(searchTermLower)
      );
    })
    .filter((tutor) => {
      return !tutoresAlumno.some(t => t.id === tutor.id);
    });
  }, [tutores, searchTerm]);

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
        asignarTutor({ token, idTutor, idAlumno: alumno.id })
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
      <div className="flex flex-col">
        <h3 className="text-sm font-semibold">
          Buscar por nombre, apellido o DNI
        </h3>
        <input
          type="text"
          className="border border-gray-300 rounded-md p-2"
          placeholder="Escribe para buscar..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="h-96 overflow-y-scroll">
        {filteredTutores.length > 0 ? (
          filteredTutores.map((tutor, idx) => (
            <CardSelectTutor tutor={tutor} key={idx} onAgregarTutor={onAgregarTutor} />
          ))
        ) : (
          <div className="text-center mt-6 text-gray-500">
            No se encontraron tutores que coincidan con la búsqueda
          </div>
        )}
      </div>
    </>
  );
};
