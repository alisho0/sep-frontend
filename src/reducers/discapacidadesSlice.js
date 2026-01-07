import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { delDiscapacidad, getDiscapacidades, postDiscapacidad } from "../apis/discapacidadesApi";
import { traerPorAlumnoId } from "./alumnosSlice";

export const listarDiscapacidades = createAsyncThunk('discapacidad/listar', async () => {
    try {
        const data = getDiscapacidades();
        return data
    } catch (error) {
        throw new Error("Error al traer discapacidades");
    }
})

export const nuevaDiscapacidad = createAsyncThunk('discapacidad/crear', async(nombre) => {
    const data = postDiscapacidad(nombre);
    return data;
})

export const eliminarDiscapacidad = createAsyncThunk('discapacidad/borrar', async (id) => {
    const data = delDiscapacidad(id);
    return id;
})

const discapacidadesSlice = createSlice({
    name: 'discapacidad',
    initialState: {
        discapacidades: [],
        loading: false
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(listarDiscapacidades.pending, (state) => {
                state.loading = true;
            })
            .addCase(listarDiscapacidades.fulfilled, (state, action) => {
                state.loading = false;
                state.discapacidades = action.payload;
            })
            .addCase(listarDiscapacidades.rejected, (state) => {
                state.loading = true;
            }) 
            .addCase(nuevaDiscapacidad.pending, (state) => {
                state.loading = true;
            })
            .addCase(nuevaDiscapacidad.fulfilled, (state, action) => {
                state.loading = false;
                state.discapacidades.push(action.payload);
            })
            .addCase(nuevaDiscapacidad.rejected, (state) => {
                state.loading = false;
            })
            .addCase(eliminarDiscapacidad.pending, (state) => {
                state.loading = true;
            })
            .addCase(eliminarDiscapacidad.fulfilled, (state, action) => {
                state.loading = false;
                state.discapacidades = state.discapacidades.filter(d => d.id != action.payload);
            })
            .addCase(eliminarDiscapacidad.rejected, (state) => {
                state.loading = false;
            })
            .addCase(traerPorAlumnoId.fulfilled, (state, action) => {
                const { discapacidades, ...resto } = action.payload;
                state.discapacidades =  discapacidades;
            })
    }
})

export default discapacidadesSlice.reducer;