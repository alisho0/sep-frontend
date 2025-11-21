import {
  ChevronDoubleRightIcon,
  ChevronRightIcon,
  PlusIcon,
} from "@heroicons/react/16/solid";
import React, { useEffect } from "react";
import { BotonIcono } from "../../../utils/components/BotonIcono";
import { TrashIcon } from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { listarGrados } from "../../../reducers/gradosSlice";
import { Link } from "react-router-dom";
import { abrirModal } from "../../../reducers/uiSlice";

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
            <Link to={`/grados/${g.id}`} className="border hover:border-gray-600 bg-white p-6 rounded-lg shadow-md border-gray-300 transition">
              <div
                key={idx}
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
