import { jwtDecode } from "jwt-decode";

export const isAdmin = (token) => {
  if (!token) return false;
  try {
    const claims = jwtDecode(token);
    return claims.rol.includes("ADMIN", "DIRECTOR");
  } catch (e) {
    return false;
  }
}

export const extractUsername = (token) => {
    if (!token) return null;
    try {
        const claims = jwtDecode(token);  
      return claims.sub;
    } catch (error) {
      return null;
    }
}