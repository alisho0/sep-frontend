import { useDispatch } from "react-redux";
import { confirmationAlert, showAlert } from "../utils/alert";
import { eliminarObservacion } from "../reducers/observacionesSlice"

export const useObservacion = () => {

    const dispatch = useDispatch();

  const handleDelete = async (id) => {
    await confirmationAlert({
      title: "¿Estás seguro?",
      text: "¿Estás seguro de eliminar esta observación?",
      icon: "warning",
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
    }).then((res) => {
      if (res.isConfirmed) {
        try {
          const eliminar = dispatch(eliminarObservacion(id));
          if (eliminarObservacion.fulfilled.match(eliminar)) {
            showAlert({
              title: "Observación eliminada",
              text: "La observación se eliminó correctamente.",
              icon: "success",
            });
          } else if (eliminarObservacion.rejected.match(eliminar)) {
            throw new Error(
              "La observación no pudo ser eliminado. Intentalo de nuevo."
            );
          }
        } catch (error) {
          showAlert({
            title: "Error al eliminar",
            text: error.message,
            icon: "error",
          });
        }
      }
    });
  };

  return { handleDelete };
};
