import React, { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { listarCiclosGradosDisponibles, listarGradosDisponibles, listarSeccionesDisponibles } from "../../../reducers/gradosSlice";

export const InfoGradoInputs = () => {
    const dispatch = useDispatch();
    const { register, formState: {errors}, watch, setValue } = useFormContext();
    const { ciclosGrado } = useSelector((state) => state.grados);

    const gradoSeleccionado = watch("nroGrado")
    const seccionSeleccionada = watch("seccionGrado")
    const turnoSeleccionado = watch("turnoGrado");

    const gradosDisponibles = [ ...new Set(ciclosGrado.map(c => c.grado))];
    const seccionesDisponibles = [...new Set(
      ciclosGrado.filter(c => c.grado == gradoSeleccionado).map(c => c.seccion)
    )];
    const turnoDisponibles = [...new Set(ciclosGrado.filter(c => c.grado == gradoSeleccionado && c.seccion == seccionSeleccionada).map(c => c.turno))]
    const cicloDisponible = [...new Set(
      ciclosGrado.filter(c => c.grado == gradoSeleccionado && c.seccion == seccionSeleccionada && c.turno == turnoSeleccionado).map(c => c.anio)
    )]

    useEffect(() => {
      dispatch(listarCiclosGradosDisponibles());
    }, [])
    useEffect(() => {
    setValue("seccionGrado", "");
    setValue("turnoGrado", "");
    setValue("anioCicloGrado", "");
  }, [gradoSeleccionado]);

  useEffect(() => {
    setValue("turnoGrado", "");
    setValue("anioCicloGrado", "");
  }, [seccionSeleccionada]);

  useEffect(() => {
    setValue("anioCicloGrado", "");
  }, [turnoSeleccionado]);
  return (
    <section className="col-span-2">
      <h3 className="font-semibold text-sm mb-3">Información del Grado</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
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
            className={`w-full outline-none text-gray-700 bg-white border border-gray-300 rounded-lg px-2 py-2 focus:ring-2 focus:ring-indigo-500`} {...register('nroGrado', {required: true, valueAsNumber: true})} defaultValue="" 
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
            className={`w-full outline-none text-gray-700 bg-white border border-gray-300 rounded-lg px-2 py-2 focus:ring-2 focus:ring-indigo-500 ${!gradoSeleccionado ? "cursor-not-allowed bg-gray-600" : "" }`} {...register('seccionGrado', {required: true})} defaultValue="" disabled={!gradoSeleccionado}
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
            className={`w-full outline-none text-gray-700 bg-white border border-gray-300 rounded-lg px-2 py-2 focus:ring-2 focus:ring-indigo-500 ${!seccionSeleccionada ? "cursor-not-allowed bg-gray-600" : "" }`} {...register('turnoGrado', {required: true})} defaultValue="" disabled={!seccionSeleccionada}
          >
            <option value="" disabled>Selecciona un turno</option>
            {turnoDisponibles.map((t, idx) => (
              <option key={idx} value={t}>{t}</option>
            ))}
          </select>
          {errors?.turnoGrado && <span className="text-xs text-red-700">Este campo es obligatorio</span>}
        </div>
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
            className={`w-full outline-none text-gray-700 bg-white border border-gray-300 rounded-lg px-2 py-2 focus:ring-2 focus:ring-indigo-500 ${!turnoSeleccionado ? "cursor-not-allowed bg-gray-600" : "" }`} {...register('anioCicloGrado', {required: true, valueAsNumber: true})} defaultValue="" disabled={!turnoSeleccionado}
          >
            <option value="" disabled>Selecciona un año</option>
            {cicloDisponible.map((c, idx) => (
              <option key={idx} value={c}>{c}</option>
            ))}
          </select>
          {errors?.anioCicloGrado && <span className="text-xs text-red-700">Este campo es obligatorio</span>}
        </div>
      </div>
    </section>
  );
};
