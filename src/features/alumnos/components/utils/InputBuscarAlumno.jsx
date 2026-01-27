
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import React from 'react';
import { useDispatch } from 'react-redux';
import { buscarAlumnos } from '../../../../reducers/alumnosSlice';

export const InputBuscarAlumno = () => {
  const dispatch = useDispatch();

  const handleChange = (e) => {
    dispatch(buscarAlumnos(e.target.value));
  };

  return (
    <div className="flex items-center border border-gray-400 rounded-lg px-3 py-2 bg-white">
      <MagnifyingGlassIcon className="w-5 h-5 text-gray-500 mr-2" />
      <input
        onChange={handleChange}
        type="text"
        placeholder="Buscar por nombre"
        className="w-full outline-none text-gray-700 placeholder-gray-400"
      />
    </div>
  );
}
