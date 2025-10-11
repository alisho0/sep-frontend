import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { cerrarModal } from '../../reducers/uiSlice';
import { ModalAgregarObservacion } from './ModalAgregarObservacion' 
import { XMarkIcon } from '@heroicons/react/16/solid';
import { ModalAgregarTutor } from './ModalAgregarTutor';
export const ModalGlobal = () => {
    const dispatch = useDispatch();

    const { modalAbierto, modalTipo, modalData } = useSelector((state) => state.ui);
    

    if (!modalAbierto) return null;

  return (
    <>
        <div className="fixed inset-0 flex items-center justify-center bg-black/40">
          <div className="bg-white p-6 rounded-lg shadow-lg relative">
              <button className='absolute right-4 hover:cursor-pointer' onClick={() => dispatch(cerrarModal())}>
                <XMarkIcon className='h-6 w-6 text-gray-500' />
              </button>
              {modalTipo === "agregarObservacion" && <ModalAgregarObservacion /> }
              {modalTipo === "agregarTutor" && <ModalAgregarTutor tutores={modalData} />}
          </div>
        </div>
    </>
  )
}
