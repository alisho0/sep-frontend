import { PlusIcon } from "@heroicons/react/16/solid";
import React, { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { useSelector } from "react-redux";

export const DiscapacidadesInputs = () => {
  const { register, watch, setValue, formState: {errors} } = useFormContext();
  const { discapacidades } = useSelector((state) => state.discapacidades);
  const [discapacidadesSeleccionadas, setDiscapacidadesSeleccionadas] = useState([]);
  const discapacidadActual = watch("discapacidades");
  const isDiscapacidad = watch("discapacidad");

  useEffect(() => {
    setValue("discapacidadesSeleccionadas", discapacidadesSeleccionadas);
  }, [discapacidadesSeleccionadas]);
  return (
    <>
      <div className="flex flex-col col-span-2">
        <div className="flex flex-col gap-2 mt-4">
          {/* Checkbox con label */}
          <label
            htmlFor="discapacidad"
            className="flex items-center gap-2 text-sm font-medium text-gray-700"
          >
            <input
              type="checkbox"
              id="discapacidad"
              name="discapacidad"
              {...register("discapacidad")}
              className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
            />
            ¿Presenta alguna discapacidad?
          </label>
          {isDiscapacidad && (
            <section className="border-l-2 border-indigo-300 pl-3">
              <div className="bg-indigo-300 p-2 rounded-lg">
                <label
                  className="text-sm font-semibold text-gray-700"
                  htmlFor="discapacidades"
                >
                  Tipo de Discapacidad
                </label>
                <select
                  name="discapacidades"
                  id="discapacidades"
                  disabled={!isDiscapacidad}
                  {...register("discapacidades")}
                  defaultValue=""
                  className="w-full outline-none text-gray-700 bg-white border border-gray-300 rounded-lg px-2 py-2 disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="" disabled hidden>
                    Selecciona una discapacidad
                  </option>
                  {discapacidades.map((d, idx) => (
                  <option value={d.id} key={idx}>
                    {d.nombre}
                  </option>
                  ))}
                </select>
                <div className="flex gap-2 mt-3">
                  <button
                    type="button"
                    onClick={() => {
                      if (
                        discapacidadActual &&
                        !discapacidadesSeleccionadas.includes(
                          discapacidadActual
                        )
                      ) {
                        setDiscapacidadesSeleccionadas((prev) => [
                          ...prev,
                          discapacidadActual,
                        ]);
                      }
                    }}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:cursor-pointer hover:bg-indigo-700 transition-colors whitespace-nowrap flex gap-2 w-full justify-center items-center"
                  >
                    <PlusIcon className="w-5 h-5" />
                    Agregar Discapacidad
                  </button>
                </div>
              </div>

              <div className="mt-4">
                <h3 className="text-sm font-semibold text-gray-700 mb-2">
                  Discapacidades registradas
                </h3>
                <div className="max-h-24 overflow-y-auto">
                  <ul className="list-none text-sm text-gray-700 flex flex-wrap gap-2">
                    {discapacidadesSeleccionadas.map((disc, idx) => (
                      <li
                        className="px-3 py-1 bg-indigo-600 text-white rounded-md text-sm whitespace-nowrap flex items-center gap-1"
                        key={idx}
                      >
                        {disc}
                        <button
                          type="button"
                          onClick={() => {
                            setDiscapacidadesSeleccionadas((prev) =>
                              prev.filter((_, i) => i !== idx)
                            );
                          }}
                          className="ml-1 hover:text-red-300"
                        >
                          ×
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
                <div
                  className="flex flex-col
                    mt-4.5"
                >
                  <label
                    htmlFor="detalle"
                    className="text-sm font-semibold text-gray-700"
                  >
                    Detalles Generales
                  </label>
                  <textarea
                    className="border border-gray-300 focus:ring-indigo-500 rounded-lg py-1.5 px-2 focus:outline-none focus:ring-2"
                    name="detalle_discapacidad"
                    id="detalle"
                    rows={2}
                    placeholder="Escribe detalles aquí (opcional)" {...register('detalleDiscap', {required: true})}
                  ></textarea>
                  {errors?.detalleDiscap && (
                    <span className="text-xs text-red-700">Este campo es obligatorio</span>
                  )}
                </div>
              </div>

              <input
                type="hidden"
                value={discapacidadesSeleccionadas}
                {...register("discapacidadesSeleccionadas")}
              />
            </section>
          )}
        </div>
      </div>
    </>
  );
};
