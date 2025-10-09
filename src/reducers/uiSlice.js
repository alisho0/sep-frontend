import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    modalAbierto: false,
    modalTipo: null,
    modalData: null
};

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        abrirModal: (state, action) => {
            state.modalAbierto = true;
            state.modalTipo = action.payload.tipo;
            state.modalData = action.payload.data || null;
        },
        cerrarModal: (state) => {
            state.modalAbierto = false;
            state.modalTipo = null;
            state.modalData = null;
        }
    }
})

export const { abrirModal, cerrarModal } = uiSlice.actions;
export default uiSlice.reducer;