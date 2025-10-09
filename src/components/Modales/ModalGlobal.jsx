import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { cerrarModal } from '../../reducers/uiSlice';

export const ModalGlobal = () => {
    const dispatch = useDispatch();
    const { modalAbierto, modalTipo, modalData } = useSelector((state) => state.ui);

    if (!modalAbierto) return null;

  return (
    <>
        <div className="fixed inset-0 flex items-center justify-center bg-black/40">
        <div className="bg-white p-6 rounded-lg shadow-lg">
            {modalTipo === "detalleAlumno" && (
            <>
                <h2>Detalle de {modalData.nombre}</h2>
                <p>DNI: {modalData.dni}</p>
            </>
            )}
            {modalTipo === "confirmacion" && <p>¿Seguro que querés continuar?</p>}
            <button onClick={() => dispatch(cerrarModal())}>Cerrar</button>
        </div>
        </div>
    </>
  )
}
