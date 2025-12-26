import { AcademicCapIcon, Bars3Icon, Cog8ToothIcon, HomeIcon, UserGroupIcon, UsersIcon, XMarkIcon } from "@heroicons/react/16/solid";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { jwtDecode } from 'jwt-decode';

export const Sidebar = ({ open, setOpen }) => {
  const location = useLocation();
  const token = localStorage.getItem("token");

  let usuario = null;
  let rol = null;
  if (token) {
    const claims = token ? jwtDecode(token) : null;
    usuario = claims.sub;
    rol = claims.rol
  }
  
  const navigation = [
    { name: "Inicio", href: "/menu", icon: HomeIcon, show: true, id: 1 },
    { name: "Alumnos", href: "/alumnos", icon: UsersIcon, show: true, id: 2 },
    { name: "Grados", href: "/grados", icon: AcademicCapIcon, show: true, id: 3 },
    { name: "Discapacidades", href: "/discapacidades", icon: Cog8ToothIcon, show: true, id: 4 },
    { name: "Usuarios", href: "/usuarios", icon: UserGroupIcon, show: true, id: 5 },
    { name: "Configuración", href: "#", icon: Cog8ToothIcon, show: true, id: 6 },
  ]

  return (
    <>
      {/* Botón toggle en mobile (fuera del sidebar) */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="p-2 m-4 bg-indigo-600 hover:bg-indigo-700 transition-colors text-white rounded-lg z-50 fixed top-4 left-4 cursor-pointer"
          aria-label="Abrir sidebar"
        >
          <Bars3Icon className="h-6 w-6" />
        </button>
      )}

      {/* Overlay en mobile */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-zinc-900 text-white transform transition-transform duration-300 ease-in-out z-40
          ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Encabezado con botón integrado */}
        <div className="flex items-center justify-between p-4 border-b border-zinc-700">
          <div className="flex flex-col gap-3 items-start justify-between">
            <h2 className="text-xl font-bold">Sistema Escolar</h2>
            <div>
              <p className="text-gray-100 font-semibold">{usuario ? usuario : "Usuario no encontrado"}</p>
              <span className="text-sm italic text-gray-400">{rol ? rol : "Rol no encontrado"}</span>
            </div>
          </div>
          
          <button
            onClick={() => setOpen(false)}
            className="p-2 bg-indigo-600 hover:bg-indigo-700 transition-colors text-white rounded-lg md:block cursor-pointer"
            aria-label="Cerrar sidebar"
            >
              <XMarkIcon className="h-5 w-5" />
          </button>
        </div>

        <nav>
          <ul className="flex flex-col gap-2 p-4 text-gray-100 font-medium">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href
              const Icon = item.icon
              return (
                <li key={item.id}>
                  <Link to={item.href} className={`hover:text-indigo-400 rounded-lg transition-colors flex gap-3 px-3 py-2 font-medium items-center ${isActive ? "bg-zinc-800" : "hover:bg-gray-600/50"}`}>
                    <Icon className="w-5 h-5" />
                    {item.name}
                  </Link>
                </li>
            )})}
          </ul>
        </nav>
      </aside>

    </>
  )
}
