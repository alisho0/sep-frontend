import { configureStore } from "@reduxjs/toolkit";
import alumnosReducer from '../reducers/alumnosSlice'
import registrosReducer from '../reducers/registrosSlice'
import uiReducer from '../reducers/uiSlice'
import observacionesReducer from '../reducers/observacionesSlice'
import tutoresReducer from '../reducers/tutoresSlice'
import metricasReducer from '../reducers/metricasSlice'
import gradosReducer from '../reducers/gradosSlice'

export const store = configureStore({
    reducer: {
        // Aquí van las referencias a los slices de los reducers
        alumnos: alumnosReducer,
        registros: registrosReducer,
        ui: uiReducer,
        observaciones: observacionesReducer,
        tutores: tutoresReducer,
        metricas: metricasReducer,
        grados: gradosReducer
    }
})