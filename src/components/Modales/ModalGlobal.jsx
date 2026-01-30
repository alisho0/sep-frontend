import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useRef, useState } from 'react';
import { cerrarModal } from '../../reducers/uiSlice';
import { ModalAgregarObservacion } from '../../features/tutores/modales/ModalAgregarObservacion' 
import { XMarkIcon } from '@heroicons/react/16/solid';
import { ModalAgregarTutor } from '../../features/tutores/modales/ModalAgregarTutor';
import { ModalCrearAlumno } from '../../features/alumnos/components/modales/ModalCrearAlumno';
import { ModalCrearDiscapacidad } from '../../features/discapacidad/modales/ModalCrearDiscapacidad';
import { ModalCrearCiclo } from '../../features/grados/modales/ModalCrearCiclo';
import { ModalAgregarMaestro } from '../../features/maestros/modales/ModalAgregarMaestro';
import { ModalAgregarObservacionGrado } from '../../features/grados/modales/ModalAgregarObservacionGrado';
import { ModalCrearRegistro } from '../../features/alumnos/components/modales/ModalCrearRegistro';
import { ModalMostrarObservacion } from '../../features/grados/modales/ModalMostrarObservacion';
import { ModalCrearUsuario } from '../../features/usuarios/modales/ModalCrearUsuario';
import { ModalEditarUsuario } from '../../features/usuarios/modales/ModalEditarUsuario';
import { ModalDetalleUsuario } from '../../features/usuarios/modales/ModalDetalleUsuario';
import { ModalAgregarAlumno } from '../../features/grados/modales/ModalAgregarAlumno';
 
export const ModalGlobal = () => {
    const dispatch = useDispatch();
    const { modalAbierto, modalTipo, modalData } = useSelector((state) => state.ui);
    const [show, setShow] = useState(false);
    const [leaving, setLeaving] = useState(false);
    const timeoutRef = useRef(null);

    useEffect(() => {
      if (modalAbierto) {
        setShow(true);
        setLeaving(false);
      } else {
        setShow(false);
      }
      return () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
      };
    }, [modalAbierto]);

    const handleClose = () => {
      setLeaving(true);
      timeoutRef.current = setTimeout(() => {
        dispatch(cerrarModal());
      }, 250); // Debe coincidir con la duración de la animación
    };

    if (!modalAbierto && !show) return null;

    return (
      <>
        <div
          className={`fixed inset-0 flex items-start sm:items-center justify-center bg-black/40 p-4 overflow-y-auto transition-opacity duration-300 ${leaving ? 'opacity-0' : 'opacity-100'}`}
          onClick={handleClose}
        >
          <div
            className={`bg-white rounded-lg shadow-lg relative w-full max-w-2xl max-h-[90vh] overflow-y-auto my-8 transition-all duration-300 ease-in-out transform ${leaving ? 'scale-95 opacity-0' : 'scale-100 opacity-100'}`}
            onClick={(e) => e.stopPropagation()}
          >
            <button className='absolute right-4 top-4 hover:cursor-pointer z-10' onClick={handleClose}>
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
              {modalTipo === "crearRegistro" && <ModalCrearRegistro />}
              {modalTipo === "mostrarObservacion" && <ModalMostrarObservacion data={modalData} />}
              {modalTipo === "crearUsuario" && <ModalCrearUsuario />}
              {modalTipo === "editarUsuario" && <ModalEditarUsuario />}
              {modalTipo === "detalleUsuario" && <ModalDetalleUsuario />}
              {modalTipo === "agregarAlumno" && <ModalAgregarAlumno />}
            </div>
          </div>
        </div>
      </>
    );
}
