import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { cerrarModal } from "../../../reducers/uiSlice";
import { showAlert } from "../../../utils/alert";
import { listarUsuarios, registrarUsuario } from "../../../reducers/usuariosSlice";

export const ModalCrearUsuario = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

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
          error.message || "El usuario no pudo ser creado. Intentalo nuevamente.",
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

      <form
        className="grid grid-cols-1 md:grid-cols-2 gap-3"
        onSubmit={handleSubmit(onSubmit)}
      >
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
          <label
            htmlFor="apellido"
            className="text-sm font-medium text-gray-700"
          >
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
          <label
            htmlFor="username"
            className="text-sm font-medium text-gray-700"
          >
            Correo de usuario *
          </label>
          <input
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            type="text"
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
        <div className="flex flex-col col-span-2 md:col-span-1">
          <label
            htmlFor="password"
            className="text-sm font-medium text-gray-700"
          >
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
        <div className="flex flex-col col-span-2 ">
          <label
            htmlFor="rol"
            className="text-sm font-medium text-gray-700 mb-1"
          >
            Rol
          </label>
          <select
            name="rol"
            id="rol"
            className={`w-full outline-none text-gray-700 bg-white border border-gray-300 rounded-lg px-2 py-2 focus:ring-2 focus:ring-indigo-500`}
            {...register("rol", { required: true })}
            defaultValue=""
          >
            <option value="" disabled>
              Selecciona un rol
            </option>
            <option value="MAESTRO">Maestro</option>
            <option value="DIRECTOR">Director</option>
          </select>
          {errors?.nroGrado && (
            <span className="text-xs text-red-700">
              Este campo es obligatorio
            </span>
          )}
        </div>
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
      </form>
    </>
  );
};
