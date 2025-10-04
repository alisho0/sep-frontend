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
