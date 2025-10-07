import { configureStore } from "@reduxjs/toolkit";
import alumnosReducer from '../reducers/alumnosSlice'

export const store = configureStore({
    reducer: {
        // Aquí van las referencias a los slices de los reducers
        alumnos: alumnosReducer,
    }
})