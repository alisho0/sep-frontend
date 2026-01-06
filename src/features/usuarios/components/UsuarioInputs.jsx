import React, { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { cerrarModal } from "../../../reducers/uiSlice";

export const UsuarioInputs = ({usuariosForm = true}) => {
    
    const { register, formState: {errors}, setValue } = useFormContext();
    const dispatch = useDispatch();
    const { modalData, modalTipo } = useSelector((state) => state.ui)
    const { usuario } = useSelector((state) => state.usuarios)
    
    useEffect(() => {
      if (modalTipo === "editarUsuario" && modalData ) {
        setValue("nombre", modalData.nombre || "");
        setValue("apellido", modalData.apellido || "");
        setValue("username", modalData.username || "");
        setValue("dni", modalData.dni || "");
        setValue("domicilio", modalData.domicilio || "");
        setValue("rol", modalData.rol || "");
      } else if( usuario && !usuariosForm ) {
        setValue("id", usuario.id || "");
        setValue("nombre", usuario.nombre || "");
        setValue("apellido", usuario.apellido || "");
        setValue("username", usuario.username || "");
        setValue("dni", usuario.dni || "");
        setValue("domicilio", usuario.domicilio || "");
        setValue("rol", usuario.rol || "");
      }
    }, [modalTipo, modalData, setValue, usuario]);

  return (
    <>
      <div className="flex flex-col col-span-2 md:col-span-1">
        <label htmlFor="nombre" className="text-sm font-medium text-gray-700">
          Nombre *
        </label>
        <input
          className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          type="text"
          placeholder="Escribe el nombre..."
          id="nombre"
          name="nombre"
          {...register("nombre", { required: true })}
        />
        {errors?.nombre && (
          <span className="text-xs text-red-700">
            Este campo es obligatorio
          </span>
        )}
      </div>
      <div className="flex flex-col col-span-2 md:col-span-1">
        <label htmlFor="apellido" className="text-sm font-medium text-gray-700">
          Apellido *
        </label>
        <input
          className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          type="text"
          placeholder="Escribe el apellido..."
          id="apellido"
          name="apellido"
          {...register("apellido", { required: true })}
        />
        {errors?.nombre && (
          <span className="text-xs text-red-700">
            Este campo es obligatorio
          </span>
        )}
      </div>
      <div className="flex flex-col col-span-2 md:col-span-1">
        <label htmlFor="username" className="text-sm font-medium text-gray-700">
          Correo de usuario *
        </label>
        <input
          className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          type="email"
          placeholder="Escribe el nombre..."
          id="username"
          name="username"
          {...register("username", { required: true })}
        />
        {errors?.username && (
          <span className="text-xs text-red-700">
            Este campo es obligatorio
          </span>
        )}
      </div>
      {modalTipo == "crearUsuario" && (
        <div className="flex flex-col col-span-2 md:col-span-1">
          <label htmlFor="password" className="text-sm font-medium text-gray-700">
            Contraseña *
          </label>
          <input
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            type="text"
            placeholder="Escribe la contraseña..."
            id="password"
            name="password"
            {...register("password", { required: true })}
          />
          {errors?.password && (
            <span className="text-xs text-red-700">
              Este campo es obligatorio
            </span>
          )}
        </div>
      )}

      <div className="flex flex-col col-span-2 md:col-span-1">
        <label htmlFor="dni" className="text-sm font-medium text-gray-700">
          Documento
        </label>
        <input
          className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          type="text"
          placeholder="Escribe el documento..."
          id="dni"
          name="dni"
          {...register("dni", { required: false })}
        />
        {/* {errors?.password && (<span className="text-xs text-red-700">Este campo es obligatorio</span>)} */}
      </div>
      <div className="flex flex-col col-span-2 md:col-span-1">
        <label
          htmlFor="domicilio"
          className="text-sm font-medium text-gray-700"
        >
          Domicilio
        </label>
        <input
          className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          type="text"
          placeholder="Escribe el domicilio..."
          id="domicilio"
          name="domicilio"
          {...register("domicilio", { required: false })}
        />
        {/* {errors?.password && (<span className="text-xs text-red-700">Este campo es obligatorio</span>)} */}
      </div>
      <div className={`flex flex-col col-span-2  ${ modalTipo == "editarUsuario" || !usuariosForm  ? "md:col-span-1" : "" }`}>
        <label htmlFor="rol" className="text-sm font-medium text-gray-700 mb-1">
          Rol
        </label>
        <select
          name="rol"
          id="rol"
          className={`w-full outline-none text-gray-700 bg-white border border-gray-300 rounded-lg px-2 py-2 focus:ring-2 focus:ring-indigo-500`}
          {...register("rol", { required: true })}
          disabled={!usuariosForm}
          defaultValue=""
        >
          <option value="" disabled>
            Selecciona un rol
          </option>
          <option value="MAESTRO">Maestro</option>
          <option value="DIRECTOR">Director</option>
          <option value="ADMIN" disabled>Admin</option>
        </select>
        {errors?.nroGrado && (
          <span className="text-xs text-red-700">
            Este campo es obligatorio
          </span>
        )}
      </div>
      {usuariosForm && (
        <div className="flex justify-end text-white font-semibold col-span-2 w-fit gap-2 mt-4 ml-auto">
          <button
            className="bg-red-700 py-2 px-4 gap-1 rounded-lg hover:bg-red-800 transition-colors cursor-pointer"
            onClick={() => dispatch(cerrarModal())}
            type="button"
          >
            Cancelar
          </button>
          <button className="bg-indigo-600 py-2 px-4 gap-1 rounded-lg hover:bg-indigo-700 transition-colors cursor-pointer">
            Agregar
          </button>
        </div>
      )}
    </>
  );
};
