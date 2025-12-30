import React, { useEffect } from "react";
import { CardMetrica } from "../../../utils/components/CardMetrica";
import {
  PencilSquareIcon,
  TrashIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import { BotonIcono } from "../../../utils/components/BotonIcono";
import { useDispatch, useSelector } from "react-redux";
import { eliminarUsuario, listarUsuarios, obtenerUsuarioCompleto } from "../../../reducers/usuariosSlice";
import { abrirModal } from "../../../reducers/uiSlice";
import { confirmationAlert, showAlert } from "../../../utils/alert";

export const Usuarios = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listarUsuarios());
  }, []);

  const { usuarios } = useSelector((state) => state.usuarios);
  const cant_directores = usuarios.filter(u => u.rol != "Admin" && u.rol != "Maestro").length
  const cant_maestros = usuarios.filter(u => u.rol != "Admin" && u.rol != "Director").length

  const metricas = [
    { id: 1, text: "Total de Usuarios", data: usuarios.length, icono: UsersIcon },
    { id: 2, text: "Directores", data: cant_directores, icono: UsersIcon },
    { id: 3, text: "Maestros", data: cant_maestros, icono: UsersIcon },
  ];


    const handleDeleteUsuario = async (id) => {
      await confirmationAlert({
        title: "¿Estás seguro?",
        text: "¿Estás seguro de eliminar este usuario?",
        icon: "warning",
        confirmButtonText: "Eliminar",
        cancelButtonText: "Cancelar",
      }).then((res) => {
        if (res.isConfirmed) {
          try {
            const eliminar = dispatch(eliminarUsuario(id));
            if (eliminarUsuario.fulfilled.match(eliminar)) {
              showAlert({
                title: "Usuario eliminado",
                text: "El usuario se eliminó correctamente.",
                icon: "success",
              });
            } else if (eliminarUsuario.rejected.match(eliminar)) {
              throw new Error(
                "El usuario no pudo ser eliminado. Intentalo de nuevo."
              );
            }
          } catch (error) {
            showAlert({
              title: "Error al eliminar",
              text: error.message,
              icon: "error",
            });
          }
        }
      });
    };

    const handleEditarUsuario = async (id) => {
      try {
        const usuarioCompleto = await dispatch(obtenerUsuarioCompleto(id))
        console.log(usuarioCompleto.payload)
        if (obtenerUsuarioCompleto.fulfilled.match(usuarioCompleto)) {
          dispatch(abrirModal({ modalAbierto: true, tipo: "editarUsuario", data: usuarioCompleto.payload }))
        } else {
          throw new Error("Error al traer el usuario.")
        }
      } catch (error) {
            showAlert({
              title: "Error",
              text:
                error.message ||
                "No se pudo traer los datos del usuario. Intentalo nuevamente.",
              icon: "error",
            });
      }
    }

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
            <BotonIcono texto={"Nuevo Usuario"} onClick={() => dispatch(abrirModal({ modalAbierto: true, tipo: "crearUsuario", data: null }))} className="bg-indigo-600 text-white hover:bg-indigo-700 transition-colors justify-center" />
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
                  onClick={() => handleEditarUsuario(u.id)}
                />
                <BotonIcono
                  texto={"Eliminar"}
                  Icono={TrashIcon}
                  className="bg-indigo-600 justify-center hover:bg-red-700 text-white"
                  onClick={() => handleDeleteUsuario(u.id)}
                />
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};
