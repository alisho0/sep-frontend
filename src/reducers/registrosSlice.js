import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { aniosConRegistros, delRegistro, postRegistro, traerRegistro } from "../apis/registrosApi";
import { detalleCiclo } from "./gradosSlice";

export const aniosRegistros = createAsyncThunk('registros/aniosDisponibles', async ({id}) => {
    const data = await aniosConRegistros(id);
    return data;
}) 

export const detalleRegistro = createAsyncThunk('registros/observaciones', async ({id}) => {
    const data = await traerRegistro(id);
    return data;
})

export const eliminarRegistro = createAsyncThunk('registro/eliminar', async ({registroId, cicloId}, {dispatch}) => {
    const data = await delRegistro(registroId);
    await dispatch(detalleCiclo(cicloId))
    return registroId;
})

export const crearRegistro = createAsyncThunk('registro/crear', async ({registroData}, {dispatch}) => {
    const data = postRegistro(registroData);
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
            .addCase(eliminarRegistro.pending, (state) => {
                state.loading = true;
            })
            .addCase(eliminarRegistro.fulfilled, (state, action) => {
                state.loading = false;
                state.registro = state.registro.filter(r => r == action.payload);
            })
            .addCase(eliminarRegistro.rejected, (state) => {
                state.loading = false;
            })
            .addCase(crearRegistro.pending, (state) => {
                state.loading = true;
            })
            .addCase(crearRegistro.fulfilled, (state, action) => {
                state.loading = false;
                state.aniosDisponibles.push(action.payload);
            })
            .addCase(crearRegistro.rejected, (state) => {
                state.loading = false;
            })
    }
})

export default registrosSlice.reducer;