import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { asignarTutorAlumno, getAlumnoById, getAlumnos } from "../apis/alumnosApi"
import { listarTutoresPorAlumno } from "./tutoresSlice";

export const traerAlumnos = createAsyncThunk('alumnos/getAlumnos', async () => {
 const data = await getAlumnos();
 return data;
})

export const traerPorAlumnoId = createAsyncThunk('alumnos/detalle', async ({id}) => {
    const data = await getAlumnoById(id);
    return data;
})

export const asignarTutor = createAsyncThunk('alumnos/asignarTutor', async ({idAlumno, idTutor}, {dispatch}) => {
    const data = await asignarTutorAlumno(idAlumno, idTutor);
    dispatch(listarTutoresPorAlumno({id: idAlumno}));
    return data;
})

const alumnosSlice = createSlice({
    name: 'alumnos',
    initialState: {
        alumnos: [],
        loading: false,
        alumno: null,
        countAlumnos: 0
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
                state.countAlumnos = action.payload.length;
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