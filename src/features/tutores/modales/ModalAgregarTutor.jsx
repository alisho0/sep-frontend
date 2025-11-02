import React, { useState } from "react";
import { FormBuscarTutor } from "../components/FormBuscarTutor";
import { FormCrearAgregarTutor } from "../components/FormCrearAgregarTutor";
import { useSelector } from "react-redux";
import { FormProvider, useForm } from "react-hook-form";

export const ModalAgregarTutor = ({ tutores }) => {
  const methods = useForm();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = methods;
  const [vista, setVista] = useState("buscar");
  const selectVista = (e) => {};
  const { alumno } = useSelector((state) => state.alumnos);
  return (
    <>
      <FormProvider {...methods}>
        <div className="mb-4">
          <h3 className="text-lg font-semibold">Agregar Tutor</h3>
          <p className="text-sm text-gray-600">
            Busca un tutor existente o crea uno nuevo
          </p>
        </div>

        <div className="bg-indigo-600 px-2 py-1 rounded-lg flex justify-between mb-4">
          <button
            className={`px-2 py-1 rounded-lg text-white font-semibold hover:cursor-pointer hover:bg-indigo-700 transition-colors w-full ${
              vista == "buscar" ? "bg-indigo-800" : ""
            }`}
            onClick={() => setVista("buscar")}
          >
            Buscar Tutor
          </button>
          <button
            className={`px-2 py-1 rounded-lg text-white font-semibold hover:cursor-pointer hover:bg-indigo-700 transition-colors w-full ${
              vista == "crear" ? "bg-indigo-800" : ""
            }`}
            onClick={() => setVista("crear")}
          >
            Crear Nuevo
          </button>
        </div>
        {vista == "buscar" && <FormBuscarTutor tutores={tutores} />}
        {vista == "crear" && (
          <>
            <FormCrearAgregarTutor />
            <input
              type="hidden"
              value={alumno.id}
              {...register("idAlumno", { valueAsNumber: true })}
            />
          </>
        )}
      </FormProvider>
    </>
  );
};
