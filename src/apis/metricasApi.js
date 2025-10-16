import axios from "axios"

const url = `${import.meta.env.VITE_BASE_URL}/metrica`;

export const getObsRecientes = async (token) => {
    try {
        const response = await axios.get(`${url}/observacionesRecientes`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response.data;
    } catch (error) {
        console.error("Error al obtener las métricas", error.response?.data || error);
        throw new Error(error.response?.data?.message || "Error al obtener las métricas. Por favor, intente nuevamente");
    }
}

export const getTotalAlumnos = async (token) => {
    try {
        const response = await axios.get(`${url}/alumnosTotales`, {
            headers: {
                Authorization:  `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error al obtener las métricas", error.response?.data || error);
        throw new Error(error.response?.data?.message || "Error al obtener las métricas. Por favor, intente nuevamente");
    }
}
