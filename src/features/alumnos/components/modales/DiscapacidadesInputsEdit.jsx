import { PlusIcon, TrashIcon } from "@heroicons/react/16/solid";
import React, { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { listarDiscapacidades } from "../../../../reducers/discapacidadesSlice";

export const DiscapacidadesInputsEdit = () => {
  const dispatch = useDispatch();
  const { register, watch, setValue, formState: { errors } } = useFormContext();
  const { discapacidades } = useSelector((state) => state.discapacidades);
  const { modalData } = useSelector((state) => state.ui);
  const [discapacidadesSeleccionadas, setDiscapacidadesSeleccionadas] = useState([]);
  const [tieneDiscapacidad, setTieneDiscapacidad] = useState(false);
  const discapacidadActual = watch("discapacidades");

  // Inicializar datos al cargar el modal
  useEffect(() => {
    dispatch(listarDiscapacidades());
    
    if (modalData && modalData?.discapacidades && modalData?.discapacidades.length > 0) {
      // El alumno tiene discapacidades
      setTieneDiscapacidad(true);
      setDiscapacidadesSeleccionadas(modalData.discapacidades.map(d => d.id));
      setValue("discapacidad", true);
      setValue("detalleDiscap", modalData.detalleDiscap || "");
    } else {
      // El alumno no tiene discapacidades
      setTieneDiscapacidad(false);
      setDiscapacidadesSeleccionadas([]);
      setValue("discapacidad", false);
      setValue("detalleDiscap", "");
    }
  }, [modalData, dispatch, setValue]);

  // Sincronizar con el formulario
  useEffect(() => {
    setValue("discapacidadesSeleccionadas", discapacidadesSeleccionadas);
  }, [discapacidadesSeleccionadas, setValue]);

  const handleAgregarDiscapacidad = () => {
    if (discapacidadActual && !discapacidadesSeleccionadas.includes(Number(discapacidadActual))) {
      setDiscapacidadesSeleccionadas((prev) => [...prev, Number(discapacidadActual)]);
    }
  };

  const handleEliminarDiscapacidad = (id) => {
    setDiscapacidadesSeleccionadas((prev) => prev.filter((d) => d !== id));
  };

  const handleConfirmarDiscapacidad = () => {
    setTieneDiscapacidad(true);
    setValue("discapacidad", true);
  };

  const handleRemoverDiscapacidades = () => {
    setTieneDiscapacidad(false);
    setDiscapacidadesSeleccionadas([]);
    setValue("discapacidad", false);
    setValue("detalleDiscap", "");
  };

  const getNombreDiscapacidad = (id) => {
    const disc = discapacidades.find((d) => d.id === id);
    return disc ? disc.nombre : `ID: ${id}`;
  };

  return (
    <div className="flex flex-col col-span-2">
      {!tieneDiscapacidad ? (
        // Usuario NO tiene discapacidades
        <div className="flex flex-col gap-4 mt-4">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h4 className="font-semibold text-yellow-900 mb-2">Sin Discapacidades Registradas</h4>
            <p className="text-sm text-yellow-800 mb-4">
              Este alumno no tiene discapacidades registradas actualmente.
            </p>
            <button
              type="button"
              onClick={handleConfirmarDiscapacidad}
              className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium"
            >
              Añadir Discapacidades
            </button>
          </div>
        </div>
      ) : (
        // Usuario si tiene discapacidades
        <div className="flex flex-col gap-4 mt-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-semibold text-blue-900 mb-3">Discapacidades Registradas</h4>
            
            {/* Lista de discapacidades actuales */}
            <div className="mb-4">
              <h5 className="text-sm font-medium text-gray-700 mb-2">Discapacidades Actuales:</h5>
              <div className="flex flex-wrap gap-2 mb-3">
                {discapacidadesSeleccionadas.map((id) => (
                  <div
                    key={id}
                    className="px-3 py-1 bg-indigo-600 text-white rounded-md text-sm flex items-center gap-2"
                  >
                    <span>{getNombreDiscapacidad(id)}</span>
                    <button
                      type="button"
                      onClick={() => handleEliminarDiscapacidad(id)}
                      className="hover:text-red-300 transition-colors"
                      title="Eliminar"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Selector para agregar más discapacidades */}
            <div className="bg-white border border-blue-200 rounded-lg p-3 mb-3">
              <label className="text-sm font-medium text-gray-700 block mb-2">
                Agregar más discapacidades
              </label>
              <div className="flex gap-2">
                <select
                  {...register("discapacidades")}
                  defaultValue=""
                  className="flex-1 outline-none text-gray-700 bg-white border border-gray-300 rounded-lg px-2 py-2 focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="" disabled hidden>
                    Selecciona una discapacidad
                  </option>
                  {discapacidades.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.nombre}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={handleAgregarDiscapacidad}
                  className="bg-indigo-600 text-white px-3 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-1 whitespace-nowrap"
                >
                  <PlusIcon className="w-4 h-4" />
                  Agregar
                </button>
              </div>
            </div>

            {/* Detalles */}
            <div className="mb-3">
              <label htmlFor="detalle" className="text-sm font-medium text-gray-700 block mb-1">
                Detalles de las Discapacidades
              </label>
              <textarea
                {...register("detalleDiscap")}
                id="detalle"
                rows={2}
                placeholder="Describe los detalles de las discapacidades (opcional)"
                className="w-full border border-gray-300 rounded-lg px-2 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              {errors?.detalleDiscap && (
                <span className="text-xs text-red-700">{errors.detalleDiscap.message}</span>
              )}
            </div>

            {/* Botón para remover discapacidades */}
            <button
              type="button"
              onClick={handleRemoverDiscapacidades}
              className="w-full bg-red-100 text-red-700 px-4 py-2 rounded-lg hover:bg-red-200 transition-colors text-sm font-medium flex items-center justify-center gap-2"
            >
              <TrashIcon className="w-4 h-4" />
              Remover Discapacidades
            </button>
          </div>
        </div>
      )}

      {/* Input oculto para almacenar el array */}
      <input
        type="hidden"
        value={discapacidadesSeleccionadas}
        {...register("discapacidadesSeleccionadas")}
      />
    </div>
  );
};
