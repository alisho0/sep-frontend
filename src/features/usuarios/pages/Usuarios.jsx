import React, { useEffect } from "react";
import { CardMetrica } from "../../../utils/components/CardMetrica";
import {
  PencilSquareIcon,
  TrashIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import { BotonIcono } from "../../../utils/components/BotonIcono";
import { useDispatch, useSelector } from "react-redux";
import { listarUsuarios } from "../../../reducers/usuariosSlice";

export const Usuarios = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listarUsuarios());
  }, []);

  const { usuarios } = useSelector((state) => state.usuarios);

  const metricas = [
    { id: 1, text: "Total de Usuarios", data: 4, icono: UsersIcon },
    { id: 2, text: "Directores", data: 4, icono: UsersIcon },
    { id: 3, text: "Maestros", data: 4, icono: UsersIcon },
  ];

  return (
    <>
      <section className="container mx-auto px-10 md:px-28 pt-9">
        <div className="mb-4">
          <h2 className="text-4xl font-semibold">Gestión de Usuarios</h2>
          <p className="text-gray-800 italic ">
            Administra los usuarios del sistema.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-2 md:grid-cols-3 mb-3">
          {metricas.map((m) => (
            <CardMetrica
              key={m.id}
              Icono={m.icono}
              data={m.data}
              texto={m.text}
            />
          ))}
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border-gray-300">
          <div className="mb-3 flex flex-col md:flex-row md:justify-between gap-2 md:gap-0">
            <div>
              <h2 className="font-semibold">Usuarios del Sistema</h2>
              <p className="text-sm italic text-gray-800">{usuarios.length} usuarios encontrados</p>
            </div>
            <BotonIcono texto={"Nuevo Usuario"} className="bg-indigo-600 text-white hover:bg-indigo-700 transition-colors justify-center" />
          </div>
          {usuarios.map((u) => (
            <div key={u.id} className="border border-gray-400 p-4 rounded-lg bg-gray-100 md:flex-row md:justify-between md:items-center hover:bg-gray-300 transition-colors mb-3 flex flex-col gap-3">
              <div className="flex flex-col gap-2">
                <div className="flex gap-3 items-center">
                  <p className="font-semibold">{u.nombreCompleto}</p>
                  <span className="text-sm italic font-semibold bg-indigo-600 text-white px-2 py-0.5 rounded-lg">
                    {u.rol}
                  </span>
                </div>
                <span className="text-sm text-gray-800">{u.username}</span>
              </div>
              <div className="flex flex-col gap-2 justify-center md:flex-row">
                <BotonIcono
                  texto={"Editar"}
                  Icono={PencilSquareIcon}
                  className="bg-indigo-600 justify-center hover:bg-indigo-700 text-white"
                />
                <BotonIcono
                  texto={"Eliminar"}
                  Icono={TrashIcon}
                  className="bg-indigo-600 justify-center hover:bg-red-700 text-white"
                />
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};
