import axios from "axios";
/* 

    "contenido": "El alumno tuvo mejoras en su conducta en la materia de Lengua",
    "fecha": "2025-09-15",
    "idRegistro": 2
*/

const url = `${import.meta.env.VITE_BASE_URL}/observacion`;

export const agregarObservacion = async (observacion, token) => {
    try {
        const response = await axios.post(`${url}/crear`, {
            contenido: observacion.contenido,
            fecha: observacion.fecha,
            idRegistro: observacion.idRegistro
        },
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error en agregarObservacion:', error);
        throw error; // Propagamos el error para que pueda ser manejado por el slice
    }
}