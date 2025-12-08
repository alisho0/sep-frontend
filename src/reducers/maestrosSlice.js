import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getMaestrosAsignadosCiclo } from "../apis/maestrosApi";

export const listarMaestros = createAsyncThunk('maestros/listarAsignados', async (cicloId) => {
    const data = getMaestrosAsignadosCiclo(cicloId);
    return data
});

const maestrosSlice = createSlice({
    name: 'maestros',
    initialState: {
        maestrosAsignados: [],
        maestrosDisponibles: [],
        loading: false
    },
    reducers: {},
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
    }
});

export default maestrosSlice.reducer;