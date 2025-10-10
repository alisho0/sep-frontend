import { jwtDecode } from 'jwt-decode';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux'

export const ModalAgregarObservacion = () => {

    const dispatch = useDispatch();
    const { modalData } = useSelector((state) => state.ui);
    const { registro } = useSelector((state) => state.registros);
    const {
        register,
        handleSubmit,
        watch,
        formState: {errors},
    } = useForm();

    const onSubmit = (data) => console.log(data);
    console.log(watch("descripcion"))

    const token = localStorage.getItem('token');
    const payload = jwtDecode(token); 
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
                    <textarea className='border border-gray-300 rounded-md p-2' id="observacion" rows="4" {...register("descripcion")} />
                    <input
                        type="hidden"
                        value={new Date().toLocaleDateString()}
                        {...register("fecha")}
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
