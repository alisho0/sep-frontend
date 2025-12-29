import api from "../utils/interceptor";

const url = `${import.meta.env.VITE_BASE_URL}/usuario`;

export const getUsuarios = async () => {
    try {
        const res = await api.get(`${url}/listar`);
        return res.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || "Error al traer los usuarios disponibles.");
    }
}

export const delUsuario = async (id) => {
    try {
        const res = await api.delete(`${url}/eliminar/${id}`);
        return res.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || "Error al traer los usuarios disponibles.");
    }
}