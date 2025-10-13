import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { nuevoTutorConAlumno, traerTutores } from "../apis/tutoresApi";

export const listarTutores = createAsyncThunk('tutores/listar', async ({token}) => {
    const data = await traerTutores(token);
    return data;
});

export const crearTutorConAlumno = createAsyncThunk('tutores/crear', async ({token, tutor}, {dispatch}) => {
    const data = await nuevoTutorConAlumno(token, tutor);
    dispatch(listarTutores({token}))
    return data;
})

const tutoresSlice = createSlice({
    name: 'tutores',
    initialState: {
        tutores: [],
        error: null,
        loading: false
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(listarTutores.pending, (state) => {
                state.loading = true;
            })
            .addCase(listarTutores.fulfilled, (state, action) => {
                state.loading = false;
                state.tutores = action.payload 
            })
            .addCase(listarTutores.rejected, (state, action) => {
                state.error = action.error.message;
            })
            .addCase(crearTutorConAlumno.pending, (state) => {
                state.loading = true;
            })
            .addCase(crearTutorConAlumno.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(crearTutorConAlumno.rejected, (state, action) => {
                state.error = action.error.message;
            })
    }
})

export default tutoresSlice.reducer;