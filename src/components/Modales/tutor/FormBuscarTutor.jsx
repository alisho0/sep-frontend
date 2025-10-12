import React from "react";

export const FormBuscarTutor = ({tutores}) => {
  return (
    <>
      <div className="flex flex-col">
        <h3 className="text-sm font-semibold">
          Buscar por nombre, apellido o DNI
        </h3>
        <input
          type="text"
          className="border border-gray-300 rounded-md p-2"
          placeholder="Escribe para buscar..."
        />
      </div>

      <div className="overflow-y-scroll">
        {tutores.map((tutor, idx) => (
          <div
            className="mt-6  border border-gray-400 p-4 rounded-lg bg-gray-100 hover:bg-gray-300 transition-colors"
            key={idx}
          >
            <div className="flex flex-col md:flex-row justify-between gap-4">
              <div>
                <h3 className="text-md font-medium mb-2">{`${tutor.nombre} ${tutor.apellido}`}</h3>
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">DNI: </span>
                  {tutor.dni}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">Domicilio: </span>
                  {tutor.domicilio}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">Teléfono: </span>
                  {tutor.telefono}
                </p>
                {tutor.telAux && (
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold">Tel. Aux: </span>
                    {tutor.telAux}
                  </p>
                )}
              </div>
              <div>
                <button className="bg-indigo-600 rounded-lg shadow-md text-white py-1.5 px-2 hover:cursor-pointer hover:bg-indigo-700 transition-colors font-semibold md:w-fit w-full">
                  Seleccionar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
