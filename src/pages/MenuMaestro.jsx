import { MagnifyingGlassIcon, PencilIcon, UserGroupIcon, UsersIcon } from '@heroicons/react/20/solid';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { traerAlumnosPorId, traerGradosPorId, traerObservacionesPorId, ultimasActividades } from '../reducers/metricasSlice';
import { jwtDecode } from 'jwt-decode';
import { EyeIcon } from '@heroicons/react/24/outline';
import { formatearFecha } from '../utils/formatearFecha';
import { abrirModal } from '../reducers/uiSlice'
import { Link } from 'react-router-dom';

export const MenuMaestro = () => {
  const dispatch = useDispatch();
  
  const token = localStorage.getItem("token");
  let userId = null;
  let user = null;
  if (token) {
    try {
      const claims = token ? jwtDecode(token) : null;
      userId = claims?.userId;
      user = claims?.sub;
    } catch (error) {
      console.error("Error al decodificar el token:", error);
    }
  }

  const { gradosPorId, alumnosPorId, observacionesPorId, loading, error, observaciones } = useSelector(state => state.metricas);

  useEffect(() => {
    if (userId) {
      dispatch(traerGradosPorId(userId));
      dispatch(traerAlumnosPorId(userId));
      dispatch(traerObservacionesPorId(userId));
      dispatch(ultimasActividades());
    }
  }, [userId]);

  return (
    <>
      <div className="container mx-auto px-28 pt-9">
        <h2 className="text-3xl font-bold mb-2">Panel de Control</h2>
        <p className="text-sm mb-6">Bienvenido, {user ?? "usuario"}</p>
        <div className="grid grid-cols-2 gap-4">
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-1.5 col-span-2">
            <div className="bg-white p-6 rounded-lg shadow-md border-gray-300 border  px-4 py-4 grid ">
              <div className="flex justify-between self-center items-center">
                <span className="text-sm">Grados asignados</span>
                <UsersIcon className="w-4 h-4" />
              </div>
              <span className="text-2xl font-semibold">
                {loading ? "..." : (gradosPorId ?? 0)}
              </span>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border-gray-300 border  px-4 py-4 grid ">
              <div className="flex justify-between self-center items-center">
                <span className="text-sm">Alumnos a cargo</span>
                <UserGroupIcon className="w-4 h-4" />
              </div>
              <span className="text-2xl font-semibold">
                {loading ? "..." : (alumnosPorId ?? 0)}
              </span>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border-gray-300 border  px-4 py-4 grid ">
              <div className="flex justify-between self-center items-center">
                <span className="text-sm">
                  Observaciones realizadas este ciclo
                </span>
                <PencilIcon className="w-4 h-4" />
              </div>
              <span className="text-2xl font-semibold">
                {loading ? "..." : (observacionesPorId ?? 0)}
              </span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md border-gray-300 col-span-2">
            <div>
              <h4 className="font-semibold mb-4">Accesos Rápidos</h4>
              <div className="grid grid-cols-2 gap-3">
                {/* <div className='flex flex-col items-center gap-1 shadow-lg bg-indigo-600 px-3 py-2 rounded-lg hover:bg-indigo-700 transition-colors cursor-pointer text-white'>
                  <PlusIcon className='w-5 h-5'/>
                  <p className='font-semibold'>Nueva Observación</p>
                </div> */}
                <Link to={'/grados-asignados'} className="flex flex-col items-center gap-1 shadow-lg bg-indigo-600 px-3 py-2 rounded-lg hover:bg-indigo-700 transition-colors cursor-pointer text-white">
                  <EyeIcon className="w-5 h-5" />
                  <p className="font-semibold">Ver mis grados</p>
                </Link>
                <button onClick={() => dispatch(abrirModal({
                  modalAbierto: true,
                  tipo: "buscarAlumno",
                  data: { },
                }))} 
                className="flex flex-col items-center gap-1 shadow-lg bg-indigo-600 px-3 py-2 rounded-lg hover:bg-indigo-700 transition-colors cursor-pointer text-white">
                  <MagnifyingGlassIcon className="w-5 h-5" />
                  <p className="font-semibold">Buscar Alumno</p>
                </button>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md border-gray-300 col-span-2">
            <div>
              <h4 className="font-semibold">Actividad Reciente</h4>
              <p className="text-sm text-gray-900">
                Últimos eventos en el sistema
              </p>
              {Array.isArray(observaciones) && observaciones.length > 0 ? ( observaciones.map((obs, idx) => {
                const fechaFormateada = formatearFecha(obs.fecha);
                return (
                  <div
                    className="flex mt-4 justify-items-start gap-3 border-b border-gray-500 pb-4 last:border-0"
                    key={idx}
                  >
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5"></div>
                    <div>
                      <p className="text-sm m-0">{obs.descripcion}</p>
                      <p className="text-xs mt-0.5 text-gray-800">
                        {fechaFormateada}
                      </p>
                    </div>
                  </div>
                );
              })) : <p className="text-sm mt-4 text-gray-800 italic">No hay actividad reciente para mostrar.</p>}
            </div>
          </div>
        </div>
        {error && <div className="text-red-500 mt-4">Error: {error}</div>}
      </div>
    </>
  );
}
