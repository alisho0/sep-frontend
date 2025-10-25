import api from "../utils/interceptor";

const url = `${import.meta.env.VITE_BASE_URL}/ciclo`;

export const getCiclosGradoDisponibles = async () => {
    try {
        const res = await api.get(`${url}/disponibles`);
        return res.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || "Error al traer los ciclos grado disponibles.");
    }
}