import { jwtDecode } from 'jwt-decode';
import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

export const PrivateRoute = ({ allowedRoles }) => {
  const token = localStorage.getItem("token");

  if (!token) return <Navigate to="/" />;

  const decoded = jwtDecode(token);
  const userRoles = decoded.rol || [];

  // Verificamos si el usuario tiene alguno de los roles permitidos
  const hasAccess = allowedRoles ? allowedRoles.some(role => userRoles.includes(role)) : true;

  return hasAccess ? <Outlet /> : <Navigate to="/configuracion" />;


}
