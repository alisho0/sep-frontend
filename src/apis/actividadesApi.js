import axios from "axios";

const url = `${import.meta.env.VITE_BASE_URL}/actividad`;

export const actividadReciente = async (token) => {
    try {
        const response = await axios.get(`${url}/recientes`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error al obtener las actividades", error.response?.data || error);
        throw new Error(error.response?.data?.message || "Error al obtener las actividades. Por favor, intente nuevamente");
    }
}