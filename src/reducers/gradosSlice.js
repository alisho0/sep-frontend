import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getGrados, getGradosDisponibles, getSeccionesDisponibles } from "../apis/gradosApi";
import { getCiclosGradoDisponibles } from "../apis/ciclosApi";
import { postCiclo } from "../apis/cicloApi";

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

export const listarGrados = createAsyncThunk('grados/listar', async () => {
    const data = getGrados();
    return data;
})

export const crearCiclo = createAsyncThunk('grado/crearCiclo', async (ciclo) => {
    const data = postCiclo(ciclo);
    return data;
}) 

const gradosSlice = createSlice({
    name: 'grados',
    initialState: {
        grados: [],
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
            .addCase(listarGrados.pending, (state) => {
                state.loading = true;
            })
            .addCase(listarGrados.fulfilled, (state, action) => {
                state.loading = false;
                state.grados = action.payload;
            })
            .addCase(listarGrados.rejected, (state) => {
                state.loading = false;
            })
            .addCase(crearCiclo.pending, (state) => {
                state.loading = true;
            })
            .addCase(crearCiclo.fulfilled, (state, action) => {
                state.loading = false;
                state.ciclosGrado.push(action.payload);
            })
            .addCase(crearCiclo.rejected, (state) => {
                state.loading = false;
            })
    }
})

export default gradosSlice.reducer;