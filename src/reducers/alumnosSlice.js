import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { asignarTutorAlumno, getAlumnoById, getAlumnos, getAlumnosPorCSG, postAlumno } from "../apis/alumnosApi"
import { listarTutoresPorAlumno } from "./tutoresSlice";
import { detalleCiclo } from "./gradosSlice";

export const traerAlumnos = createAsyncThunk('alumnos/getAlumnos', async () => {
 const data = await getAlumnos();
 return data;
})

export const traerPorAlumnoId = createAsyncThunk('alumnos/detalle', async ({id}) => {
    const data = await getAlumnoById(id);
    console.log(data)
    return data;
})

export const asignarTutor = createAsyncThunk('alumnos/asignarTutor', async ({idAlumno, idTutor}, {dispatch}) => {
    const data = await asignarTutorAlumno(idAlumno, idTutor);
    dispatch(listarTutoresPorAlumno({id: idAlumno}));
    return data;
})

export const crearAlumno = createAsyncThunk('alumno/crearAlumno', async ({alumno}, {dispatch}) => {
    const data = await postAlumno(alumno);
    dispatch(traerAlumnos());
    return data;
})

export const listarAlumnosPorCSG = createAsyncThunk('alumnos/listarPorCSG', async (id) => {
    const data = await getAlumnosPorCSG(id);
    return data;
})

const alumnosSlice = createSlice({
    name: 'alumnos',
    initialState: {
        alumnos: [],
        alumnosCSG: [],
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
            .addCase(crearAlumno.pending, (state) => {
                state.loading = true;
            })
            .addCase(crearAlumno.fulfilled, (state, action) => {
                state.loading = false;
                state.alumnos.push(action.payload)
            })
            .addCase(crearAlumno.rejected, (state) => {
                state.loading = false;
            })
            .addCase(listarAlumnosPorCSG.pending, (state) => {
                state.loading = true;
            })
            .addCase(listarAlumnosPorCSG.fulfilled, (state, action) => {
                state.loading = false;
                state.alumnosCSG = action.payload;
            })
            .addCase(listarAlumnosPorCSG.rejected, (state) => {
                state.loading = false;
            })
            // .addCase(detalleCiclo.pending, (state) => {
            //     state.loading = true;
            // })
            // .addCase(detalleCiclo.fulfilled, (state, action) => {
            //     state.loading = false;
            //     state.alumnosCSG = action.payload.alumnos;
            // })
            // .addCase(detalleCiclo.rejected, (state) => {
            //     state.loading = false;
            // })
    }
})

export default alumnosSlice.reducer;