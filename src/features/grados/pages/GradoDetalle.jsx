import React from "react";

export const GradoDetalle = () => {
  return (
    <>
              <div className="flex gap-2">
                <BotonIcono texto={"Nuevo Ciclo"} onClick={() => dispatch(abrirModal( { tipo: "crearCiclo", data: { id: g.id, grado: g.grado }}))} />
                <BotonIcono
                  Icono={TrashIcon}
                  className="hover:bg-red-700 justify-center"
                />
              </div>
      {/* Aqui van los ciclos */}
      {g.ciclos.length > 0 ? (
        <div>
          <p className="font-semibold mb-1.5 text-gray-700">
            Ciclos disponibles:
          </p>
          <div className="md:flex gap-2">
            {g.ciclos.map((c, idx) => (
              <Link to={`/grados/${c.id}`} className="block w-full" key={idx}>
                <div className="border border-gray-500 rounded-lg bg-gray-200 p-3 hover:bg-gray-300 transition-colors mb-2 ">
                  <div className="flex justify-between mb-2 gap-7">
                    <h4 className="font-semibold text-lg">Ciclo {c.anio}</h4>
                    <ChevronRightIcon className="h-6 w-6" />
                  </div>
                  <p className="text-gray-700">{c.cantAlumnos} alumnos</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ) : (
        <p className="text-gray-500 italic">No hay ciclos disponibles.</p>
      )}
    </>
  );
};
