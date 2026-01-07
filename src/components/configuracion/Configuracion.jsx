import { FolderIcon, IdentificationIcon, LockClosedIcon } from "@heroicons/react/24/outline";
import React, { useEffect } from "react";
import { BotonIcono } from "../../utils/components/BotonIcono";
import { jwtDecode } from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { modificarContraseña, modificarUsuario, obtenerUsuarioCompleto } from "../../reducers/usuariosSlice";
import { UsuarioInputs } from "../../features/usuarios/components/UsuarioInputs";
import { FormProvider, useForm } from "react-hook-form";
import { confirmationAlert, showAlert } from "../../utils/alert";
import { zodResolver } from "@hookform/resolvers/zod";
import { passwordSchema } from "../../validation/passwordSchema";
import { useNavigate } from "react-router-dom";
import { editarUsuarioSchema } from "../../validation/editarUsuarioSchema";


export const Configuracion = () => {
  const { usuario } = useSelector((state) => state.usuarios);
  const dispatch = useDispatch();
  const navigate = useNavigate()

  // Formulario de información personal
  const personalFormMethods = useForm({
    resolver: zodResolver(editarUsuarioSchema)
  });
  const {
    handleSubmit: handlePersonalSubmit,
    setValue,
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
    if (idUsuario) {
      dispatch(obtenerUsuarioCompleto(idUsuario));
    }
  }, [idUsuario]);

  const handleEditarUsuario = async (data) => {
    console.log("Datos a editar:", data);
    const res = await confirmationAlert({
      title: "¿Estás seguro?",
      text: "¿Estás seguro de modificar tu información? Si cambiaste tu nombre de usuario, deberás usar el nuevo para iniciar sesión la próxima vez.",
      icon: "warning",
      confirmButtonText: "Editar",
      cancelButtonText: "Cancelar",
    });
    if (res.isConfirmed) {
      try {
        const resultAction = await dispatch(modificarUsuario({ id: idUsuario, usuario: data }));
        if (modificarUsuario.fulfilled.match(resultAction)) {
          showAlert({
            title: "Usuario modificado",
            text: "El usuario se modificó correctamente. Si modificaste tu nombre de usuario, serás redirigido a iniciar sesión.",
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
    const res = await confirmationAlert({
      title: "¿Estás seguro de cambiar tu contraseña?",
      text: "Se cerrará tu sesión y deberás iniciar sesión nuevamente.",
      icon: "warning",
      confirmButtonText: "Editar",
      cancelButtonText: "Cancelar",
    });
    if (res.isConfirmed) {
      try {
        const resultAction = await dispatch(modificarContraseña({ id: idUsuario, contraseñas: data }));
        if (modificarContraseña.fulfilled.match(resultAction)) {
          showAlert({
            title: "Contraseña modificada",
            text: "La contraseña se modificó correctamente. Se cerrará tu sesión.",
            icon: "success",
          });
          localStorage.removeItem("token");
          navigate("/");
        } else if (modificarContraseña.rejected.match(resultAction)) {
          const backendMsg = resultAction?.error?.message || "La contraseña no pudo ser editada. Intentalo de nuevo.";
          showAlert({
            title: "Error al editar",
            text: backendMsg,
            icon: "error",
          });
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
            onSubmit={handlePersonalSubmit(handleEditarUsuario)}
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
              <input type="password" id="actual" {...registerPassword("contrasenia", { required: true })} className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              {passwordErrors?.contrasenia && (
                <span className="text-xs text-red-700">
                  {passwordErrors?.contrasenia?.message || "Este campo es obligatorio"}
                </span>
              )}
            </div>
            <div className="mb-2 pt-2">
              <label htmlFor="nuevaContrasenia" className="text-sm text-gray-800 font-semibold">
                Nueva contraseña
              </label>
              <input {...registerPassword("nuevaContrasenia", { required: true })} type="password" id="nuevaContrasenia" className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              {passwordErrors?.nuevaContrasenia && (
                <span className="text-xs text-red-700">
                  {passwordErrors?.nuevaContrasenia?.message || "Este campo es obligatorio"}
                </span>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="confirmarNuevaContraseña" className="text-sm text-gray-800 font-semibold">
                Confirmar nueva contraseña
              </label>
              <input {...registerPassword("confirmarContrasenia", { required: true })} type="password" id="confirmarNuevaContraseña" className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              {passwordErrors?.confirmarContrasenia && (
                <span className="text-xs text-red-700">
                  {passwordErrors?.confirmarContrasenia?.message || "Este campo es obligatorio"}
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
