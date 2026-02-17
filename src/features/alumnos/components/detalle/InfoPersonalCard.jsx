import { ExclamationCircleIcon, PencilIcon } from "@heroicons/react/24/outline";
import { BotonIcono } from "../../../../utils/components/BotonIcono";
import { useDispatch } from "react-redux";
import { abrirModal } from "../../../../reducers/uiSlice";

export const InfoPersonalCard = ({ persona, isAlumno }) => {

    const dispatch = useDispatch();
    // Usar las discapacidades del alumno, no el catálogo global
    const discapacidades = persona?.discapacidades || [];

  return (
    <>
      <div className="bg-white p-6 rounded-lg shadow-md border-gray-300 md:col-span-2">
        <div className="flex flex-row justify-between items-center">
          <div>
            <h3 className="text-md font-semibold">Información Personal</h3>
            <p className="text-gray-600 text-sm">
              Datos del {isAlumno ? "alumno" : "tutor"}
            </p>
          </div>
          {isAlumno && <BotonIcono Icono={PencilIcon} onClick={() => dispatch(abrirModal({
            modalAbierto: true,
            tipo: 'editarAlumno',
            data: persona
          }))} className="bg-indigo-600 text-white hover:bg-indigo-700" />}
        </div>
        <div className={`grid md:grid-cols-2 gap-6 mt-6 ${!isAlumno ? "md:grid-cols-3" : ""}`}>
          <div>
            <label className="text-sm font-medium text-gray-600">
              Nombre Completo
            </label>
            <p className="font-medium">{`${persona?.nombre || ""} ${
              persona?.apellido || ""
            }`}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-600">DNI</label>
            <p className="font-medium">{persona?.dni || ""}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-600">
              Domicilio
            </label>
            <p className="font-medium">{persona?.domicilio || "S/D"}</p>
          </div>

          {isAlumno ? (
            <div className="bg-amber-500/10 col-span-2 p-3 rounded-lg text-white border border-amber-500/20">
              <div className="flex gap-2 items-center text-amber-500 mb-2">
                <ExclamationCircleIcon className="w-5 h-5" />
                <h3 className="font-semibold">Discapacidades Registradas</h3>
              </div>
              <div className="flex gap-1">
                {Array.isArray(discapacidades) && discapacidades.length > 0 ? (
                  discapacidades.map((d, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 font-semibold bg-amber-500/20 border-amber-500/40 text-amber-700 rounded-xl text-sm border"
                    >
                      {d.nombre}
                    </span>
                  ))
                ) : (
                  <span className="italic  text-amber-700 text-sm">
                    No hay discapacidades registradas
                  </span>
                )}
              </div>
              {persona?.detalleDiscap && (
                <div className="bg-gray-800 p-2 mt-4 rounded-lg border border-gray-700">
                  <h4 className="font-semibold">Descripción adicional</h4>
                  <p className="text-sm italic">
                    {persona?.detalleDiscap || "No hay detalle registrado"}
                  </p>
                </div>
              )}
            </div>
          ) : (
            <>
            <div>
              <label className="text-sm font-medium text-gray-600">
                Teléfono
              </label>
              <p className="font-medium">{persona?.telefono || ""}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">
                Teléfono auxiliar
              </label>
              <p className="font-medium">{persona?.telAux || "Sin teléfono auxiliar"}</p>
            </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};
