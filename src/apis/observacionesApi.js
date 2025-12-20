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
            idRegistro: observacion.idRegistro
        });
        return response.data;
    } catch (error) {
        console.error('Error en agregarObservacion:', error);
        throw error; // Propagamos el error para que pueda ser manejado por el slice
    }
}

export const getObservacionesGrado = async (id) => {
    try {
        const response = await api.get(`${url}/listar/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || "Error en listar las observaciones por grado.");
    }
}

export const delObservacion = async (id) => {
    try {
        const response = await api.delete(`${url}/eliminar/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || "Error en listar las observaciones por grado.");
    }
}