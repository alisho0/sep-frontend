import api from "../utils/interceptor";


const url = `${import.meta.env.VITE_BASE_URL}/actividad`;

export const actividadReciente = async () => {
    try {
        const response = await api.get(`${url}/recientes`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener las actividades", error.response?.data || error);
        throw new Error(error.response?.data?.message || "Error al obtener las actividades. Por favor, intente nuevamente");
    }
}