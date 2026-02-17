import z from "zod";
import { personaSchema } from "./personaSchema";

export const editarUsuarioSchema = personaSchema.extend({
    username: z.email("El correo electrónico no es válido").min(5, "El correo electrónico debe tener al menos 5 caracteres."),
    rol: z.enum(["ADMIN", "MAESTRO", "DIRECTOR"], "El rol debe ser ADMIN, MAESTRO o DIRECTOR.")
})

/* 
        setValue("nombre", usuario.nombre || "");
        setValue("apellido", usuario.apellido || "");
        setValue("username", usuario.username || "");
        setValue("dni", usuario.dni || "");
        setValue("domicilio", usuario.domicilio || "");
        setValue("rol", usuario.rol || "");
*/