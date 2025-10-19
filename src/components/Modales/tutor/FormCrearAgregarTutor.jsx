
import { useFormContext } from "react-hook-form";
import { useDispatch } from "react-redux";
import { crearTutorConAlumno } from "../../../reducers/tutoresSlice";
import { showAlert } from "../../../utils/alert";
import { cerrarModal } from "../../../reducers/uiSlice";
import { TutorInputs } from "../../tutores/TutorInputs";

export const FormCrearAgregarTutor = () => {
  const token = localStorage.getItem("token")
  const dispatch = useDispatch();
  const {
    handleSubmit
  } = useFormContext();

  const onSubmit = async (data) => {
    try {
      const resultAction = await dispatch(crearTutorConAlumno({ token, tutor: data }));
      if (crearTutorConAlumno.fulfilled.match(resultAction)) {
        showAlert({
          title: "Éxito",
          text: "El tutor fue creado y agregado correctamente al alumno",
          icon: "success",
        });
        dispatch(cerrarModal());
      } else if (crearTutorConAlumno.rejected.match(resultAction)) {
        throw new Error(resultAction.error.message);
      }
    } catch (error) {
      showAlert({
        title: "Error",
        text: error.message || "Ocurrió un error al crear el tutor",
        icon: "error",
      });
    }
  };

  return (
    <>
      <form
        className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <TutorInputs />
      </form>
    </>
  );
};
