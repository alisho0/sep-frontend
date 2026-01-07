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
export const obtenerUsuario = async (id) => {
    try {
        const res = await api.get(`${url}/detalle/${id}`);
        return res.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || "Error al traer el usuario.");
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

export const editUsuario = async (id, data) => {
    try {
        const res = await api.put(`${url}/editar/${id}`, data);
        return res.data;
    } catch (error) {
        console.error(error)
        throw new Error(error.response?.data?.message || "Error al editar el usuario.");
    }
}

export const editPassword = async (id, data) => {
    console.log("El id:", id)
    console.log("El json:", data)
    try {
        const res = await api.put(`${url}/cambiarPassword/${id}`, data);
        return res.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || "Error al cambiar la contraseña del usuario.");
    }
}