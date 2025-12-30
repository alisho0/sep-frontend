import React, { useEffect } from "react";
import { UsuarioInputs } from "../components/UsuarioInputs";
import { FormProvider, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

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
        //   onSubmit={handleSubmit(onSubmit)}
        >
          <UsuarioInputs />
        </form>
      </FormProvider>
    </>
  );
};
