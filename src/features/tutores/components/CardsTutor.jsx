import React, { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux';
import { CardSelectTutor } from './CardSelectTutor';
import { useFormContext } from 'react-hook-form';

export const CardsTutor = ({onAgregarTutor}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const { alumno } = useSelector((state) => state.alumnos);
  const {tutoresAlumno, tutores} = useSelector((state) => state.tutores)

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
  )
}
