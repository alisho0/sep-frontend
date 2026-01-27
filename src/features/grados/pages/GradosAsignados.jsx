import React, { useEffect } from "react";
import { listarCiclosGradosAsignados } from "../../../reducers/gradosSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AcademicCapIcon, MagnifyingGlassIcon, UsersIcon } from "@heroicons/react/24/outline";
import { BotonIcono } from "../../../utils/components/BotonIcono";

export const GradosAsignados = () => {
  const { ciclosGrado } = useSelector((state) => state.grados);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listarCiclosGradosAsignados());
  }, []);

  return (
    <section className="container mx-auto md:px-10 px-4 pt-9">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-3xl font-semibold">Grados</h1>
          <p>Gestiona los grados, ciclos y secciones.</p>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {Array.isArray(ciclosGrado) && ciclosGrado.length > 0 ? (
          ciclosGrado.map((ciclo, idx) => (
            <div
              key={idx}
              className="border hover:border-gray-600 bg-white p-6 rounded-lg shadow-md hover:shadow-lg border-gray-300 transition"
            >
              <div className="flex justify-between items-start">
                <div className="flex flex-col gap-1.5 text-xl">
                  <div className="flex gap-1.5 items-center">
                    <AcademicCapIcon className="w-6 h-6" />
                    <h3 className="font-semibold ">{ciclo.grado}° Grado</h3>
                  </div>
                  <p className="text-sm text-gray-700">
                    Sección: {ciclo.seccion} | Turno: {ciclo.turno}
                  </p>
                </div>
                <span className="px-2.5 py-1 bg-indigo-600 text-white rounded-lg text-sm font-semibold gap-1">
                  {ciclo.anio}
                </span>
              </div>

              <div className="mt-4 flex flex-col gap-3">
                <div className="flex justify-between items-center">
                  <div className="flex  items-center gap-1.5 text-gray-700">
                    <UsersIcon className="w-4 h-4" />
                    <p className="text-sm">Alumnos</p>
                  </div>
                  <span className="font-semibold">33</span>
                </div>
                <Link to={`/grados/${ciclo.gradoId}/ciclo/${ciclo.id}`}>
                  <BotonIcono
                    texto={"Ver Grado"}
                    Icono={MagnifyingGlassIcon}
                    className="border bg-indigo-600 w-full justify-center text-white hover:bg-indigo-700 transition"
                  />
                </Link>
              </div>
            </div>
          ))
        ) : (
          <span>No hay grados disponibles</span>
        )}
      </div>
    </section>
  );
};
