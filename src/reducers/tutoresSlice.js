import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { desvincularTutor, nuevoTutorConAlumno, traerTutores, traerTutoresPorAlumno } from "../apis/tutoresApi";

export const listarTutores = createAsyncThunk('tutores/listar', async ({token}) => {
    const data = await traerTutores(token);
    return data;
});

export const listarTutoresPorAlumno = createAsyncThunk('tutores/listarPorAlumno', async ({token, id}) => {
    const data = await traerTutoresPorAlumno(token, id);
    return data;
})

export const crearTutorConAlumno = createAsyncThunk('tutores/crear', async ({token, tutor}, {dispatch}) => {
    const data = await nuevoTutorConAlumno(token, tutor);
    dispatch(listarTutores({token}))
    return data;
})

export const desvincularTutorDeAlumno = createAsyncThunk('tutores/desvincular', async ({token, idTutor, idAlumno}) => {
    const data = await desvincularTutor(token, idTutor, idAlumno);
    return data;
})

const tutoresSlice = createSlice({
    name: 'tutores',
    initialState: {
        tutores: [],
        tutoresAlumno: [],
        tutoresAlumnoCount: 0,
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
                state.tutoresAlumno.push(action.payload)
            })
            .addCase(crearTutorConAlumno.rejected, (state, action) => {
                state.error = action.error.message;
            })
            .addCase(listarTutoresPorAlumno.pending, (state) => {
                state.loading = true;
            })
            .addCase(listarTutoresPorAlumno.fulfilled, (state, action) => {
                state.loading = false;
                state.tutoresAlumno = action.payload;
                state.tutoresAlumnoCount = action.payload.length; // Actualizamos el contador automáticamente
            })
            .addCase(listarTutoresPorAlumno.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
                state.tutoresAlumnoCount = 0; // Reseteamos el contador en caso de error
            })
            .addCase(desvincularTutorDeAlumno.pending, (state) => {
                state.loading = true;
            })
            .addCase(desvincularTutorDeAlumno.fulfilled, (state, action) => {
                state.loading = false;
                state.tutoresAlumno = state.tutoresAlumno.filter(
                    tutor => tutor.id !== action.payload.idTutor
                );
                state.tutoresAlumnoCount = state.tutoresAlumno.length;
                state.error = null;
            })
            .addCase(desvincularTutorDeAlumno.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
    }
})

export default tutoresSlice.reducer;