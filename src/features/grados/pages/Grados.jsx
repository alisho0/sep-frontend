
import { PlusIcon } from '@heroicons/react/16/solid'
import React, { useEffect } from 'react'
import { BotonIcono } from '../../../utils/components/BotonIcono'
import { TrashIcon } from '@heroicons/react/24/outline'
import { useDispatch, useSelector } from 'react-redux'
import { listarGrados } from '../../../reducers/gradosSlice'

export const Grados = () => {

    const {grados} = useSelector((state) => state.grados)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(listarGrados());
    }, [])

  return (
    <>
      <section className="container mx-auto md:px-28 px-4 pt-9">
        <div className='flex justify-between items-center mb-4'>
            <div>
                <h1 className='text-3xl font-semibold'>Grados</h1>
                <p>Gestiona los grados, ciclos y secciones.</p>
            </div>
            <BotonIcono texto={'Nuevo Grado'}/>     
        </div>
        {grados.map((g, idx) => (
            <div className="bg-white p-6 rounded-lg shadow-md border-gray-300 mb-3">
                <div className='flex justify-between'>
                    <h3 className='font-semibold text-xl'>{g.grado} Grado</h3>
                    <div className='flex gap-2'>
                        <BotonIcono texto={'Nuevo Ciclo'}/>
                        <BotonIcono Icono={TrashIcon} className='hover:bg-red-700 justify-center' />
                    </div>
                </div>
                {/* Aqui van los ciclos */}
                <div>
                </div>
            </div>
        ))}
      </section>
    </>
  )
}
