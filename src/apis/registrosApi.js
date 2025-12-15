import axios from "axios";
import api from "../utils/interceptor";

const url = `${import.meta.env.VITE_BASE_URL}/registro`;

export const aniosConRegistros = async (id) => {
    try {
        const response = await api.get(`${url}/añosDisponibles/${id}`)
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export const traerRegistro = async (id) => {
    try {
        const response = await api.get(`${url}/detalle/${id}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export const delRegistro = async (id) => {
    try {
        const response = await api.delete(`${url}/eliminar/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || "Error al desvincular el tutor. Por favor, intente nuevamente");
    }
}