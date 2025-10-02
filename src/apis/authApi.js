import axios from "axios"

const baseUrl = "http://localhost:8080"

export const login = async (username, password) => {
    const response = await axios.post(`${baseUrl}/auth/login`, {
        username,
        password
    })
    return response.data
}