import axios from "axios";
import api from "../utils/interceptor";
/* 

    "contenido": "El alumno tuvo mejoras en su conducta en la materia de Lengua",
    "fecha": "2025-09-15",
    "idRegistro": 2
*/

const url = `${import.meta.env.VITE_BASE_URL}/observacion`;

export const agregarObservacion = async (observacion) => {
    try {
        const response = await api.post(`${url}/crear`, {
            contenido: observacion.contenido,
            fecha: observacion.fecha,
            idRegistro: observacion.idRegistro,
            motivo: observacion.motivo
        });
        return response.data;
    } catch (error) {
        console.error("Error en agregar observación:", error.response.data);
        throw new Error(error.response?.data || "Error en agregar observación.");
    }
}

export const getObservacionesGrado = async (id) => {
    try {
        const response = await api.get(`${url}/listar/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data || "Error en listar las observaciones por grado.");
    }
}

export const delObservacion = async (id) => {
    try {
        const response = await api.delete(`${url}/eliminar/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data || "Error en eliminar la observación.");
    }
}