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