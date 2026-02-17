import { FormProvider, useForm, useFormContext } from "react-hook-form"
import { AlumnoInputs } from "../modales/AlumnoInputs"
import { DiscapacidadesInputsEdit } from "./DiscapacidadesInputsEdit";
import { BotonIcono } from "../../../../utils/components/BotonIcono";
import { useEffect } from "react";
import { FolderIcon } from "@heroicons/react/24/outline";
import { alumnoEditarSchema } from "../../../../validation/alumnoSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { confirmationAlert, showAlert } from "../../../../utils/alert"
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { editarAlumno } from "../../../../reducers/alumnosSlice";
import { cerrarModal } from "../../../../reducers/uiSlice";

export const ModalEditarAlumno = () => {
  const dispatch = useDispatch();
  const { modalData} = useSelector((state) => state.ui);
  const methods = useForm({
    resolver: zodResolver(alumnoEditarSchema)
  });
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
    unregister
  } = methods;

  useEffect(() => {
    unregister("tutores");
  }, [methods])

  const handleEditarAlumno = (data) => {
    confirmationAlert({
      title: "¿Confirmar edición?",
      text: "¿Estás seguro de que deseas guardar los cambios en este alumno?",
      confirmButtonText: "Sí, guardar cambios",
      cancelButtonText: "No, cancelar",
    }).then(async (res) => {
      if (res.isConfirmed) {
        try {
          await dispatch(editarAlumno({id: modalData.id, alumno: data})).unwrap();
          
          showAlert({
            title: "Alumno editado",
            text: "Los cambios en el alumno se han guardado correctamente.",
            icon: "success",
            confirmButtonText: "Aceptar"
          })
          dispatch(cerrarModal())
        } catch (error) {
          new Error(error.response?.data || "Error al editar el alumno, intentalo de nuevo.")
          showAlert({
            title: "Error al editar el alumno",
            text: error.message || "Error al editar el alumno, intentalo de nuevo.",
            icon: "error",
            confirmButtonText: "Aceptar"
          })
        }
      }
    })
  }

  return (
    <FormProvider {...methods}>
        <div className="mb-6">
          <h3 className="font-semibold text-xl">Editar Alumno</h3>
          <p className="text-sm">
            Completa los siguientes campos para editar un alumno existente
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <AlumnoInputs />
            <DiscapacidadesInputsEdit />
        </div>
        <BotonIcono Icono={FolderIcon} texto={"Guardar cambios"} className="bg-indigo-600 text-white hover:bg-indigo-700 mt-5 " onClick={handleSubmit(handleEditarAlumno)}/>
    </FormProvider>
  )
}
