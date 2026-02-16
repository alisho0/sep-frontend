import axios from "axios"
import api from "../utils/interceptor";

const url = `${import.meta.env.VITE_BASE_URL}/tutor`;

export const traerTutores = async () => {
    try {
        const res = await api.get(`${url}/listar`)
        return res.data;
    } catch (error) {
        console.error(error);
    }
}

export const traerTutoresPorAlumno = async (id) => {
    try {
        const res = await api.get(`${url}/listar/${id}`)
        return res.data
    } catch (error) {
        console.error("Error al traer los tutores:", error.response?.data || error);
        throw new Error(error.response?.data?.message || 'Error al crear al traer tutores.');
    }
}

export const nuevoTutorConAlumno = async (tutor) => {
    try {
        const res = await api.post(`${url}/crearConAlumno`, tutor);
        return res.data;
    } catch (error) {
        console.error("Error al crear un tutor:", error.response?.data || error);
        if (error.response?.status === 409) {
            throw new Error('El tutor ya existe con ese DNI');
        }
        throw new Error(error.response?.data?.message || 'Error al crear el tutor. Por favor, intente nuevamente');
    }
}

export const desvincularTutor = async (idTutor, idAlumno) => {
    try {
        const res = await api.delete(`${url}/desvincular/${idTutor}/${idAlumno}`);
        return {idTutor};
    } catch (error) {
        console.error("Error al eliminar el tutor", error.response?.data || error);
        throw new Error(error.response?.data?.message || "Error al desvincular el tutor. Por favor, intente nuevamente");
    }
}

export const nuevoTutorVacio = async (tutor) => {
    try {
        const res = await api.post(`${url}/crear`, tutor);
        return res.data;
    } catch (error) {
        console.error("Error al eliminar el tutor", error.response?.data || error)
        throw new Error(error.response?.data || 'Error al crear el tutor. Por favor, intente nuevamente');
    }
}

export const getTutorPorId = async (id) => {
    try {
        const res = await api.get(`${url}/detalle/${id}`);
        return res.data;
    } catch (error) {
        console.error("Error al traer el tutor por ID", error.response?.data || error)
        throw new Error(error.response?.data || 'Error al traer el tutor. Por favor, intente nuevamente');
    }
}