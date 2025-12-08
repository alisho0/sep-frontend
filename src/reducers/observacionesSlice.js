import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { agregarObservacion, getObservacionesGrado } from "../apis/observacionesApi";
import { detalleRegistro } from "./registrosSlice";

export const crearObservacion = createAsyncThunk('observaciones/crear', async ({obs, registroId}, {dispatch}) => {
    const data = await agregarObservacion(obs);
    await dispatch(detalleRegistro({id: registroId}))
    return data;
})

export const listarObservaciones = createAsyncThunk('observaciones/listar', async (id) => {
    const data = await getObservacionesGrado(id);
    return data;
});

const observacionesSlice = createSlice({
    name: 'observaciones',
    initialState: {
        observacion: [],
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(crearObservacion.pending, (state) => {
                state.loading = true; 
            })
            .addCase(crearObservacion.fulfilled, (state, action) => {
                state.loading = false;
                state.observacion = action.payload;
            })
            .addCase(crearObservacion.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message; 
            })
            .addCase(listarObservaciones.pending, (state) => {
                state.loading = true; 
            })
            .addCase(listarObservaciones.fulfilled, (state, action) => {
                state.loading = false;
                state.observacion = action.payload;
            })
            .addCase(listarObservaciones.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message; 
            })
    }
})

export default observacionesSlice.reducer;