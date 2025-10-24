import React, { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { listarGradosDisponibles, listarSeccionesDisponibles } from "../../../reducers/gradosSlice";

export const InfoGradoInputs = () => {
    const dispatch = useDispatch();
    const { register, formState: {errors} } = useFormContext();
    const { gradosDisponibles, seccionesDisponibles } = useSelector((state) => state.grados);

    useEffect(() => {
      dispatch(listarSeccionesDisponibles());
      dispatch(listarGradosDisponibles());
    }, [])
  return (
    <section className="col-span-2">
      <h3 className="font-semibold text-sm mb-3">Información del Grado</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="flex flex-col">
          <label
            htmlFor="año"
            className="text-sm font-medium text-gray-700 mb-1"
          >
            Año/Ciclo
          </label>
          <select
            name="año"
            id="año"
            className="w-full outline-none text-gray-700 bg-white border border-gray-300 rounded-lg px-2 py-2 focus:ring-2 focus:ring-indigo-500" {...register('anioCicloGrado', {required: true, valueAsNumber: true})} defaultValue=""
          >
            <option value="" disabled>Selecciona un año</option>
            <option value="2025">2025</option>
            <option value="2024">2024</option>
            <option value="2023">2023</option>
          </select>
          {errors?.anioCicloGrado && <span className="text-xs text-red-700">Este campo es obligatorio</span>}
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="grado"
            className="text-sm font-medium text-gray-700 mb-1"
          >
            Número de Grado
          </label>
          <select
            name="grado"
            id="grado"
            className="w-full outline-none text-gray-700 bg-white border border-gray-300 rounded-lg px-2 py-2 focus:ring-2 focus:ring-indigo-500" {...register('nroGrado', {required: true, valueAsNumber: true})} defaultValue=""
          >
            <option value="" disabled>Selecciona un grado</option>
            {gradosDisponibles.map((grado, idx) => (
              <option value={grado} key={idx}>{`${grado}°`}</option>
            ))}
          </select>
          {errors?.nroGrado && <span className="text-xs text-red-700">Este campo es obligatorio</span>}
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="seccion"
            className="text-sm font-medium text-gray-700 mb-1"
          >
            Sección
          </label>
          <select
            name="seccion"
            id="seccion"
            className="w-full outline-none text-gray-700 bg-white border border-gray-300 rounded-lg px-2 py-2 focus:ring-2 focus:ring-indigo-500" {...register('seccionGrado', {required: true})} defaultValue=""
          >
            <option value="" disabled>Selecciona una sección</option>
            {seccionesDisponibles.map((seccion, idx) => (
              <option value={seccion} key={idx}>{seccion}</option>
            ))}
          </select>
          {errors?.seccionGrado && <span className="text-xs text-red-700">Este campo es obligatorio</span>}
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="turno"
            className="text-sm font-medium text-gray-700 mb-1"
          >
            Turno
          </label>
          <select
            name="turno"
            id="turno"
            className="w-full outline-none text-gray-700 bg-white border border-gray-300 rounded-lg px-2 py-2 focus:ring-2 focus:ring-indigo-500" {...register('turnoGrado', {required: true})} defaultValue=""
          >
            <option value="" disabled>Selecciona un turno</option>
            <option value="mañana">Mañana</option>
            <option value="tarde">Tarde</option>
          </select>
          {errors?.turnoGrado && <span className="text-xs text-red-700">Este campo es obligatorio</span>}
        </div>
      </div>
    </section>
  );
};
