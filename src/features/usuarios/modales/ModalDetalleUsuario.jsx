import React from "react";
import { useDispatch, useSelector } from "react-redux";

export const ModalDetalleUsuario = () => {
  const dispatch = useDispatch();
  const { modalData } = useSelector((state) => state.ui);

  return (
    <>
        <div className="mb-3">
            <h2 className="font-semibold text-xl">Detalle del Usuario</h2>
            <p className="text-sm italic text-gray-800">Toda la información sobre el usuario {modalData.username}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
            <div>
                <span className=" italic text-gray-800 text-sm">Nombre</span>
                <p className="font-semibold">{modalData.nombre}</p>
            </div>
            <div>
                <span className=" italic text-gray-800 text-sm">Apellido</span>
                <p className="font-semibold">{modalData.apellido}</p>
            </div>
            <div>
                <span className=" italic text-gray-800 text-sm">Nombre de usuario / Correo</span>
                <p className="font-semibold">{modalData.username}</p>
            </div>
            <div>
                <span className=" italic text-gray-800 text-sm">Documento</span>
                <p className="font-semibold">{modalData.dni}</p>
            </div>
            <div>
                <span className=" italic text-gray-800 text-sm">Domicilio</span>
                <p className="font-semibold">{modalData.domicilio}</p>
            </div>
            <div>
                <span className=" italic text-gray-800 text-sm">Rol</span>
                <p className="font-semibold">{modalData.rol}</p>
            </div>
        </div>
    </>
  );
};
