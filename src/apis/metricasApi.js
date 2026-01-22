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

// Trae grados asignados en el año actual por ID.
export const getGradosAsignadosById = async (id) => {
    try {
        const response = await api.get(`${url}/grados-asignados/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener los grados asignados", error.response?.data || error);
        throw new Error(error.response?.data?.message || "Error al obtener los grados asignados. Por favor, intente nuevamente");
    }
}

// Trae alumnos asignados en el año actual por ID.
export const getAlumnosAsignadosById = async (id) => {
    try {
        const response = await api.get(`${url}/alumnos-asignados/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener los alumnos asignados", error.response?.data || error);
        throw new Error(error.response?.data?.message || "Error al obtener los alumnos asignados. Por favor, intente nuevamente");
    }
}

// Trae las observaciones realizadas en el año actual por ID.
export const getObservacionesRealizadasById = async (id) => {
    try {
        const response = await api.get(`${url}/observaciones-por-año/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener las observaciones realizadas", error.response?.data || error);
        throw new Error(error.response?.data?.message || "Error al obtener las observaciones realizadas. Por favor, intente nuevamente");
    }
}
