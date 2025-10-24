import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { desvincularTutor, nuevoTutorConAlumno, nuevoTutorVacio, traerTutores, traerTutoresPorAlumno } from "../apis/tutoresApi";

export const listarTutores = createAsyncThunk('tutores/listar', async () => {
    const data = await traerTutores(token);
    return data;
});

export const listarTutoresPorAlumno = createAsyncThunk('tutores/listarPorAlumno', async ({id}) => {
    const data = await traerTutoresPorAlumno(id);
    return data;
})

export const crearTutorConAlumno = createAsyncThunk('tutores/crear', async ({tutor}, {dispatch}) => {
    const data = await nuevoTutorConAlumno(tutor);
    dispatch(listarTutores({token}))
    return data;
})

export const desvincularTutorDeAlumno = createAsyncThunk('tutores/desvincular', async ({idTutor, idAlumno}) => {
    const data = await desvincularTutor(idTutor, idAlumno);
    return data;
})

export const crearTutorVacio = createAsyncThunk('tutores/crearVacio', async({tutor}, {dispatch}) => {
    const data = await nuevoTutorVacio(tutor);
    dispatch(listarTutores());
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
            .addCase(crearTutorVacio.pending, (state) => {
                state.loading = true;
            })
            .addCase(crearTutorVacio.fulfilled, (state, action) => {
                state.loading = false;
                state.tutores.push(action.payload);
            })
    }
})

export default tutoresSlice.reducer;