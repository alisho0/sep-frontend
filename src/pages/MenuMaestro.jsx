import { PencilIcon, PlusIcon, UserGroupIcon, UsersIcon } from '@heroicons/react/20/solid';
import React from 'react'

export const MenuMaestro = () => {
  return (
    <>
      <div className='container mx-auto px-28 pt-9'>
        <h2 className='text-3xl font-bold mb-2'>Panel de Control</h2>
        <p className='text-sm mb-6'>Bienvenido, usuario</p>
        <div className='grid grid-cols-2 gap-4'>
          <div className='grid sm:grid-cols-2 md:grid-cols-3 gap-1.5 col-span-2'>
            {/* {metricas.map((metrica, idx) => (
              <div className='bg-white p-6 rounded-lg shadow-md border-gray-300 border  px-4 py-4 grid ' key={idx}>
                <div className='flex justify-between self-center items-center'>
                  <span className='text-sm'>{metrica.nombre}</span>
                  <UsersIcon className='w-4 h-4' />
                </div>
                <span className='text-2xl font-semibold'>{metrica.valor}</span>
              </div>
            ))} */}
              <div className='bg-white p-6 rounded-lg shadow-md border-gray-300 border  px-4 py-4 grid '>
                <div className='flex justify-between self-center items-center'>
                  <span className='text-sm'>Grados asignados</span>
                  <UsersIcon className='w-4 h-4' />
                </div>
                <span className='text-2xl font-semibold'>11</span>
              </div>
              <div className='bg-white p-6 rounded-lg shadow-md border-gray-300 border  px-4 py-4 grid '>
                <div className='flex justify-between self-center items-center'>
                  <span className='text-sm'>Alumnos a cargo</span>
                  <UserGroupIcon className='w-4 h-4' />
                </div>
                <span className='text-2xl font-semibold'>11</span>
              </div>
              <div className='bg-white p-6 rounded-lg shadow-md border-gray-300 border  px-4 py-4 grid '>
                <div className='flex justify-between self-center items-center'>
                  <span className='text-sm'>Observaciones realizadas este ciclo</span>
                  <PencilIcon className='w-4 h-4' />
                </div>
                <span className='text-2xl font-semibold'>11</span>
              </div>
          </div>

          <div className='bg-white p-6 rounded-lg shadow-md border-gray-300 col-span-2'>
            <div >
              <h4 className='font-semibold mb-4'>Accesos Rápidos</h4>
              <div className='grid grid-cols-3 gap-3'>
                <div className='flex flex-col items-center gap-1 shadow-lg bg-indigo-600 px-3 py-2 rounded-lg hover:bg-indigo-700 transition-colors cursor-pointer text-white'>
                  <PlusIcon className='w-5 h-5'/>
                  <p className='font-semibold'>Nueva Observación</p>
                </div>
                <div className='flex flex-col items-center gap-1 shadow-lg bg-indigo-600 px-3 py-2 rounded-lg hover:bg-indigo-700 transition-colors cursor-pointer text-white'>
                  <PlusIcon className='w-5 h-5'/>
                  <p className='font-semibold'>Ver mis grados</p>
                </div>
                <div className='flex flex-col items-center gap-1 shadow-lg bg-indigo-600 px-3 py-2 rounded-lg hover:bg-indigo-700 transition-colors cursor-pointer text-white'>
                  <PlusIcon className='w-5 h-5'/>
                  <p className='font-semibold'>Buscar Alumno</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
