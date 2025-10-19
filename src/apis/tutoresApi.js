import axios from "axios"
import { data } from "react-router-dom";

const url = `${import.meta.env.VITE_BASE_URL}/tutor`;

export const traerTutores = async (token) => {
    try {
        const res = await axios.get(`${url}/listar`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return res.data;
    } catch (error) {
        console.error(error);
    }
}

export const traerTutoresPorAlumno = async (token, id) => {
    try {
        const res = await axios.get(`${url}/listar/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return res.data
    } catch (error) {
        console.error("Error al traer los tutores:", error.response?.data || error);
        throw new Error(error.response?.data?.message || 'Error al crear al traer tutores.');
    }
}

export const nuevoTutorConAlumno = async (token, tutor) => {
    try {
        const res = await axios.post(`${url}/crearConAlumno`, tutor, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return res.data;
    } catch (error) {
        console.error("Error al crear un tutor:", error.response?.data || error);
        if (error.response?.status === 409) {
            throw new Error('El tutor ya existe con ese DNI');
        }
        throw new Error(error.response?.data?.message || 'Error al crear el tutor. Por favor, intente nuevamente');
    }
}

export const desvincularTutor = async (token, idTutor, idAlumno) => {
    try {
        const res = await axios.delete(`${url}/desvincular/${idTutor}/${idAlumno}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return {idTutor};
    } catch (error) {
        console.error("Error al eliminar el tutor", error.response?.data || error);
        throw new Error(error.response?.data?.message || "Error al desvincular el tutor. Por favor, intente nuevamente");
    }
}

export const nuevoTutorVacio = async (token, tutor) => {
    try {
        const res = await axios.post(`${url}/crear`, tutor, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    } catch (error) {
        console.error("Error al eliminar el tutor", error.response?.data || error)
        throw new Error(error.response?.data?.message || 'Error al crear el tutor. Por favor, intente nuevamente');
    }
}