import { Autocomplete, TextField } from "@mui/material";
import { jwtDecode } from "jwt-decode";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { useDispatch, useSelector } from "react-redux";
import { crearObservacion } from "../../../reducers/observacionesSlice";
import { useParams } from "react-router-dom";
import { showAlert } from "../../../utils/alert";
import { cerrarModal } from "../../../reducers/uiSlice";
import { observacionSchema } from "../../../validation/observacionSchema";
import { getFechaLocal } from "../../../utils/getFechaLocal";

export const ModalAgregarObservacionGrado = () => {
  const { cicloGradoActual, loading } = useSelector((state) => state.grados);
  const { alumnosCSG } = useSelector((state) => state.alumnos);
  const dispatch = useDispatch();
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
  } = useForm({
    resolver: zodResolver(observacionSchema)
  });

  const alumnosArray = alumnosCSG.map((alumno) => ({
    label: alumno.nombre + " | DNI: " + alumno.dni,
    id: alumno.idRegistro,
  }));

  const token = localStorage.getItem("token");
  const payload = jwtDecode(token);
  const fechaArg = getFechaLocal(new Date())

  const onSubmit = async (data) => {
    try {
      const resultAction = await dispatch(
        crearObservacion({ obs: data, registroId: null })
      );
      if (crearObservacion.fulfilled.match(resultAction)) {
        showAlert({
          title: "Observación creada",
          text: "La observación fue creada correctamente",
          icon: "success",
        });
        dispatch(cerrarModal());
      } else if (crearObservacion.rejected.match(resultAction)) {
        throw new Error(resultAction.error.message);
      }
    } catch (error) {
      showAlert({
        title: "Error",
        text: error.message || "Ocurrió un error al crear la observación",
        icon: "error",
      });
    }
  };

  return (
    <>
      <h2 className="font-semibold text-xl">Agregar observacion</h2>
      <form className="mt-2" onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="alumno" className="italic text-sm text-gray-700">
          Alumno
        </label>
        <Controller
          name="idRegistro"
          control={control}
          rules={{ required: "Debes seleccionar un alumno" }}
          render={({ field, fieldState }) => (
            <Autocomplete
              options={alumnosArray}
              getOptionLabel={(option) => option.label}
              onChange={(_, value) => field.onChange(value?.id)}
              sx={{ width: 300 }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Selecciona un alumno"
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
              loading={loading}
            />
          )}
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
            <span className="text-xs text-red-700 mb-2">
              {errors.contenido.message}
            </span>
          )}
          <label htmlFor="motivo">Motivo</label>
          <select
            className="border border-gray-300 rounded-md p-2"
            id="motivo"
            {...register("motivo", { required: true })}
            defaultValue={""}
          >
            <option value="" disabled>
              Selecciona un motivo
            </option>
            <option value="SOCIAL">Social</option>
            <option value="CONDUCTA">Conducta</option>
            <option value="PEDAGOGICO">Pedagógico</option>
            <option value="DERIVACION">Derivación</option>
            <option value="OTRO">Otro</option>
          </select>
          {errors.motivo && (
            <span className="text-xs text-red-700">
              {errors.motivo.message}
            </span>
          )}

          <input type="hidden" value={fechaArg} {...register("fecha")} />
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
