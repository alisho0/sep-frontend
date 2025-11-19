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
        {grados.map((g, idx) => (
          <div
            className="bg-white p-6 rounded-lg shadow-md border-gray-300 mb-3"
            key={idx}
          >
            <div className="flex justify-between mb-5">
              <h3 className="font-semibold text-xl">{g.grado} Grado</h3>
              <div className="flex gap-2">
                <BotonIcono texto={"Nuevo Ciclo"} onClick={() => dispatch(abrirModal( { tipo: "crearCiclo", data: { id: g.id, grado: g.grado }}))} />
                <BotonIcono
                  Icono={TrashIcon}
                  className="hover:bg-red-700 justify-center"
                />
              </div>
            </div>
            {/* Aqui van los ciclos */}
            {g.ciclos.length > 0 ? (
              <div>
              <p className="font-semibold mb-1.5 text-gray-700">
                Ciclos disponibles:
              </p>
              <div className="md:flex gap-2">
              {g.ciclos.map((c, idx) => (
                  <Link to={`/grados/${c.id}`} className="block w-full" key={idx}>
                    <div className="border border-gray-500 rounded-lg bg-gray-200 p-3 hover:bg-gray-300 transition-colors mb-2 ">
                      <div className="flex justify-between mb-2 gap-7">
                        <h4 className="font-semibold text-lg">Ciclo {c.anio}</h4>
                        <ChevronRightIcon className="h-6 w-6" />
                      </div>
                      <p className="text-gray-700">{c.cantAlumnos} alumnos</p>
                    </div>
                  </Link>
              ))}
              </div>
              </div>
            ) : (
              <p className="text-gray-500 italic">No hay ciclos disponibles.</p>
            )}
          </div>
        ))}
      </section>
    </>
  );
};
