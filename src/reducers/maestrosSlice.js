import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getMaestrosAsignadosCiclo, getMaestrosDisponibles } from "../apis/maestrosApi";

export const listarMaestros = createAsyncThunk('maestros/listarAsignados', async (cicloId) => {
    const data = await getMaestrosAsignadosCiclo(cicloId);
    return data
});

export const listarMaestrosDisponibles = createAsyncThunk('maestros/listarDisponibles', async () => {
    const data = await getMaestrosDisponibles();
    return data;
});
const maestrosSlice = createSlice({
    name: 'maestros',
    initialState: {
        maestrosAsignados: [],
        maestrosDisponibles: [],
        loading: false
    },
    reducers: {
        eliminarMaestroAsignado: (state, action) => {
            state.maestrosAsignados = state.maestrosAsignados.filter(m => m.id != action.payload)
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(listarMaestros.pending, (state) => {
                state.loading = true;
            })
            .addCase(listarMaestros.fulfilled, (state, action) => {
                state.loading = false;
                state.maestrosAsignados = action.payload;
            })
            .addCase(listarMaestros.rejected, (state) => {
                state.loading = false;
            })
            .addCase(listarMaestrosDisponibles.pending, (state) => {
                state.loading = true;
            })
            .addCase(listarMaestrosDisponibles.fulfilled, (state, action) => {
                state.loading = false;
                state.maestrosDisponibles = action.payload;
            })
            .addCase(listarMaestrosDisponibles.rejected, (state) => {
                state.loading = false;
            })
    }
});

export const { eliminarMaestroAsignado } = maestrosSlice.actions;
export default maestrosSlice.reducer;