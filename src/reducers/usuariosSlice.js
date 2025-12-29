import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { delUsuario, getUsuarios } from "../apis/usuariosApi";
import { register } from "../apis/authApi";
import { act } from "react";

export const listarUsuarios = createAsyncThunk("usuarios/listar", async () => {
  const data = await getUsuarios();
  return data;
});

export const registrarUsuario = createAsyncThunk("usuarios/registrar", async (usu) => {
  const data = await register(usu);
  return data;
});

export const eliminarUsuario = createAsyncThunk("usuarios/eliminar", async (id) => {
  const data = await delUsuario(id);
  return id;
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
      })
      .addCase(registrarUsuario.pending, (state) => {
        state.loading = true;
      })
      .addCase(registrarUsuario.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(registrarUsuario.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(eliminarUsuario.pending, (state) => {
        state.loading = true;
      })
      .addCase(eliminarUsuario.fulfilled, (state, action) => {
        state.loading = false;
        state.usuarios = state.usuarios.filter(u => u.id != action.payload);
      })
      .addCase(eliminarUsuario.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export default usuariosSlice.reducer;