import { useDispatch, useSelector } from 'react-redux'
import { cerrarModal } from '../../reducers/uiSlice';
import { ModalAgregarObservacion } from '../../features/tutores/modales/ModalAgregarObservacion' 
import { XMarkIcon } from '@heroicons/react/16/solid';
import { ModalAgregarTutor } from '../../features/tutores/modales/ModalAgregarTutor';
import { ModalCrearAlumno } from '../../features/alumnos/components/modales/ModalCrearAlumno';
import { ModalCrearDiscapacidad } from '../../features/discapacidad/modales/ModalCrearDiscapacidad';
import { ModalCrearCiclo } from '../../features/grados/modales/ModalCrearCiclo';
import { ModalAgregarMaestro } from '../../features/maestros/modales/ModalAgregarMaestro';
import { ModalAgregarObservacionGrado } from '../../features/grados/modales/ModalAgregarObservacionGrado';
 
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
                {modalTipo === "crearDiscapacidad" && <ModalCrearDiscapacidad/>}
                {modalTipo === "crearCiclo" && <ModalCrearCiclo />}
                {modalTipo === "agregarMaestro" && <ModalAgregarMaestro modalData={modalData} />}
                {modalTipo === "agregarObservacionGrado" && <ModalAgregarObservacionGrado />}
              </div>
          </div>
        </div>
    </>
  )
}
