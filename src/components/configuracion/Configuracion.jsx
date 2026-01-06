import { FolderIcon, IdentificationIcon, LockClosedIcon } from "@heroicons/react/24/outline";
import React, { useEffect } from "react";
import { BotonIcono } from "../../utils/components/BotonIcono";
import { jwtDecode } from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { modificarUsuario, obtenerUsuarioCompleto } from "../../reducers/usuariosSlice";
import { UsuarioInputs } from "../../features/usuarios/components/UsuarioInputs";
import { FormProvider, useForm } from "react-hook-form";
import { confirmationAlert, showAlert } from "../../utils/alert";
import { zodResolver } from "@hookform/resolvers/zod";
import { passwordSchema } from "../../validation/passwordSchema";


export const Configuracion = () => {
  const { usuario } = useSelector((state) => state.usuarios);
  const dispatch = useDispatch();

  // Formulario de información personal
  const personalFormMethods = useForm();
  const {
    handleSubmit: handlePersonalSubmit,
  } = personalFormMethods;

  // Formulario de cambio de contraseña
  const passwordFormMethods = useForm({
    resolver: zodResolver(passwordSchema)
  });
  const {
    register: registerPassword,
    handleSubmit: handlePasswordSubmit,
    formState: { errors: passwordErrors },
  } = passwordFormMethods;

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
  };

  const handleChangePassword = async (data) => {
    console.log("Cambiar contraseña", data);
  };

  return (
    <section className="container mx-auto px-4 pt-9 pb-4">
      <div>
        <h1 className="text-4xl font-semibold">Configuración</h1>
        <p className="text-gray-800 ">Administra tu información personal.</p>
      </div>
      <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
        <div className="flex gap-2 items-center mb-4">
          <IdentificationIcon className="h-6 w-6" />
          <h2 className="text-2xl font-semibold">Información Personal</h2>
        </div>

        <FormProvider {...personalFormMethods}>
          <form
            className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3"
            onSubmit={handlePersonalSubmit(onSubmit)}
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

      <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
        <div className="flex gap-1 items-center">
          <LockClosedIcon className="w-6 h-6" />
          <h2 className="text-2xl font-semibold">Cambiar contraseña</h2>
        </div>
        <p className="text-gray-800 text-sm">Puedes actualizar tu contraseña aquí.</p>

        <FormProvider {...passwordFormMethods}>
          <form className="mt-3" onSubmit={handlePasswordSubmit(handleChangePassword)}>
            <div className="border-b border-gray-400 pb-4">
              <label htmlFor="actual" className="text-sm text-gray-800 font-semibold">
                Contraseña actual
              </label>
              <input type="password" id="actual" {...registerPassword("contraseña", { required: true })} className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              {passwordErrors?.contraseña && (
                <span className="text-xs text-red-700">
                  {passwordErrors?.contraseña?.message || "Este campo es obligatorio"}
                </span>
              )}
            </div>
            <div className="mb-2 pt-2">
              <label htmlFor="nuevaContraseña" className="text-sm text-gray-800 font-semibold">
                Nueva contraseña
              </label>
              <input {...registerPassword("nuevaContraseña", { required: true })} type="password" id="nuevaContraseña" className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              {passwordErrors?.nuevaContraseña && (
                <span className="text-xs text-red-700">
                  {passwordErrors?.nuevaContraseña?.message || "Este campo es obligatorio"}
                </span>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="confirmarNuevaContraseña" className="text-sm text-gray-800 font-semibold">
                Confirmar nueva contraseña
              </label>
              <input {...registerPassword("confirmarContraseña", { required: true })} type="password" id="confirmarNuevaContraseña" className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              {passwordErrors?.confirmarContraseña && (
                <span className="text-xs text-red-700">
                  {passwordErrors?.confirmarContraseña?.message || "Este campo es obligatorio"}
                </span>
              )}
            </div>
            <BotonIcono className="bg-indigo-600 text-white hover:bg-indigo-700 transition shadow-md col-span-2 w-full justify-center md:col-span-1 md:w-fit" texto={"Actualizar Contraseña"} Icono={LockClosedIcon} />
          </form>
        </FormProvider>
      </div>

    </section>
  );
};
