import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { getAlumnos } from "../apis/alumnosApi"

export const traerAlumnos = createAsyncThunk('alumnos/getAlumnos', async (token) => {
 const data = await getAlumnos(token);
 return data;
})

const alumnosSlice = createSlice({
    name: 'alumnos',
    initialState: {
        alumnos: [],
        loading: false
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(traerAlumnos.pending, (state) => {
                state.loading = true;
            })
            .addCase(traerAlumnos.fulfilled, (state, action) => {
                state.loading = false;
                state.alumnos = action.payload;
            })
            .addCase(traerAlumnos.rejected, (state) => {
                state.loading = false;
            })
    }
})

export default alumnosSlice.reducer;