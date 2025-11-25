import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getGradoDetalle, getGrados, getGradosDisponibles, getSeccionesDisponibles } from "../apis/gradosApi";
import { delCiclo, getCiclosGradoDisponibles, postCiclo } from "../apis/ciclosApi";

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

export const detalleGrado = createAsyncThunk('grado/detalle', async (id) => {
    const data = getGradoDetalle(id);
    return data;
})

export const eliminarCiclo = createAsyncThunk('grado/eliminarCiclo', async (id) => {
    const data = delCiclo(id);
    console.log(data)
    return id;
})

const gradosSlice = createSlice({
    name: 'grados',
    initialState: {
        grados: [],
        ciclosGrado: [],
        gradosDisponibles: [],
        seccionesDisponibles: [],
        gradoActual: {
            id: null,
            nro: null,
            inscriptosActuales: 0,
            seccionCiclos: []
        },
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
            .addCase(detalleGrado.pending, (state) => {
                state.loading = true;
            })
            .addCase(detalleGrado.fulfilled, (state, action) => {
                state.loading = false;
                state.gradoActual = action.payload;
            })
            .addCase(detalleGrado.rejected, (state) => {
                state.loading = false;
            })
            .addCase(eliminarCiclo.pending, (state) => {
                state.loading = true;
            })
            .addCase(eliminarCiclo.fulfilled, (state, action) => {
                state.loading = false;
                state.gradoActual.seccionCiclos = state.gradoActual.seccionCiclos.map(sc => ({
                    ...sc,
                    gradoCiclos: sc.gradoCiclos.filter(c => c.id !== action.payload)
                }));
            })
            .addCase(eliminarCiclo.rejected, (state) => {
                state.loading = false;
            })
    }
})

export default gradosSlice.reducer;