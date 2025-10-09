import { useParams } from "react-router-dom";
import { TutoresCard } from "../components/Alumnos/Detalle/TutoresCard";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { traerPorAlumnoId } from "../reducers/alumnosSlice";
import { aniosRegistros, detalleRegistro } from "../reducers/registrosSlice";
import { InfoPersonalCard } from "../components/Alumnos/Detalle/InfoPersonalCard";
import { RegistroCard } from "../components/Alumnos/Detalle/RegistroCard";

export const DetalleAlumno = () => {
  const { id } = useParams();
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const { alumno, loading } = useSelector((state) => state.alumnos);
  const { aniosDisponibles, registro } = useSelector(
    (state) => state.registros
  );

  useEffect(() => {
    dispatch(traerPorAlumnoId({ id, token }));
    dispatch(aniosRegistros({ id, token }));
  }, []);

  useEffect(() => {
    if (aniosDisponibles && aniosDisponibles.length > 0) {
      dispatch(detalleRegistro({ token, id: aniosDisponibles[0].id }));
    }
  }, [aniosDisponibles, token]);

  return (
    <>
      <div className="container mx-auto px-4 pt-9 grid md:grid-cols-3 grid-cols-1 gap-6">
        {loading ? (
          <p>Cargando...</p>
        ) : (
          <>
            <InfoPersonalCard />
            <div className="bg-white p-6 rounded-lg shadow-md border-gray-300">
              <div>
                <h3 className="text-md font-semibold">Tutores</h3>
                <p className="text-gray-600 text-sm">
                  1 tutor(es) registrado(s)
                </p>
              </div>
              <div className="overflow-y-auto max-h-48">
                <TutoresCard />
              </div>
            </div>
          </>
        )}
        {/* Registro de Años */}
        <RegistroCard />
      </div>
    </>
  );
};
