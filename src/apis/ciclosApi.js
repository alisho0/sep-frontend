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

export const postCiclo = async (ciclo) => {
    try {
        const res = await api.post(`${url}/crearCiclo`, ciclo);
        return res.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || "Error al crear el ciclo");
    }
}

export const delCiclo = async (id) => {
    try {
        const res = await api.delete(`${url}/eliminar/${id}`);
        return res.data
    } catch (error) {
        throw new Error(error.response?.data?.message || "Error al eliminar el ciclo");
    }
}

export const getDetalleCiclo = async (id) => {
    try {
        const res = await api.get(`${url}/detalleCiclo/${id}`)
        return res.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || "Error al traer el ciclo");
    }
}

// /{idCiclo}/maestros/{idMaestro}
export const postVincularMaestro = async (idCiclo, idMaestro) => {
    try {
        const res = await api.post(`${url}/${idCiclo}/maestros/${idMaestro}`)
        return res.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || "Error al traer el ciclo");
    }
}
export const delDesvincularMaestro = async (idCiclo, idMaestro) => {
    try {
        const res = await api.delete(`${url}/${idCiclo}/maestros/${idMaestro}`)
        return res.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || "Error al traer el ciclo");
    }
}