import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { cerrarModal } from "../../../reducers/uiSlice";
import { showAlert } from "../../../utils/alert";
import {
  listarUsuarios,
  registrarUsuario,
} from "../../../reducers/usuariosSlice";
import { UsuarioInputs } from "../components/UsuarioInputs";

export const ModalCrearUsuario = () => {
  const methods = useForm();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    try {
      const registro = await dispatch(registrarUsuario(data));
      if (registrarUsuario.fulfilled.match(registro)) {
        showAlert({
          title: "Usuario creado",
          text: "El usuario fue creado y agregado correctamente",
          icon: "success",
        });
        await dispatch(listarUsuarios());
        dispatch(cerrarModal());
      } else if (registrarUsuario.rejected.match(registro)) {
        throw new Error(registrarUsuario.error.message);
      }
    } catch (error) {
      showAlert({
        title: "Creación fallida",
        text:
          error.message ||
          "El usuario no pudo ser creado. Intentalo nuevamente.",
        icon: "error",
      });
    }
  };

  return (
    <>
      <div className="mb-4">
        <h2 className="font-semibold text-xl">Crear nuevo usuario</h2>
        <p className="text-sm text-gray-800 italic">
          Completa los datos del usuario para agregarlo al sistema.
        </p>
      </div>
      <FormProvider {...methods}>
        <form
          className="grid grid-cols-1 md:grid-cols-2 gap-3"
          onSubmit={handleSubmit(onSubmit)}
        >
          <UsuarioInputs/> 
        </form>
      </FormProvider>
    </>
  );
};
