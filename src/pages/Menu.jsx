import React, { useEffect } from 'react'
import { Navbar } from '../components/Navbar'
import { UsersIcon } from '@heroicons/react/16/solid'
import { useDispatch, useSelector } from 'react-redux'
import { traerAlumnos } from '../reducers/alumnosSlice'
import { traerMetricas, ultimasActividades } from '../reducers/metricasSlice'

export const Menu = () => {

  const token = localStorage.getItem('token')
  const dispatch = useDispatch();
  const { metricas, observaciones } = useSelector((state) => state.metricas);
  useEffect(() => {
    dispatch(traerMetricas(token));
    dispatch(ultimasActividades(token));
  }, [])

  const formatearFecha = (fechaRaw) => {
    const fecha = new Date(fechaRaw);
    const fechaFormateada = fecha.toLocaleString("es-AR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
    return fechaFormateada;
  }

  return (
    <>
      <div className='container mx-auto px-28 pt-9'>
        <h2 className='text-3xl font-bold mb-2'>Panel de Control</h2>
        <p className='text-sm mb-6'>Bienvenido, usuario</p>
        <div className='grid grid-cols-2 gap-4'>
          <div className='grid sm:grid-cols-2 md:grid-cols-3 gap-1.5 col-span-2'>
            {metricas.map((metrica, idx) => (
              <div className='bg-white p-6 rounded-lg shadow-md border-gray-300 border  px-4 py-4 grid ' key={idx}>
                <div className='flex justify-between self-center items-center'>
                  <span className='text-sm'>{metrica.nombre}</span>
                  <UsersIcon className='w-4 h-4' />
                </div>
                <span className='text-2xl font-semibold'>{metrica.valor}</span>
              </div>
            ))}
          </div>

          <div className='bg-white p-6 rounded-lg shadow-md border-gray-300 col-span-2'>
            <div >
              <h4 className='font-semibold'>Actividad Reciente</h4>
              <p className='text-sm text-gray-900'>Últimos eventos en el sistema</p>
              {observaciones.map((obs, idx) => {
                const fechaFormateada = formatearFecha(obs.fecha);
                return (
                <div className='flex mt-4 justify-items-start gap-3 border-b border-gray-500 pb-4 last:border-0' key={idx}>
                  <div className='w-2 h-2 bg-blue-500 rounded-full mt-1.5'></div>
                  <div>
                    <p className='text-sm m-0'>{obs.descripcion}</p>
                    <p className='text-xs mt-0.5 text-gray-800'>{fechaFormateada}</p>
                  </div>
                </div>
              )})}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
