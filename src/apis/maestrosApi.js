import api from "../utils/interceptor";

const url = `${import.meta.env.VITE_BASE_URL}/maestro`;

export const getMaestrosAsignadosCiclo = async (cicloId) => {
    try {
        const response = await api.get(`${url}/listarAsignados/${cicloId}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || "Error al listar los maestros");
    }
}