import { UserIcon } from '@heroicons/react/20/solid'
import React, { useState } from 'react'

export const Navbar = () => {

    const [mostrar, setMostrar] = useState(false);

    const paginas = [
        { nombre: 'Inicio', enlace: '#' },
        { nombre: 'Grados', enlace: '#' },
        { nombre: 'Estudiantes', enlace: '#' },
    ]

  return (
    <>
        <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
            <div className="text-indigo-600 font-bold text-xl">EduGestión</div>
            
            <ul className="flex space-x-6 text-gray-800 font-medium">
                <li><a href="#" className="hover:text-indigo-600 transition duration-200">Inicio</a></li>
                <li><a href="#" className="hover:text-indigo-600">Alumnos</a></li>
                <li><a href="#" className="hover:text-indigo-600">Grados</a></li>
            </ul>

            <div className="relative">
                <button
                onClick={() => setMostrar(!mostrar)}
                className="flex items-center gap-2 px-3 py-2 h-10 w-10 rounded-full bg-indigo-600"
                >
                {/* Avatar con emoji */}
                <UserIcon className='w-5 h-5'/>
                </button>

                {/* Dropdown */}
                {mostrar && (
                <div className="absolute right-0 mt-4 w-48 bg-white text-gray-800 rounded-lg shadow-lg overflow-hidden z-10">
                    <a href="#" className="block px-4 py-2 hover:bg-gray-100">Mi cuenta</a>
                    <a href="#" className="block px-4 py-2 hover:bg-gray-100">Configuración</a>
                    <div className="border-t"></div>
                    <button
                    className="w-full text-left px-4 py-2 hover:bg-red-100 text-red-600"
                    >
                    Cerrar sesión
                    </button>
                </div>
                )}
            </div>
        </nav>
    </>
  )
}