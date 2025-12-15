import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getGradoDetalle, getGrados, getGradosDisponibles, getSeccionesDisponibles } from "../apis/gradosApi";
import { delCiclo, delDesvincularMaestro, getCiclosGradoDisponibles, getDetalleCiclo, postCiclo, postVincularMaestro } from "../apis/ciclosApi";
import { eliminarMaestroAsignado, listarMaestros } from "./maestrosSlice";

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
    return id;
})

export const detalleCiclo = createAsyncThunk('grado/detalleCiclo', async (id) => {
    const data = getDetalleCiclo(id);
    return data;
})

export const desvincularMaestro = createAsyncThunk('grado/desvincular', async ({idCiclo, idMaestro}, {dispatch}) => {
    const data = await delDesvincularMaestro(idCiclo, idMaestro);
    dispatch(eliminarMaestroAsignado(idMaestro))
    return data;
})

export const vincularMaestro = createAsyncThunk('grado/vincular', async ({idCiclo, idMaestro}, {dispatch}) => {
    const data = await postVincularMaestro(idCiclo, idMaestro);
    await dispatch(listarMaestros(idCiclo))
    return data;
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
        cicloGradoActual: {

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
            .addCase(detalleCiclo.pending, (state) => {
                state.loading = true
            })
            .addCase(detalleCiclo.fulfilled, (state, action) => {
                // const { alumnos, ...resto } = action.payload
                state.loading = false;
                state.cicloGradoActual = action.payload;
            })
            .addCase(detalleCiclo.rejected, (state) => {
                state.loading = false
            })
            .addCase(desvincularMaestro.pending, (state) => {
                state.loading = true
            })
            .addCase(desvincularMaestro.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(desvincularMaestro.rejected, (state) => {
                state.loading = false
            })
            .addCase(vincularMaestro.pending, (state) => {
                state.loading = true
            })
            .addCase(vincularMaestro.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(vincularMaestro.rejected, (state) => {
                state.loading = false
            })
    }
})

export default gradosSlice.reducer;