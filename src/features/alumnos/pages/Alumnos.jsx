import { EyeIcon } from "@heroicons/react/20/solid";
import { FiltrosAlumnos } from "../components/detalle/FiltrosAlumnos";
import { useAlumnos } from "../../../hooks/useAlumnos";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { traerAlumnos } from "../../../reducers/alumnosSlice";
import { Link } from "react-router-dom";
import { UserPlusIcon } from "@heroicons/react/16/solid";
import { abrirModal } from "../../../reducers/uiSlice";

export const Alumnos = () => {
  const dispatch = useDispatch();
  const { alumnos, loading } = useSelector((state) => state.alumnos);

  useEffect(() => {
    dispatch(traerAlumnos());
  }, [])

  return (
    <>
      <div className="container mx-auto md:px-28 px-4 pt-9">
        <div className="bg-white p-6 rounded-lg shadow-md border-gray-300">
          <h4>Listado de Alumnos</h4>
          <FiltrosAlumnos />
          <button className="flex gap-2 justify-center items-center bg-indigo-600 mt-5 w-full py-1 px-2 rounded-lg shadow-md text-white font-semibold hover:cursor-pointer hover:bg-indigo-700 transition-colors" onClick={() => dispatch(
            abrirModal({
              modalAbierto: true, 
              tipo: 'crearAlumno', 
              modalData: null}))}>
            <UserPlusIcon className="h-5 w-5" />
            Nuevo Alumno
          </button>
          <div>
            {/* Aquí iría la tabla o lista de alumnos */}
            {loading ? (
              <p>Cargando alumnos</p>
            ) : alumnos.map((alumno, idx) => (
              (
              <div className="border border-gray-400 rounded-xl px-4 py-4 bg-white mt-6 grid md:grid-cols-2" key={idx}>
                <div>
                  <p className="mb-2.5 font-semibold">{`${alumno.nombre} ${alumno.apellido}`}</p>
                  <div className="flex gap-1 mb-4">
                    <span className="text-sm text-gray-600 border-r pr-1.5">
                      Grado: {`${alumno.ultGrado}° ${alumno.seccionGrado}`}
                    </span>
                    <span className="text-sm text-gray-600 border-r px-1.5">
                      Turno: {alumno.turno}
                    </span>
                    <span className="text-sm text-gray-600 border-r px-1.5 last:border-r-0">
                      DNI: {alumno.dni}
                    </span>
                  </div>
                </div>
              <Link
                to={`/alumnos/${alumno.id}`}
                className="self-center md:justify-self-end w-full bg-indigo-500 p-2 rounded-lg cursor-pointer hover:bg-indigo-700 transition duration-150 flex justify-center md:w-auto"
              >
                <div className="flex gap-2 items-center">
                  <EyeIcon className="h-5 w-5 text-white" />
                  <span className="font-semibold text-white">Ver Perfil</span>
                </div>
              </Link>
            </div>
            )
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
