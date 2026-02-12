import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getMetricasCSG, getObsRecientes, getTotalAlumnos, getAlumnosAsignadosById, getGradosAsignadosById, getObservacionesRealizadasById, getDiscapacidadesTotales, getTotalInscriptosLastCiclo } from "../apis/metricasApi";
import { actividadReciente } from "../apis/actividadesApi";

export const traerMetricas = createAsyncThunk('metricas/traerMetricas', async () => {
    try {
        const [alumnosInscriptos, observacionesRecientes, discapacidadesTotales] = await Promise.all([
            getTotalInscriptosLastCiclo(),
            getObsRecientes(),
            getDiscapacidadesTotales()
        ]);
        return {
            alumnosInscriptos,
            observacionesRecientes,
            discapacidadesTotales
        };
    } catch (error) {
        console.error("Error al traer métricas", error);
        throw new Error(error.message || "Error al traer métricas");
    }
});

export const ultimasActividades = createAsyncThunk('metricas/ultimasActividades', async () => {
    try {
        const data = actividadReciente();
        return data;
    } catch (error) {
        console.error("Error al traer actividades", error);
        throw new Error("Error al traer actividades");
    }
})

export const metricasPorCicloDetalle = createAsyncThunk('metricas/cicloDetalle', async (id) => {
    const data = getMetricasCSG(id);
    return data;
})

// Thunks para métricas por ID
export const traerAlumnosPorId = createAsyncThunk('metricas/traerAlumnosPorId', async (id) => {
    const data = await getAlumnosAsignadosById(id);
    return data;
});

export const traerGradosPorId = createAsyncThunk('metricas/traerGradosPorId', async (id) => {
    const data = await getGradosAsignadosById(id);
    return data;
});

export const traerObservacionesPorId = createAsyncThunk('metricas/traerObservacionesPorId', async (id) => {
    const data = await getObservacionesRealizadasById(id);
    return data;
});

export const traerMetricasAlumnos = createAsyncThunk('metricas/alumnos', async () => {
    try {
        const [totalAlumnos, alumnosConDiscapacidad] = await Promise.all([
            getTotalAlumnos(),
            getDiscapacidadesTotales()
        ]);
        return {
            totalAlumnos,
            alumnosConDiscapacidad
        };
    } catch (error) {
        console.error("Error al traer métricas de alumnos", error);
        throw new Error(error.message || "Error al traer métricas de alumnos");
    }
})

const metricasSlice = createSlice({
    name: 'metricas',
    initialState: {
        dashboard: [
            { nombre: 'Alumnos inscriptos este año', valor: 0 },
            { nombre: 'Observaciones recientes (7 días)', valor: 0 },
            { nombre: 'Discapacidades registradas este año', valor: 0 }
        ],
        metricasCicloDetalle: [
            { nombre: 'Alumnos inscriptos', valor: 0 },
            { nombre: 'Discapacidades registradas', valor: 0 },
        ],
        alumnos: [
            {nombre: 'Total de alumnos inscriptos', valor: 0},
            {nombre: 'Alumnos con discapacidad', valor: 0},
        ],
        observaciones: [],
        alumnosPorId: null,
        gradosPorId: null,
        observacionesPorId: null,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(traerMetricas.pending, (state) => {
                state.loading = true;
            })
            .addCase(traerMetricas.fulfilled, (state, action) => {
                const { alumnosInscriptos, observacionesRecientes, discapacidadesTotales } = action.payload;
                state.dashboard[0].valor = alumnosInscriptos;
                state.dashboard[1].valor = observacionesRecientes;
                state.dashboard[2].valor = discapacidadesTotales;
                state.loading = false;
            })
            .addCase(traerMetricas.rejected, (state) => {
                state.loading = false;
            })
            .addCase(ultimasActividades.pending, (state) => {
                state.loading = true;
            })
            .addCase(ultimasActividades.fulfilled, (state, action) => {
                state.loading = false;
                state.observaciones = action.payload;
            })
            .addCase(ultimasActividades.rejected, (state) => {
                state.loading = false;
            })
            .addCase(metricasPorCicloDetalle.pending, (state) => {
                state.loading = true;
            })
            .addCase(metricasPorCicloDetalle.fulfilled, (state, action) => {
                state.loading = false;
                state.metricasCicloDetalle[0].valor = action.payload.cantAlumnos;
                state.metricasCicloDetalle[1].valor = action.payload.cantDiscapacidad;
            })

            // Alumnos por ID
            .addCase(traerAlumnosPorId.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(traerAlumnosPorId.fulfilled, (state, action) => {
                state.loading = false;
                state.alumnosPorId = action.payload;
            })
            .addCase(traerAlumnosPorId.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            // Grados por ID
            .addCase(traerGradosPorId.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(traerGradosPorId.fulfilled, (state, action) => {
                state.loading = false;
                state.gradosPorId = action.payload;
            })
            .addCase(traerGradosPorId.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            // Observaciones por ID
            .addCase(traerObservacionesPorId.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(traerObservacionesPorId.fulfilled, (state, action) => {
                state.loading = false;
                state.observacionesPorId = action.payload;
            })
            .addCase(traerObservacionesPorId.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(traerMetricasAlumnos.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(traerMetricasAlumnos.fulfilled, (state, action) => {
                state.loading = false;
                state.alumnos[0].valor = action.payload.totalAlumnos;
                state.alumnos[1].valor = action.payload.alumnosConDiscapacidad;
             })
             .addCase(traerMetricasAlumnos.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
             })
    }
})

export default metricasSlice.reducer;