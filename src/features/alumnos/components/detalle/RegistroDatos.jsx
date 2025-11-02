import React from 'react'

export const RegistroDatos = ({registro}) => {
  return (
    <>
      <div className="grid md:grid-cols-4 grid-cols-2 gap-6 mt-4">
        <div>
          <label className="text-sm font-medium text-gray-600">Grado</label>
          <p className="font-medium ">{`${registro?.nroGrado || "-"}° ${
            registro?.seccion || "-"
          }`}</p>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-600">Turno</label>
          <p className="font-medium">{`${registro?.turno || "-"}`}</p>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-600">
            Año lectivo
          </label>
          <p className="font-medium">{`${registro?.anioCiclo || "-"}`}</p>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-600 py-1">
            Fecha de registro
          </label>
          <p className="font-medium">{`${registro.fechaInicio || "-"}`}</p>
        </div>
      </div>
    </>
  )
}
