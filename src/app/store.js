import { configureStore } from "@reduxjs/toolkit";
import alumnosReducer from '../reducers/alumnosSlice'
import registrosReducer from '../reducers/registrosSlice'

export const store = configureStore({
    reducer: {
        // Aquí van las referencias a los slices de los reducers
        alumnos: alumnosReducer,
        registros: registrosReducer,
    }
})