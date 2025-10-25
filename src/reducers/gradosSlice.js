import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getGradosDisponibles, getSeccionesDisponibles } from "../apis/gradosApi";
import { getCiclosGradoDisponibles } from "../apis/ciclosApi";

export const listarGradosDisponibles = createAsyncThunk('grados/listarDisponibles', async () => {
    try {
        const data = getGradosDisponibles();
        return data;
    } catch (error) {
        console.error("Error al traer grados", error);
        throw new Error("Error al traer grados");
    }
})

export const listarCiclosGradosDisponibles = createAsyncThunk('grados/ciclosGradoDisponibles', async () => {
    try {
        const data = getCiclosGradoDisponibles();
        return data;
    } catch (error) {
        console.error("Error al traer grados", error);
        throw new Error("Error al traer grados");
    }
})

export const listarSeccionesDisponibles = createAsyncThunk('grados/seccionesDisponibles', async() => {
    try {
        const data = getSeccionesDisponibles();
        return data;
    } catch (error) {
        console.error("Error al traer grados", error);
        throw new Error("Error al traer grados");
    }
})

const gradosSlice = createSlice({
    name: 'grados',
    initialState: {
        ciclosGrado: [],
        gradosDisponibles: [],
        seccionesDisponibles: [],
        loading: false
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(listarGradosDisponibles.pending, (state) => {
                state.loading = true; 
            })
            .addCase(listarGradosDisponibles.fulfilled, (state, action) => {
                state.loading = false;
                state.gradosDisponibles = action.payload;
            })
            .addCase(listarGradosDisponibles.rejected, (state) => {
                state.loading = false;
            })
            .addCase(listarSeccionesDisponibles.pending, (state) => {
                state.loading = true; 
            })
            .addCase(listarSeccionesDisponibles.fulfilled, (state, action) => {
                state.loading = false;
                state.seccionesDisponibles = action.payload;
            })
            .addCase(listarSeccionesDisponibles.rejected, (state) => {
                state.loading = false;
            })
            .addCase(listarCiclosGradosDisponibles.pending, (state) => {
                state.loading = true;
            })
            .addCase(listarCiclosGradosDisponibles.fulfilled, (state, action) => {
                state.loading = false;
                state.ciclosGrado = action.payload;
            })
            .addCase(listarCiclosGradosDisponibles.rejected, (state) => {
                state.loading = false;
            })
    }
})

export default gradosSlice.reducer;