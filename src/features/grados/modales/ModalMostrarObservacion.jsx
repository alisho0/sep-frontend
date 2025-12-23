export const ModalMostrarObservacion = ({ data }) => {
  return (
    <>
      <div className="mb-3">
        <h2 className="font-semibold text-xl">Detalle de la Observación</h2>
        <p className="text-sm italic text-gray-800">
          Descripción completa de la observación.
        </p>
      </div>
      <div>
        <p className="border-b border-gray-300 pb-2">{data.contenido}</p>
        <div className="mt-2 text-sm text-gray-800 italic">
          <p>
            <span className="font-semibold">Usuario: </span>
            {data.nombreUsuario}
          </p>
          <p>
            <span className="font-semibold">Fecha: </span>
            {data.fecha}
          </p>
        </div>
      </div>
    </>
  );
};
