import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { agregarObservacion, delObservacion, getObservacionesGrado } from "../apis/observacionesApi";
import { desvincularAlumno } from "./alumnosSlice";

export const crearObservacion = createAsyncThunk('observaciones/crear', async ({obs, registroId}, {dispatch}) => {
    const data = await agregarObservacion(obs);
    // if(registroId != null) {
    //     await dispatch(detalleRegistro({id: registroId}))
    // }
    return data;
})

export const listarObservaciones = createAsyncThunk('observaciones/listar', async (id) => {
    const data = await getObservacionesGrado(id);
    return data;
});

export const eliminarObservacion = createAsyncThunk('observaciones/eliminar', async (id) => {
    const data = await delObservacion(id);
    return id;
});


const observacionesSlice = createSlice({
    name: 'observaciones',
    initialState: {
        observacion: [],
        loading: false,
        error: null
    },
    reducers: {
        limpiarObservaciones: (state) => {
            state.observacion = [];
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(crearObservacion.pending, (state) => {
                state.loading = true; 
            })
            .addCase(crearObservacion.fulfilled, (state, action) => {
                state.loading = false;
                state.observacion.push(action.payload);
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
            .addCase(eliminarObservacion.pending, (state) => {
                state.loading = true; 
            })
            .addCase(eliminarObservacion.fulfilled, (state, action) => {
                state.loading = false;
                state.observacion = state.observacion.filter(o => o.id != action.payload)
            })
            .addCase(eliminarObservacion.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message; 
            })
            .addCase(desvincularAlumno.fulfilled, (state, action) => {
                state.observacion = state.observacion.filter(o => o.idAlumno != action.payload);
            })
    }
})

export const { limpiarObservaciones } = observacionesSlice.actions;
export default observacionesSlice.reducer;