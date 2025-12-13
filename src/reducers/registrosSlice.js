import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { aniosConRegistros, traerRegistro } from "../apis/registrosApi";

export const aniosRegistros = createAsyncThunk('registros/aniosDisponibles', async ({id}) => {
    const data = await aniosConRegistros(id);
    return data;
}) 

export const detalleRegistro = createAsyncThunk('registros/observaciones', async ({id}) => {
    const data = await traerRegistro(id);
    return data;
})

const registrosSlice = createSlice({
    name: 'registros',
    initialState: {
        registro: {},
        loading: false,
        aniosDisponibles: [],
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(aniosRegistros.pending, (state) => {
                state.loading = true;
            })
            .addCase(aniosRegistros.fulfilled, (state, action) => {
                state.loading = false;
                state.aniosDisponibles = action.payload;
            })
            .addCase(aniosRegistros.rejected, (state) => {
                state.loading = false;
            })
            .addCase(detalleRegistro.pending, (state) => {
                state.loading = true;
            })
            .addCase(detalleRegistro.fulfilled, (state, action) => {
                const { observaciones, ...resto } = action.payload;
                state.loading = false;
                state.registro = resto;
            })
            .addCase(detalleRegistro.rejected, (state) => {
                state.loading = false;
            })
    }
})

export default registrosSlice.reducer;