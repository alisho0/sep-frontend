import { createSlice } from "@reduxjs/toolkit";

const metricasSlice = createSlice({
    name: 'metricas',
    initialState: {
        totalAlumnos: 0,
        observacionesRecientes: 0,
        discapacidadesRegistradas: 0
    }
})