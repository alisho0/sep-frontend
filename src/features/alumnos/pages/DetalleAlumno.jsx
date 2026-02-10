import { useNavigate, useParams } from "react-router-dom";
import { TutoresCard } from "../components/detalle/TutoresCard";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { traerPorAlumnoId } from "../../../reducers/alumnosSlice";
import { aniosRegistros, detalleRegistro } from "../../../reducers/registrosSlice";
import { InfoPersonalCard } from "../components/detalle/InfoPersonalCard";
import { RegistroCard } from "../components/detalle/RegistroCard";
import { ArrowLeftIcon, UserPlusIcon } from "@heroicons/react/16/solid";
import { abrirModal } from "../../../reducers/uiSlice";
import { listarTutores, listarTutoresPorAlumno } from "../../../reducers/tutoresSlice";

export const DetalleAlumno = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { alumno, loading } = useSelector((state) => state.alumnos);
  const { tutores, tutoresAlumno, tutoresAlumnoCount } = useSelector((state) => state.tutores);
  const { aniosDisponibles, registro } = useSelector(
    (state) => state.registros
  );

  useEffect(() => {
    dispatch(traerPorAlumnoId({ id }));
    dispatch(aniosRegistros({ id }));
    dispatch(listarTutores());
    dispatch(listarTutoresPorAlumno({id}));
  }, []);

  useEffect(() => {
    if (aniosDisponibles && aniosDisponibles.length > 0) {
      dispatch(detalleRegistro({ id: aniosDisponibles[0].id }));
    }
  }, [aniosDisponibles]);

  return (
    <>
      <div className="container mx-auto px-4 pt-9 pb-14 grid md:grid-cols-3 grid-cols-1 gap-6">
        {loading ? (
          <p>Cargando...</p>
        ) : (
          <>
            <button className="col-span-1 md:col-span-3 text-left flex gap-2 items-center hover:bg-indigo-700 hover:text-white w-fit py-1 px-2 rounded-lg transition-colors" onClick={() => navigate(-1)}>
              <ArrowLeftIcon className="w-5 h-5"/>
              <span className="font-semibold">Volver a Alumnos</span>
            </button>
            <InfoPersonalCard />
            <div className="bg-white p-6 rounded-lg shadow-md border-gray-300">
              <div>
                <div className="flex justify-between">
                  <h3 className="text-md font-semibold">Tutores</h3>
                  <button className="bg-indigo-600 rounded-lg px-2 py-1 hover:bg-indigo-700 transition-colors hover:cursor-pointer" onClick={() => dispatch(abrirModal({ modalAbierto: true, tipo: 'agregarTutor', data: tutores }))}>
                    <UserPlusIcon className="h-4 w-4 text-white"/>
                  </button>
                </div>
                <p className="text-gray-600 text-sm">
                  {tutoresAlumnoCount} tutor(es) registrado(s)
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
