import axios from "axios"

const url = `${import.meta.env.VITE_BASE_URL}/tutor`;

export const traerTutores = async (token) => {
    try {
        const res = await axios.get(`${url}/listar`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return res.data;
    } catch (error) {
        console.error(error);
    }
}