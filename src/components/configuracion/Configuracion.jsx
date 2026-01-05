import { FolderIcon, IdentificationIcon } from "@heroicons/react/24/outline";
import React, { useEffect } from "react";
import { BotonIcono } from "../../utils/components/BotonIcono";
import { jwtDecode } from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { modificarUsuario, obtenerUsuarioCompleto } from "../../reducers/usuariosSlice";
import { UsuarioInputs } from "../../features/usuarios/components/UsuarioInputs";
import { FormProvider, useForm } from "react-hook-form";
import { confirmationAlert, showAlert } from "../../utils/alert";

export const Configuracion = () => {
  const { usuario } = useSelector((state) => state.usuarios);
  const methods = useForm();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;
  const dispatch = useDispatch();

  let idUsuario = null;
  const token = localStorage.getItem("token");
  if (token) {
    const claims = token ? jwtDecode(token) : null;
    idUsuario = claims.userId;
  }

  useEffect(() => {
    dispatch(obtenerUsuarioCompleto(idUsuario));
  }, [idUsuario]);

  const onSubmit = async (data) => {
    const res = await confirmationAlert({
      title: "¿Estás seguro?",
      text: "¿Estás seguro de modificar tu información?",
      icon: "warning",
      confirmButtonText: "Editar",
      cancelButtonText: "Cancelar",
    });
    if (res.isConfirmed) {
      try {
        const resultAction = await dispatch(modificarUsuario({ id: data.id, usuario: data }));
        if (modificarUsuario.fulfilled.match(resultAction)) {
          showAlert({
            title: "Usuario modificado",
            text: "El usuario se modificó correctamente.",
            icon: "success",
          });
        } else if (modificarUsuario.rejected.match(resultAction)) {
          throw new Error("El usuario no pudo ser editado. Intentalo de nuevo.");
        }
      } catch (error) {
        showAlert({
          title: "Error al editar",
          text: error.message,
          icon: "error",
        });
      }
    }
  }

  return (
    <section className="container mx-auto px-4 pt-9">
      <div>
        <h1 className="text-4xl font-semibold">Configuración</h1>
        <p className="text-gray-800 ">Administra tu información personal.</p>
      </div>
      <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
        <div className="flex gap-2 items-center mb-4">
          <IdentificationIcon className="h-6 w-6" />
          <h2 className="text-2xl font-semibold">Información Personal</h2>
        </div>

        <FormProvider {...methods}>
          <form
            className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3"
            onSubmit={handleSubmit(onSubmit)}
          >
            <UsuarioInputs usuariosForm={false} />
            <BotonIcono
              texto={"Guardar Cambios"}
              Icono={FolderIcon}
              className="bg-indigo-600 text-white hover:bg-indigo-700 transition shadow-md col-span-2 w-full justify-center md:col-span-1 md:w-fit"
            />
          </form>
        </FormProvider>
      </div>
    </section>
  );
};
