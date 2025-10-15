import React from 'react'
import Swal from 'sweetalert2'

export const showAlert = ({ title, text, icon = 'info', confirmButtonText = 'Confirmar' }) => {
  return Swal.fire({
        title,
        text,
        icon,
        confirmButtonText,
        customClass: {
        confirmButton: 'bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700',
        popup: 'rounded-xl',
        },
        buttonsStyling: false,
  })
}

export const confirmationAlert = ({ title, text, icon = 'warning', confirmButtonText = 'Aceptar', cancelButtonText = 'Cancelar' }) => {
  return Swal.fire({
        title,
        text,
        icon,
        showCancelButton: true,
        confirmButtonText,
        cancelButtonText,
        customClass: {
        confirmButton: 'bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 mr-2',
        cancelButton: 'bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 ml-2',
        popup: 'rounded-xl',
        },
        buttonsStyling: false,
  })
}
