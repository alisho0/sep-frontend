import api from "../utils/interceptor";

const url = `${import.meta.env.VITE_BASE_URL}/ciclo`;

export const postCiclo = async (ciclo) => {
    try {
        const res = await api.post(`${url}/crearCiclo`, ciclo);
        return res.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || "Error al crear el ciclo");
    }
}