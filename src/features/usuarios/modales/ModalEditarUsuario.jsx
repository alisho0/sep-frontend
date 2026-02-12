import React, { useEffect } from "react";
import { UsuarioInputs } from "../components/UsuarioInputs";
import { FormProvider, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { listarUsuarios, modificarUsuario } from "../../../reducers/usuariosSlice";
import { showAlert, confirmationAlert } from "../../../utils/alert";
import { cerrarModal } from "../../../reducers/uiSlice";

export const ModalEditarUsuario = () => {

    const dispatch = useDispatch();
    const { modalData } = useSelector((state) => state.ui)
    // useEffect(() => {

    // }, [])

  const methods = useForm();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit = async (data) => {
    console.log("Datos a editar:", data);
    const res = await confirmationAlert({
      title: "¿Estás seguro?",
      text: "¿Estás seguro de modificar este usuario?",
      icon: "warning",
      confirmButtonText: "Editar",
      cancelButtonText: "Cancelar",
    });
    if (res.isConfirmed) {
      try {
        const editar = await dispatch(modificarUsuario({ id: modalData.id, usuario: data }));
        if (modificarUsuario.fulfilled.match(editar)) {
          showAlert({
            title: "Usuario editado",
            text: "El usuario fue editado correctamente",
            icon: "success",
          });
          await dispatch(listarUsuarios());
          dispatch(cerrarModal());
        } else if (modificarUsuario.rejected.match(editar)) {
          throw new Error(modificarUsuario.error.message);
        }
      } catch (error) {
        showAlert({
          title: "Error al editar",
          text: error.message || "El usuario no pudo ser editado. Intentalo nuevamente.",
          icon: "error",
        });
      }
    }
  } 

  return (
    <>
      <div className="mb-4">
        <h2 className="font-semibold text-xl">Editar usuario</h2>
        <p className="text-sm text-gray-800 italic">
          Completa los datos del usuario para editarlo.
        </p>
      </div>
      <FormProvider {...methods}>
        <form
          className="grid grid-cols-1 md:grid-cols-2 gap-3"
          onSubmit={handleSubmit(onSubmit)}
        >
          <UsuarioInputs />
        </form>
      </FormProvider>
    </>
  );
};
