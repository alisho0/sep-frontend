import React from 'react'
import { CardMetrica } from '../../../utils/components/CardMetrica'
import { PencilSquareIcon, TrashIcon, UsersIcon } from '@heroicons/react/24/outline'
import { BotonIcono } from '../../../utils/components/BotonIcono'

export const Usuarios = () => {
    
    const metricas = [
        { id: 1, text: "Total de Usuarios", data: 4, icono: UsersIcon},
        { id: 2, text: "Directores", data: 4, icono: UsersIcon},
        { id: 3, text: "Maestros", data: 4, icono: UsersIcon}
    ]

  return (
    <>
        <section className='container mx-auto px-28 pt-9'>
            <div className='mb-4'>
                <h2 className='text-4xl font-semibold'>Gestión de Usuarios</h2>
                <p className='text-gray-800 italic '>Administra los usuarios del sistema.</p>
            </div>
            <div className='grid grid-cols-1 gap-2 md:grid-cols-3 mb-3'>
                {metricas.map((m) => (
                    <CardMetrica key={m.id} Icono={m.icono} data={m.data} texto={m.text} />
                ))}
            </div>

            <div className='bg-white p-6 rounded-lg shadow-md border-gray-300'>
                <h2 className='font-semibold mb-3'>Usuarios del Sistema</h2>
                <div className="border border-gray-400 p-4 rounded-lg bg-gray-100 md:flex-row md:justify-between md:items-center hover:bg-gray-300 transition-colors mb-3 flex flex-col gap-3">
                    <div className='flex flex-col gap-2'>
                        <div className='flex gap-3 items-center'>
                            <p className='font-semibold'>John Doe</p>
                            <span className='text-sm italic font-semibold bg-indigo-600 text-white px-2 py-0.5 rounded-lg'>Director</span>
                        </div>
                        <span className='text-sm text-gray-800'>correo@user.com</span>
                    </div>
                    <div className='flex flex-col gap-2 justify-center md:flex-row'>
                        <BotonIcono texto={"Editar"} Icono={PencilSquareIcon} className='bg-indigo-600 justify-center hover:bg-indigo-700 text-white' />
                        <BotonIcono texto={"Eliminar"} Icono={TrashIcon} className='bg-indigo-600 justify-center hover:bg-red-700 text-white' />
                    </div>
                </div>
            </div>
        </section>
    </>
  )
}
