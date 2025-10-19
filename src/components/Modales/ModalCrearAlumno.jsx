import { PlusIcon, XMarkIcon } from "@heroicons/react/16/solid";
import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { AlumnoInputs } from "./alumno/AlumnoInputs";
import { DiscapacidadesInputs } from "./alumno/DiscapacidadesInputs";
import { InfoGradoInputs } from "./alumno/InfoGradoInputs";
import { useDispatch, useSelector } from "react-redux";
import { listarTutores } from "../../reducers/tutoresSlice";
import { TutorInputs } from "../tutores/TutorInputs";
import { CardsTutor } from "./tutor/CardsTutor";
import { showAlert } from "../../utils/alert";

export const ModalCrearAlumno = () => {
  const {tutores} = useSelector((state) => state.tutores)
  const [tutoresSeleccionados, setTutoresSeleccionados] = useState([]);
  const token = localStorage.getItem('token');
  const dispatch = useDispatch()
  const [vista, setVista] = useState('')
  const methods = useForm();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = methods;

  useEffect(() => {
    dispatch(listarTutores({token}))
  }, [])
  useEffect(() => {
    setValue("idTutores", tutoresSeleccionados);
  }, [tutoresSeleccionados]);

  // Esto guarda el id nomas para mandarlo al backend
  const onAgregarTutor = async (e, idTutor) => {
    e.preventDefault();
    try {
      setTutoresSeleccionados(prev => prev.includes(idTutor) ? prev : [...prev, idTutor])
    } catch (error) {
      showAlert({
        title: "Error",
        text: error.message || "Ocurrió un error al asignar el tutor",
        icon: "error",
      });
    }
  };

  const onSubmit = (data) => {
    // console.log("el console: ", getValues('is_discapacidad'), "-", getFieldState('is_discapacidad'))
    console.log(data);
  };
  return (
    <>
      <FormProvider {...methods}>
        <div>
          <h3 className="font-semibold">Nuevo Alumno</h3>
          <p className="text-sm">
            Completa los siguientes campos para registrar un nuevo alumno
          </p>

          <form
            className="mt-5 grid md:grid-cols-2 gap-3.5"
            onSubmit={handleSubmit(onSubmit)}
          >
            <AlumnoInputs />
            <DiscapacidadesInputs />
            <InfoGradoInputs />

            <div className="col-span-2">
              <div className="bg-indigo-600 px-2 py-1 rounded-lg flex justify-between mb-4">
                <button
                  className={`px-2 py-1 rounded-lg text-white font-semibold hover:cursor-pointer hover:bg-indigo-700 transition-colors w-full ${
                    vista == "buscar" ? "bg-indigo-800" : ""
                  }`}
                  onClick={() => setVista("buscar")} type="button">
                  Buscar Tutor
                </button>
                <button
                  className={`px-2 py-1 rounded-lg text-white font-semibold hover:cursor-pointer hover:bg-indigo-700 transition-colors w-full ${
                    vista == "crear" ? "bg-indigo-800" : ""
                  }`}
                  onClick={() => setVista("crear")} type="button">
                  Crear Nuevo
                </button>
              </div>

              {vista == "buscar" && <CardsTutor onAgregarTutor={onAgregarTutor} />}
              {vista == "crear" && <TutorInputs />}
            </div>
            
            <div className="flex flex-wrap gap-2 col-span-2">
              {tutores.map((tutor, idx) => {
                if (tutoresSeleccionados.includes(tutor.id)) {
                  return (
                    <button className="bg-indigo-600 flex justify-between px-2 py-1 rounded-lg text-white font-semibold text-xs gap-2 hover:cursor-pointer hover:bg-indigo-700 transition-colors" key={idx} onClick={() => setTutoresSeleccionados(prev => prev.filter(id => id != tutor.id))}>
                      <p>{`${tutor.nombre} ${tutor.apellido}`}</p>
                      <XMarkIcon className="h-4 w-4" />
                    </button>
                  )
                }
              })}
            </div>

            <button className="px-2 py-1 bg-indigo-600 rounded-lg shadow-md text-white font-semibold hover:cursor-pointer col-span-2 hover:bg-indigo-700 transition-colors">
              Enviar
            </button>
          </form>
        </div>
      </FormProvider>
    </>
  );
};
