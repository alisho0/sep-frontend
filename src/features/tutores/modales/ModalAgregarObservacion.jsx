import { jwtDecode } from 'jwt-decode';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux'
import { crearObservacion } from '../../../reducers/observacionesSlice';
import { showAlert } from '../../../utils/alert';
import { cerrarModal } from '../../../reducers/uiSlice';

export const ModalAgregarObservacion = () => {

    const dispatch = useDispatch();
    const { modalData } = useSelector((state) => state.ui);
    const { registro } = useSelector((state) => state.registros);
    const { observacion, loading, error } = useSelector((state) => state.observaciones)
    const {
        register,
        handleSubmit,
        watch,
        formState: {errors},
    } = useForm();

    const token = localStorage.getItem('token');
    const payload = jwtDecode(token); 

    const today = new Date();
    const formattedDate = `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}`;

    const onSubmit = async (data) => {
        try {
            const resultAction = await dispatch(crearObservacion({obs: data, registroId: registro.id}));
            if (crearObservacion.fulfilled.match(resultAction)) {
                showAlert({
                    title: 'Observación creada',
                    text: 'La observación fue creada correctamente',
                    icon: 'success'
                });
                dispatch(cerrarModal())
            } else if (crearObservacion.rejected.match(resultAction)) {
                throw new Error(resultAction.error.message);
            }
        } catch (error) {
            showAlert({
                title: 'Error',
                text: error.message || 'Ocurrió un error al crear la observación',
                icon: 'error'
            });
        }
    };
  return (
    <>
        <div>
            <div>
                <h3 className='text-lg font-semibold'>Registrar Observación</h3>
                <p className='text-sm text-gray-600'>Agrega una nueva observación para {`${modalData.nombre} ${modalData.apellido}`}</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='flex flex-col gap-1 my-4'>
                    <label htmlFor="observacion">Descripción:</label>
                    <textarea className='border border-gray-300 rounded-md p-2' id="observacion" rows="4" {...register("contenido", {required: true})} />
                    {errors.contenido && <span className='text-xs text-red-700'>Este campo es obligatorio</span> }
                    <input
                        type="hidden"
                        value={formattedDate}
                        {...register("fecha")}
                    />
                    <input
                        type="hidden"
                        value={payload.sub}
                        {...register("nombreUsuario")}
                    />
                    <input
                        type="hidden"
                        value={registro.id}
                        {...register("idRegistro")}
                    />
                </div>
                <div>
                    <p className='text-sm text-gray-600'>Fecha: {new Date().toLocaleDateString()}</p>
                    <p className='text-sm text-gray-600'>Usuario: {payload.sub}</p>
                </div>

                <div className='flex justify-end mt-4'>
                    <button className='w-full bg-indigo-600 text-white px-4 py-1 font-semibold rounded-md hover:bg-indigo-700 hover:cursor-pointer transition-all delay-75'>Registrar Observación</button>
                </div>
            </form>
        </div>
    </>
  )
}
