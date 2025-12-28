import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUsuarios } from "../apis/usuariosApi";

export const listarUsuarios = createAsyncThunk("usuarios/listar", async () => {
  const data = await getUsuarios();
  return data;
});

const usuariosSlice = createSlice({
  name: "usuarios",
  initialState: {
    usuarios: [],
    loading: false
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(listarUsuarios.pending, (state) => {
        state.loading = true;
      })
      .addCase(listarUsuarios.fulfilled, (state, action) => {
        state.loading = false;
        state.usuarios = action.payload;
      })
      .addCase(listarUsuarios.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export default usuariosSlice.reducer;