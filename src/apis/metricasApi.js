import axios from "axios"
import api from "../utils/interceptor";

const url = `${import.meta.env.VITE_BASE_URL}/metrica`;

export const getObsRecientes = async () => {
    try {
        const response = await api.get(`${url}/observacionesRecientes`)
        return response.data;
    } catch (error) {
        console.error("Error al obtener las métricas", error.response?.data || error);
        throw new Error(error.response?.data?.message || "Error al obtener las métricas. Por favor, intente nuevamente");
    }
}

export const getTotalAlumnos = async () => {
    try {
        const response = await api.get(`${url}/alumnosTotales`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener las métricas", error.response?.data || error);
        throw new Error(error.response?.data?.message || "Error al obtener las métricas. Por favor, intente nuevamente");
    }
}

export const getMetricasCSG = async (id) => {
    try {
        const response = await api.get(`${url}/cicloDetalle/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener las métricas", error.response?.data || error);
        throw new Error(error.response?.data?.message || "Error al obtener las métricas. Por favor, intente nuevamente");
    }
}
