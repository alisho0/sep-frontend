import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { aniosConRegistros, traerRegistro } from "../apis/registrosApi";

export const aniosRegistros = createAsyncThunk('registros/aniosDisponibles', async ({token, id}) => {
    const data = await aniosConRegistros(token, id);
    return data;
}) 

export const detalleRegistro = createAsyncThunk('registros/observaciones', async ({token, id}) => {
    const data = await traerRegistro(token, id);
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
                state.loading = false;
                state.registro = action.payload;
            })
            .addCase(detalleRegistro.rejected, (state) => {
                state.loading = false;
            })
    }
})

export default registrosSlice.reducer;