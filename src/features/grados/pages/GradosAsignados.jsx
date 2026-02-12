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
      <div className="bg-white p-6 rounded-lg shadow-lg border-gray-300">
        <div className="mb-6">
          <h2 className="text-xl font-semibold">Grados Asignados</h2>
          <p className="text-sm">
            Aquí puedes ver los grados que tienes asignados, junto con sus ciclos y secciones. Haz clic en "Ver Grado" para gestionar cada uno de ellos.
          </p>
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
                </div>

                <div className="mt-4 flex flex-col gap-3">
                  <div className="flex flex-col w-fit items-start md:flex-row gap-1">
                    <span className="px-2.5 py-1 bg-indigo-600 text-white rounded-lg text-xs font-semibold gap-1">
                      {ciclo.anio}
                    </span>
                    <span
                      className={`px-2.5 py-1 rounded-lg text-xs font-semibold gap-1 
                        ${ciclo.estado == "ACTIVO" ? "bg-green-600 text-green-100" : "bg-red-600 text-red-200"}`}
                    >
                      {ciclo.estado}
                    </span>
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
            <span className="text-sm mt-4 text-gray-800 italic">No hay grados disponibles</span>
          )}
        </div>
      </div>
    </section>
  );
};
