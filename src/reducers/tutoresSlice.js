import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { traerTutores } from "../apis/tutoresApi";

export const listarTutores = createAsyncThunk('tutores/listar', async ({token}) => {
    const data = await traerTutores(token);
    return data;
});

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
    }
})

export default tutoresSlice.reducer;