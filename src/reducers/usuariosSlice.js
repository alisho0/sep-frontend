import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { delUsuario, editUsuario, getUsuarios, obtenerUsuario } from "../apis/usuariosApi";
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

export const obtenerUsuarioCompleto = createAsyncThunk("usuario/detalle", async (id) => {
  const data = await obtenerUsuario(id);
  return data;
})
export const modificarUsuario = createAsyncThunk("usuario/editar", async ({id, usuario}) => {
  const data = await editUsuario(id, usuario);
  return data;
})

const usuariosSlice = createSlice({
  name: "usuarios",
  initialState: {
    usuarios: [],
    usuario: {},
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
      })
      .addCase(obtenerUsuarioCompleto.pending, (state) => {
        state.loading = true;
      })
      .addCase(obtenerUsuarioCompleto.fulfilled, (state, action) => {
        state.loading = false;
        state.usuario = action.payload;
      })
      .addCase(obtenerUsuarioCompleto.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(modificarUsuario.pending, (state) => {
        state.loading = true;
      })
      .addCase(modificarUsuario.fulfilled, (state, action) => {
        state.loading = false;
        // Actualizar el usuario modificado en el arreglo usuarios
        const updatedUser = action.payload;
        const idx = state.usuarios.findIndex(u => u.id === updatedUser.id);
        if (idx !== -1) {
          state.usuarios[idx] = updatedUser;
        }
      })
      .addCase(modificarUsuario.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export default usuariosSlice.reducer;