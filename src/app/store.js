import { configureStore } from "@reduxjs/toolkit";
import alumnosReducer from '../reducers/alumnosSlice'
import registrosReducer from '../reducers/registrosSlice'
import uiReducer from '../reducers/uiSlice'

export const store = configureStore({
    reducer: {
        // Aquí van las referencias a los slices de los reducers
        alumnos: alumnosReducer,
        registros: registrosReducer,
        ui: uiReducer,
    }
})