import api from "../utils/interceptor";

const url = `${import.meta.env.VITE_BASE_URL}/discapacidad`;

export const getDiscapacidades = async ( ) => {
    try {
        const res = await api.get(`${url}/listar`)
        return res.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error al listar las discapacidades')
    }
}