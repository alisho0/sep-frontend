import axios from "axios";
import api from "../utils/interceptor";

const url = `${import.meta.env.VITE_BASE_URL}/grado`;

export const getGradosDisponibles = async () => {
    try {        
        const res = await api.get(`${url}/disponibles`);
        return res.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || "Error al asignar al traer grados");
    }
}

export const getSeccionesDisponibles = async () => {
    try {        
        const res = await api.get(`${url}/secciones`);
        return res.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || "Error al asignar al traer las secciones");
    }
}

export const getGrados = async () => {
    try {
        const res = await api.get(`${url}/listar`)
        return res.data;
    } catch(error) {
        throw new Error(error.response?.data?.message || "Error al listar los grados");
    }
}