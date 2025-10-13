import { PlusIcon } from "@heroicons/react/16/solid";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { crearTutorConAlumno } from "../../../reducers/tutoresSlice";
import { crearObservacion } from "../../../reducers/observacionesSlice";
import { showAlert } from "../../../utils/alert";
import { cerrarModal } from "../../../reducers/uiSlice";

export const FormNuevoTutor = () => {
  const token = localStorage.getItem("token")
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const { alumno } = useSelector((state) => state.alumnos);

  const onSubmit = async (data) => {
    try {
      const resultAction = await dispatch(crearTutorConAlumno({ token, tutor: data }));
      if (crearTutorConAlumno.fulfilled.match(resultAction)) {
        showAlert({
          title: "Éxito",
          text: "El tutor fue creado y agregado correctamente al alumno",
          icon: "success",
        });
        dispatch(cerrarModal());
      } else if (crearTutorConAlumno.rejected.match(resultAction)) {
        throw new Error(resultAction.error.message);
      }
    } catch (error) {
      showAlert({
        title: "Error",
        text: error.message || "Ocurrió un error al crear el tutor",
        icon: "error",
      });
    }
  };

  return (
    <>
      <form
        className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* Nombre */}
        <div className="flex flex-col">
          <label htmlFor="nombre" className="text-sm font-medium text-gray-700">
            Nombre *
          </label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            placeholder="Nombre del tutor"
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            {...register("nombre", { required: true })}
          />
          {errors.nombre && (
            <span className="text-xs text-red-700">
              Este campo es obligatorio
            </span>
          )}
        </div>

        {/* Apellido */}
        <div className="flex flex-col">
          <label
            htmlFor="apellido"
            className="text-sm font-medium text-gray-700"
          >
            Apellido *
          </label>
          <input
            type="text"
            id="apellido"
            name="apellido"
            placeholder="Apellido del tutor"
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            {...register("apellido", { required: true })}
          />
          {errors.apellido && (
            <span className="text-xs text-red-700">
              Este campo es obligatorio
            </span>
          )}
        </div>

        {/* DNI */}
        <div className="flex flex-col">
          <label htmlFor="dni" className="text-sm font-medium text-gray-700">
            DNI *
          </label>
          <input
            type="number"
            id="dni"
            name="dni"
            placeholder="DNI del tutor"
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            {...register("dni", { required: true })}
            min={0}
          />
          {errors.dni && (
            <span className="text-xs text-red-700">
              Este campo es obligatorio
            </span>
          )}
        </div>

        {/* Domicilio */}
        <div className="flex flex-col">
          <label
            htmlFor="domicilio"
            className="text-sm font-medium text-gray-700"
          >
            Domicilio *
          </label>
          <input
            type="text"
            id="domicilio"
            name="domicilio"
            placeholder="Domicilio del tutor"
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            {...register("domicilio", { required: true })}
          />
          {errors.domicilio && (
            <span className="text-xs text-red-700">
              Este campo es obligatorio
            </span>
          )}
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="domicilio"
            className="text-sm font-medium text-gray-700"
          >
            Teléfono *
          </label>
          <input
            type="text"
            id="domicilio"
            name="domicilio"
            placeholder="Teléfono del tutor"
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            {...register("telefono", { required: true })}
          />
          {errors.telefono && (
            <span className="text-xs text-red-700">
              Este campo es obligatorio
            </span>
          )}
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="domicilio"
            className="text-sm font-medium text-gray-700"
          >
            Teléfono Auxiliar
          </label>
          <input
            type="text"
            id="domicilio"
            name="domicilio"
            placeholder="Teléfono auxiliar (opcional)"
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            {...register("telAux", { required: false })}
          />
          {errors.telAux && (
            <span className="text-xs text-red-700">
              Este campo es obligatorio
            </span>
          )}
          <input type="hidden" value={alumno.id} {...register("idAlumno", {valueAsNumber: true})} />
        </div>
        <button className="flex bg-indigo-600 px-2 py-1 rounded-lg text-white w-full gap-2 font-semibold col-span-2 justify-center items-center hover:cursor-pointer hover:bg-indigo-700 transition-colors">
          <PlusIcon className="w-5 h-5" />
          <p>Crear y Agregar Tutor</p>
        </button>
      </form>
    </>
  );
};
