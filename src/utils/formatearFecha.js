export const formatearFecha = (fechaRaw) => {
    const fecha = new Date(fechaRaw);
    const fechaFormateada = fecha.toLocaleString("es-AR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
    return fechaFormateada;
  }