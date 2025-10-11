import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { agregarObservacion } from "../apis/observacionesApi";
import { detalleRegistro } from "./registrosSlice";

export const crearObservacion = createAsyncThunk('observaciones/crear', async ({obs, token, registroId}, {dispatch}) => {
    const data = await agregarObservacion(obs, token);
    await dispatch(detalleRegistro({token, id: registroId}))
    return data;
})

const observacionesSlice = createSlice({
    name: 'observaciones',
    initialState: {
        observacion: {},
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
    }
})

export default observacionesSlice.reducer;