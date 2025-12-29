import axios from "axios"
import api from "../utils/interceptor";

const url = `${import.meta.env.VITE_BASE_URL}/auth`;


export const login = async (username, password) => {
    const response = await axios.post(`${url}/login`, {
        username,
        password
    })
    return response.data
}

export const register = async (usuario) => {
    try {
        const res = await api.post(`${url}/register`, usuario);
        return res.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || "Error al crear el usuario.");
    }
}