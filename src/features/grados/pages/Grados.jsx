import React, { useEffect } from "react";
import { BotonIcono } from "../../../utils/components/BotonIcono";
import { useDispatch, useSelector } from "react-redux";
import { listarGrados } from "../../../reducers/gradosSlice";
import { Link } from "react-router-dom";

export const Grados = () => {
  const { grados } = useSelector((state) => state.grados);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listarGrados());
  }, []);

  return (
    <>
      <section className="container mx-auto md:px-28 px-4 pt-9">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-3xl font-semibold">Grados</h1>
            <p>Gestiona los grados, ciclos y secciones.</p>
          </div>
          <BotonIcono texto={"Nuevo Grado"} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {grados.map((g, idx) => (
            <Link key={idx} to={`/grados/${g.id}`} className="border hover:border-gray-600 bg-white p-6 rounded-lg shadow-md hover:shadow-lg border-gray-300 transition">
              <div
              >
                <div className="flex justify-between gap-10 flex-col h-full">
                  <h3 className="font-semibold text-2xl">{g.grado}° Grado</h3>

                  <div className="flex flex-col gap-4">
                    <div className="border-b border-gray-700 pb-4">
                      <p className="text-sm text-gray-700">Secciones</p>
                      <div className="flex gap-2">
                        {g.secciones.map((s, idx) => (
                          <span className="border border-gray-600 shadow-md rounded-lg px-2 py-0.5 text-sm h-fit" key={idx}>
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="text-gray-700 text-sm">
                        Alumnos inscriptos
                      </p>
                      <span className="font-semibold text-xl ">{g.cantAlumnos}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
};
/* 

*/
