import { useDispatch, useSelector } from 'react-redux'
import { cerrarModal } from '../../reducers/uiSlice';
import { ModalAgregarObservacion } from './ModalAgregarObservacion' 
import { XMarkIcon } from '@heroicons/react/16/solid';
import { ModalAgregarTutor } from './ModalAgregarTutor';
import { ModalCrearAlumno } from './ModalCrearAlumno';
 
export const ModalGlobal = () => {
    const dispatch = useDispatch();

    const { modalAbierto, modalTipo, modalData } = useSelector((state) => state.ui);
    

    if (!modalAbierto) return null;

  return (
    <>
        <div className="fixed inset-0 flex items-start sm:items-center justify-center bg-black/40 p-4 overflow-y-auto">
          <div className="bg-white rounded-lg shadow-lg relative w-full max-w-2xl max-h-[90vh] overflow-y-auto my-8">
              <button className='absolute right-4 top-4 hover:cursor-pointer z-10' onClick={() => dispatch(cerrarModal())}>
                <XMarkIcon className='h-6 w-6 text-gray-500' />
              </button>
              <div className="p-6">
                {modalTipo === "agregarObservacion" && <ModalAgregarObservacion /> }
                {modalTipo === "agregarTutor" && <ModalAgregarTutor tutores={modalData} />}
                {modalTipo === "crearAlumno" && <ModalCrearAlumno />}
              </div>
          </div>
        </div>
    </>
  )
}
