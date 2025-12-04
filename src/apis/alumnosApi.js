import axios from 'axios';
import React from 'react'
import api from '../utils/interceptor';

const url = `${import.meta.env.VITE_BASE_URL}/alumnos`;

export const getAlumnos = async () => {
    try {
        const response = await api.get(`${url}/listar`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export const getAlumnoById = async (id) => {
    try {
        const response = await api.get(`${url}/detalle/${id}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export const asignarTutorAlumno = async (idAlumno, idTutor) => {
    try {
        const response = await api.put(`${url}/asignarTutor/${idAlumno}/${idTutor}`, {})

        return response.data;
    } catch (error) {
        console.error("Error al asignar el tutor", error.response?.data || error);
        throw new Error(error.response?.data?.message || "Error al asignar el tutor. Por favor, intente nuevamente");
    }
}

export const postAlumno = async (alumno) => {
    try {
        const res = await api.post(`${url}/crear`, alumno);
        return res.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || "Error al crear un alumno, intentalo de nuevo.")
    }
}

export const getAlumnosPorCSG = async (id) => {
    try {
        const res = await api.get(`${url}/listarPorCSG/${id}`)
        return res.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || "Error al listar un alumno, intentalo de nuevo.")
    }
}