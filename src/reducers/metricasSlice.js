import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getMetricasCSG, getObsRecientes, getTotalAlumnos } from "../apis/metricasApi";
import { actividadReciente } from "../apis/actividadesApi";

export const traerMetricas = createAsyncThunk('metricas/traerMetricas', async () => {
    try {
        const [alumnosTotales, observacionesRecientes] = await Promise.all([
            getTotalAlumnos(),
            getObsRecientes()
        ]);
        return {
            alumnosTotales,
            observacionesRecientes
        };
    } catch (error) {
        console.error("Error al traer métricas", error);
        throw new Error("Error al traer métricas");
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

const metricasSlice = createSlice({
    name: 'metricas',
    initialState: {
        metricas: [
            {
                nombre: 'Total de Alumnos',
                valor: 0,
            },
            {
                nombre: 'Observaciones recientes',
                valor: 0,
            },
            {
                nombre: 'Discapacidades registradas',
                valor: 0,
            }
        ],
        metricasCicloDetalle: [
            {
                nombre: 'Alumnos inscriptos',
                valor: 0
            },
            {
                nombre: 'Discapacidades registradas',
                valor: 0
            },
        ],
        observaciones: [],
        loading: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(traerMetricas.pending, (state) => {
                state.loading = true;
            })
            .addCase(traerMetricas.fulfilled, (state, action) => {
                const { alumnosTotales, observacionesRecientes } = action.payload;
                state.metricas[0].valor = alumnosTotales;
                state.metricas[1].valor = observacionesRecientes;
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
    }
})

export default metricasSlice.reducer;