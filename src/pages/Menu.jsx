import React, { useEffect } from 'react'
import { Navbar } from '../components/Navbar'
import { UsersIcon } from '@heroicons/react/16/solid'
import { useDispatch, useSelector } from 'react-redux'
import { traerAlumnos } from '../reducers/alumnosSlice'

export const Menu = () => {

  const cards = [
    {
      titulo: "Total de Alumnos",
      cantidades: "150",
      icono: ""
    },
    {
      titulo: "Grados Activos",
      cantidades: "30"
    },
    {
      titulo: "Observaciones Recientes",
      cantidades: "23"
    },
    {
      titulo: "Discapacidades Registradas",
      cantidades: "55"
    },
  ]

  const observaciones = [
    {
      titulo: "Observación 1",
      tiempo: "Hace 2 horas"
    },
    {
      titulo: "Observación 2",
      tiempo: "Hace 5 horas"
    },
    {
      titulo: "Observación 3",
      tiempo: "Hace 7 horas"
    },
  ]
  const token = localStorage.getItem('token')
  const dispatch = useDispatch();
  const { countAlumnos } = useSelector((state) => state.alumnos);

  return (
    <>
      <div className='container mx-auto px-28 pt-9'>
        <h2 className='text-3xl font-bold mb-2'>Panel de Control</h2>
        <p className='text-sm mb-6'>Bienvenido, usuario</p>
        <div className='grid grid-cols-2 gap-4'>
          <div className='grid sm:grid-cols-2 md:grid-cols-4 gap-1.5 col-span-2'>
            {cards.map((card, idx) => (
              <div className='bg-white p-6 rounded-lg shadow-md border-gray-300 border  px-4 py-4 grid ' key={idx}>
                <div className='flex justify-between self-center'>
                  <span className='text-sm'>{card.titulo}</span>
                  <UsersIcon className='w-3.5' />
                </div>
                <span className='text-2xl font-semibold'>{card.cantidades}</span>
              </div>
            ))}
          </div>

          <div className='bg-white p-6 rounded-lg shadow-md border-gray-300'>
            <div >
              <h4 className='font-semibold'>Actividad Reciente</h4>
              <p className='text-sm text-gray-900'>Últimos eventos en el sistema</p>
              {observaciones.map((obs, idx) => (
                <div className='flex mt-4 justify-items-start gap-3 border-b border-gray-500 pb-4 last:border-0' key={idx}>
                  <div className='w-2 h-2 bg-blue-500 rounded-full mt-1.5'></div>
                  <div>
                    <p className='text-sm m-0'>{obs.titulo}</p>
                    <p className='text-xs mt-0.5 text-gray-800'>{obs.tiempo}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className='bg-white p-6 rounded-lg shadow-md border-gray-300'>
            <div >
              <h4 className='font-semibold'>Actividad Reciente</h4>
              <p className='text-sm text-gray-900'>Últimos eventos en el sistema</p>
              <div className='flex mt-4'>
                <div className='w-2 h-2 bg-blue-500 rounded-full'></div>
                <div>
                  <p className='text-sm'>Nueva Obs</p>
                  <span className='text-xs'>Hace 2 horas</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
