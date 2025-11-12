import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getDiscapacidades } from "../apis/discapacidadesApi";

export const listarDiscapacidades = createAsyncThunk('discapacidad/listar', async () => {
    try {
        const data = getDiscapacidades();
        return data
    } catch (error) {
        throw new Error("Error al traer discapacidades");
    }
})

export const nuevaDiscapacidad = createAsyncThunk('discapacidad/crear', async(nombre) => {
    // Funcion
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
    }
})

export default discapacidadesSlice.reducer;