import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { cerrarModal } from '../../../reducers/uiSlice';
import { nuevaDiscapacidad } from '../../../reducers/discapacidadesSlice';
import { showAlert } from '../../../utils/alert';

export const ModalCrearDiscapacidad = () => {
    const dispatch = useDispatch();
    const [nombre, setNombre] = useState('');
    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const nuevaDis = await dispatch(nuevaDiscapacidad(nombre));
            if (nuevaDiscapacidad.fulfilled.match(nuevaDis)) {
                showAlert({
                    title: 'Discapacidad creada',
                    text: 'La discapacidad fue creada y agregada correctamente',
                    icon: 'success'
                });
                dispatch(cerrarModal());
            } else if (nuevaDiscapacidad.rejected.match(nuevaDis)) {
                throw new Error(nuevaDis.error.message);
            }
        } catch (error) {
            showAlert({
                title: 'Creación fallida',
                text: error.message || 'La discapacidad no pudo ser creada. Intentalo nuevamente.',
                icon: 'error'
            });
        }
    }
  return (
    <>
        <h2 className='text-xl font-semibold'>Agregar nueva Discapacidad</h2>
        <p className='text-md text-gray-700'>Ingrese el nombre del tipo de discapacidad que desea agregar</p>
        <form onSubmit={(e) => onSubmit(e)}>
            <div className='flex flex-col mt-3'>
                <label htmlFor="nombre" className='text-sm font-semibold'>Nombre</label>
                <input className='border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500' type="text" placeholder='Ej: Retraso madurativo' onChange={(e) => setNombre(e.target.value)} />
            </div>
            <div className='text-white font-semibold flex gap-2 justify-end mt-4'>
                <button className='bg-red-700 py-2 px-4 gap-1 rounded-lg hover:bg-red-800 transition-colors cursor-pointer' onClick={() => dispatch(cerrarModal())}>Cancelar</button>
                <button className='bg-indigo-600 py-2 px-4 gap-1 rounded-lg hover:bg-indigo-700 transition-colors cursor-pointer' >Agregar</button>
            </div>
        </form>
    </>
  )
}
