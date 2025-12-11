import { Autocomplete, TextField } from "@mui/material";
import { jwtDecode } from "jwt-decode";
import React from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

export const ModalAgregarObservacionGrado = () => {
  const { cicloGradoActual, loading } = useSelector((state) => state.grados);
  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm();

  const alumnosArray = cicloGradoActual.alumnos.map((alumno) => ({
    label: alumno.nombre + " " + alumno.apellido + " | DNI: " + alumno.dni,
    id: alumno.id,
  }));

  const token = localStorage.getItem("token");
  const payload = jwtDecode(token);
  const today = new Date();
  const formattedDate = `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}`;

  const onSubmit = async (data) => {
    console.log(data)
  }

  return (
    <>
      <h2 className="font-semibold text-xl">Agregar observacion</h2>
      <form className="mt-2" onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="alumno" className="italic text-sm text-gray-700">
          Alumno
        </label>
        <Autocomplete
          disablePortal
          options={alumnosArray}
          sx={{ width: 300 }}
          renderInput={(params) => (
            <TextField {...params} label="Ingresa alumno..." />
          )}
          getOptionKey={(option) => option.id}
          loading={loading}
          {...register("id_ej")}
        />
        <div className="flex flex-col gap-1 my-4">
          <label htmlFor="observacion">Descripción:</label>
          <textarea
            className="border border-gray-300 rounded-md p-2"
            id="observacion"
            rows="4"
            {...register("contenido", { required: true })}
          />
          {errors.contenido && (
            <span className="text-xs text-red-700">
              Este campo es obligatorio
            </span>
          )}
          <input type="hidden" value={formattedDate} {...register("fecha")} />
          <input
            type="hidden"
            value={payload.sub}
            {...register("nombreUsuario")}
          />
        </div>
        <div>
          <p className="text-sm text-gray-600">
            Fecha: {new Date().toLocaleDateString()}
          </p>
          <p className="text-sm text-gray-600">Usuario: {payload.sub}</p>
        </div>

        <div className="flex justify-end mt-4">
          <button className="w-full bg-indigo-600 text-white px-4 py-1 font-semibold rounded-md hover:bg-indigo-700 hover:cursor-pointer transition-all delay-75">
            Registrar Observación
          </button>
        </div>
      </form>
    </>
  );
};
0;
