import axios from 'axios';
import React from 'react'

const url = `${import.meta.env.VITE_BASE_URL}/alumnos`;

export const getAlumnos = async (token) => {
    try {
        const response = await axios.get(`${url}/listar`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export const getAlumnoById = async (id, token) => {
    try {
        const response = await axios.get(`${url}/detalle/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
}