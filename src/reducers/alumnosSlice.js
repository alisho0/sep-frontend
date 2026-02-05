import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { asignarTutorAlumno, getAlumnoById, getAlumnos, getAlumnosPorCSG, postAlumno, searchAlumnos } from "../apis/alumnosApi"
import { listarTutoresPorAlumno } from "./tutoresSlice";
import { detalleCiclo } from "./gradosSlice";
import { da, tr } from "zod/v4/locales";
import { agregarAlumnoCiclo } from "../apis/ciclosApi";

export const traerAlumnos = createAsyncThunk('alumnos/getAlumnos', async (page = 0) => {
 const data = await getAlumnos(page);
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

export const crearAlumno = createAsyncThunk('alumno/crearAlumno', async ({alumno}, {dispatch}) => {
    const data = await postAlumno(alumno);
    dispatch(traerAlumnos());
    return data;
})

export const listarAlumnosPorCSG = createAsyncThunk('alumnos/listarPorCSG', async (id) => {
    const data = await getAlumnosPorCSG(id);
    return data;
})

export const buscarAlumnos = createAsyncThunk('alumnos/buscar', async (query) => {
    const data = await searchAlumnos(query);
    return data;
})

export const asignarAlumnoCiclo = createAsyncThunk('alumnos/asignarAlumnoCiclo', async ({idCiclo, idAlumno}, {dispatch}) => {
    const data = await agregarAlumnoCiclo(idCiclo, idAlumno);
    // dispatch(listarAlumnosPorCSG(idCiclo));
    return data;
})

const alumnosSlice = createSlice({
    name: 'alumnos',
    initialState: {
        alumnos: [],
        pagination: {
            totalPages: 0,
            pageNumber: 0,
            pageSize: 10,
            totalElements: 0,
            first: true,
            last: false,
            offset: 0
        },
        alumnosCSG: [],
        loading: false,
        alumno: null,
        countAlumnos: 0,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(traerAlumnos.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(traerAlumnos.fulfilled, (state, action) => {
                state.loading = false;
                state.alumnos = Array.isArray(action.payload.content) ? action.payload.content : [];
                state.countAlumnos = action.payload.totalElements || 0;
                state.pagination = {
                    totalPages: action.payload.totalPages || 0,
                    pageNumber: action.payload.pageable.pageNumber || 0,
                    pageSize: action.payload.pageable.pageSize || 10,
                    totalElements: action.payload.totalElements || 0,
                    first: action.payload.first || false,
                    last: action.payload.last || false,
                    offset: action.payload.pageable.offset || 0
                }
                state.error = null;
            })
            .addCase(traerAlumnos.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
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
            .addCase(buscarAlumnos.pending, (state) => {
                state.loading = true;
            })
            .addCase(buscarAlumnos.fulfilled, (state, action) => {
                state.loading = false;
                state.alumnos = action.payload;
                state.countAlumnos = action.payload.length;
            })
            .addCase(buscarAlumnos.rejected, (state) => {
                state.loading = false;
            })
            .addCase(asignarAlumnoCiclo.pending, (state) => {
                state.loading = true;
            })
            .addCase(asignarAlumnoCiclo.fulfilled, (state, action) => {
                state.loading = false;
                state.alumnosCSG.push(action.payload);
            })
            .addCase(asignarAlumnoCiclo.rejected, (state) => {
                state.loading = false;
            })
    }
})

export default alumnosSlice.reducer;