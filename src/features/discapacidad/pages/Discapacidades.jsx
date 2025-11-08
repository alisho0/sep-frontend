import { TrashIcon } from '@heroicons/react/16/solid'
import React from 'react'

export const Discapacidades = () => {
  return (
    <>
    <div className="container mx-auto md:px-28 px-4 pt-9">
        <h1 className='text-3xl font-semibold'>Gestión de Discapacidades</h1>
        <p>Administre los tipos de discapacidades disponibles en el sistema</p>
        <div className='bg-white p-6 rounded-lg shadow-md border-gray-300 mt-5'>
            <h2 className='text-xl font-semibold'>Discapacidades del Sistema</h2>
            <p className='text-gray-500 text-md'>Total: ....</p>
            <div className='mt-6 grid md:grid-cols-3 sm:grid-cols-2 gap-3'>
                <div className="border border-gray-400 rounded-xl px-4 py-4 bg-white flex flex-col md:flex-row items-center justify-between gap-2 w-full flex-wrap">
                    <h4 className="text-center md:text-left w-full md:w-auto break-words">
                    Discapacidad motora
                    </h4>

                    <button className="flex items-center bg-red-700 py-1 px-2 gap-1 rounded-lg hover:bg-red-800 transition-colors w-full md:w-auto justify-center">
                    <p className="text-white font-semibold">Eliminar</p>
                    <TrashIcon className="w-5 h-5 text-white" />
                    </button>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}
