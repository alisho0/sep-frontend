import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getObsRecientes, getTotalAlumnos } from "../apis/metricasApi";
import { actividadReciente } from "../apis/actividadesApi";

export const traerMetricas = createAsyncThunk('metricas/traerMetricas', async (token) => {
    try {
        const [alumnosTotales, observacionesRecientes] = await Promise.all([
            getTotalAlumnos(token),
            getObsRecientes(token)
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

export const ultimasActividades = createAsyncThunk('metricas/ultimasActividades', async (token) => {
    try {
        const data = actividadReciente(token);
        return data;
    } catch (error) {
        console.error("Error al traer actividades", error);
        throw new Error("Error al traer actividades");
    }
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
    }
})

export default metricasSlice.reducer;