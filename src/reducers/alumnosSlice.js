import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { asignarTutorAlumno, getAlumnoById, getAlumnos } from "../apis/alumnosApi"
import { listarTutoresPorAlumno } from "./tutoresSlice";

export const traerAlumnos = createAsyncThunk('alumnos/getAlumnos', async (token) => {
 const data = await getAlumnos(token);
 return data;
})

export const traerPorAlumnoId = createAsyncThunk('alumnos/detalle', async ({id, token}) => {
    const data = await getAlumnoById(id, token);
    return data;
})

export const asignarTutor = createAsyncThunk('alumnos/asignarTutor', async ({token, idAlumno, idTutor}, {dispatch}) => {
    const data = await asignarTutorAlumno(token, idAlumno, idTutor);
    dispatch(listarTutoresPorAlumno({token, id: idAlumno}));
    return data;
})

const alumnosSlice = createSlice({
    name: 'alumnos',
    initialState: {
        alumnos: [],
        loading: false,
        alumno: null
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
            .addCase(traerPorAlumnoId.pending, (state) => {
                state.loading = true;
            })
            .addCase(traerPorAlumnoId.fulfilled, (state, action) => {
                state.loading = false;
                state.alumno = action.payload;
            })
            .addCase(traerPorAlumnoId.rejected, (state) => {
                state.loading = false;
            })
            .addCase(asignarTutor.pending, (state) => {
                state.loading = true;
            })
            .addCase(asignarTutor.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(asignarTutor.rejected, (state) => {
                state.loading = false;
            })
    }
})

export default alumnosSlice.reducer;