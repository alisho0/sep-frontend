import axios from "axios";

const url = `${import.meta.env.VITE_BASE_URL}/registro`;

export const aniosConRegistros = async (token, id) => {
    try {
        const response = await axios.get(`${url}/añosDisponibles/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export const traerRegistro = async (token, id) => {
    try {
        const response = await axios.get(`${url}/detalle/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
}