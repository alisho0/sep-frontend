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

export const postDiscapacidad = async (discapacidad) => {
    try {
        const res = await api.post(`${url}/crear`, discapacidad, {
            headers: {
                "Content-Type": "text/plain"
            }
        });
        return res.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error al crear una nueva discapacidad');
    }
}

export const delDiscapacidad = async (id) => {
    try {
        const res = await api.delete(`${url}/borrar/${id}`)
        return res.status;
    } catch (error) {
        throw new Error(error.response?.data?.message || "Error al eliminar discapacidad");
    }
}