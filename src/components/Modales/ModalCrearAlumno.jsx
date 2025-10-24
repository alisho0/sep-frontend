import { PlusIcon, XMarkIcon } from "@heroicons/react/16/solid";
import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { AlumnoInputs } from "./alumno/AlumnoInputs";
import { DiscapacidadesInputs } from "./alumno/DiscapacidadesInputs";
import { InfoGradoInputs } from "./alumno/InfoGradoInputs";
import { useDispatch, useSelector } from "react-redux";
import { listarTutores } from "../../reducers/tutoresSlice";
import { CardsTutor } from "./tutor/CardsTutor";
import { showAlert } from "../../utils/alert";
import { TutorCrearConId } from "./alumno/TutorCrearConId";

export const ModalCrearAlumno = () => {
  const { tutores } = useSelector((state) => state.tutores);
  const [tutoresSeleccionados, setTutoresSeleccionados] = useState([]);
  const dispatch = useDispatch();
  const [vista, setVista] = useState("");
  const methods = useForm();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = methods;

  useEffect(() => {
    dispatch(listarTutores());
  }, []);
  useEffect(() => {
    setValue("tutoresIds", tutoresSeleccionados);
  }, [tutoresSeleccionados]);

  // Esto guarda el id nomas para mandarlo al backend
  const onAgregarTutor = async (e, idTutor) => {
    e.preventDefault();
    try {
      setTutoresSeleccionados((prev) =>
        prev.includes(idTutor) ? prev : [...prev, idTutor]
      );
    } catch (error) {
      showAlert({
        title: "Error",
        text: error.message || "Ocurrió un error al asignar el tutor",
        icon: "error",
      });
    }
  };

  const onSubmit = async (data) => {
    if (
      data.tutoresIds.length == 0 ||
      (data.discapacidad && data.discapacidadesSeleccionadas == 0)
    ) {
      showAlert({
        title: "Error",
        text: "Debes agregar al menos un tutor y una discapacidad si el alumno posee discapacidades",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
      return;
    }

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

          <div className="mt-5 grid md:grid-cols-2 gap-3.5">
            <AlumnoInputs />
            <DiscapacidadesInputs />
            <InfoGradoInputs />

            <div className="col-span-2">
              <div className="bg-indigo-600 px-2 py-1 rounded-lg flex justify-between mb-4">
                <button
                  type="button"
                  className={`px-2 py-1 rounded-lg text-white font-semibold hover:cursor-pointer hover:bg-indigo-700 transition-colors w-full ${
                    vista === "buscar" ? "bg-indigo-800" : ""
                  }`}
                  onClick={() => setVista("buscar")}
                >
                  Buscar Tutor
                </button>
                <button
                  type="button"
                  className={`px-2 py-1 rounded-lg text-white font-semibold hover:cursor-pointer hover:bg-indigo-700 transition-colors w-full ${
                    vista === "crear" ? "bg-indigo-800" : ""
                  }`}
                  onClick={() => setVista("crear")}
                >
                  Crear Nuevo
                </button>
              </div>

              {vista === "buscar" && (
                <CardsTutor onAgregarTutor={onAgregarTutor} />
              )}
              {vista === "crear" && <TutorCrearConId setTutoresSeleccionados={setTutoresSeleccionados} />}
            </div>

            <div className="flex flex-wrap gap-2 col-span-2">
              {tutores.map((tutor, idx) => {
                if (tutoresSeleccionados.includes(tutor.id)) {
                  return (
                    <button
                      className="bg-indigo-600 flex justify-between px-2 py-1 rounded-lg text-white font-semibold text-xs gap-2 hover:cursor-pointer hover:bg-indigo-700 transition-colors"
                      key={idx}
                      onClick={() =>
                        setTutoresSeleccionados((prev) =>
                          prev.filter((id) => id != tutor.id)
                        )
                      }
                    >
                      <p>{`${tutor.nombre} ${tutor.apellido}`}</p>
                      <XMarkIcon className="h-4 w-4" />
                    </button>
                  );
                }
              })}
            </div>

            <button
              type="button"
              onClick={handleSubmit(onSubmit)}
              className="px-2 py-1 bg-indigo-600 rounded-lg shadow-md text-white font-semibold hover:cursor-pointer col-span-2 hover:bg-indigo-700 transition-colors"
            >
              Enviar
            </button>
          </div>
        </div>
      </FormProvider>
    </>
  );
};
