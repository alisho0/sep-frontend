import React, { useEffect } from "react";
import { CardMetrica } from "../../../utils/components/CardMetrica";
import {
  ArrowLeftIcon,
  ExclamationTriangleIcon,
  EyeIcon,
  UserMinusIcon,
  UsersIcon,
} from "@heroicons/react/16/solid";
import { useDispatch, useSelector } from "react-redux";
import { detalleCiclo } from "../../../reducers/gradosSlice";
import { Link, useNavigate, useParams } from "react-router-dom";
import { BotonIcono } from "../../../utils/components/BotonIcono";
import { ObservacionesGrado } from "../components/ObservacionesGrado";
import { UsuariosGrado } from "../components/UsuariosGrado";
import { metricasPorCicloDetalle } from "../../../reducers/metricasSlice";

export const GradoCicloDetalle = () => {
  const { cicloGradoActual } = useSelector((state) => state.grados);
  const { metricasCicloDetalle } = useSelector((state) => state.metricas);
  const dispatch = useDispatch();
  const { cicloId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(detalleCiclo(cicloId));
    dispatch(metricasPorCicloDetalle(cicloId));
  }, [cicloId]);
  return (
    <>
      <section className="container mx-auto md:px-28 px-4 pt-9">
        <div className="flex gap-3 items-center mb-4">
          <BotonIcono
            Icono={ArrowLeftIcon}
            texto={"Volver"}
            onClick={() => navigate(-1)}
            className="hover:bg-indigo-700 hover:text-white text-black"
          />
          <div>
            <h1 className="text-3xl font-semibold">
              {cicloGradoActual.grado}° Grado | Sección{" "}
            </h1>
            <p className="text-gray-700">Ciclo {cicloGradoActual.ciclo}</p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 mb-3">
          <CardMetrica
            texto={metricasCicloDetalle[0].nombre}
            Icono={UsersIcon}
            data={metricasCicloDetalle[0].valor}
          />
          <CardMetrica
            texto={metricasCicloDetalle[1].nombre}
            Icono={ExclamationTriangleIcon}
            data={metricasCicloDetalle[1].valor}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
          <UsuariosGrado />
          <ObservacionesGrado />
        </div>

        <div className="rounded-lg shadow-lg px-4 py-3 bg-white">
          <div className="flex gap-2 items-center font-semibold text-xl mb-3">
            <UsersIcon className="h-5 w-5" />
            <p>Alumnos Inscriptos</p>
          </div>
          <div>
            <div className="border rounded-lg bg-gray-100 p-3 mb-4 flex md:justify-between md:items-center md:flex-row flex-col shadow-md">
              <div>
                <h4 className="font-semibold text-lg">Emily Catán</h4>
                <p className="text-gray-700">44111000</p>
              </div>
              <div className="flex md:flex-row flex-col md:mt-0 mt-2 gap-2">
                <Link className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 transition-colors text-white font-semibold rounded-lg cursor-pointer">
                  <BotonIcono
                    Icono={EyeIcon}
                    className="w-full justify-center"
                  />
                </Link>
                <BotonIcono
                  onClick={() => handleDeleteCiclo(ciclo.id)}
                  Icono={UserMinusIcon}
                  className="bg-indigo-600 text-white hover:bg-red-700 justify-center"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
