import z from "zod";

export const editarUsuarioSchema = z.object({
    nombre: z.string().min(4, "El nombre debe tener al menos 4 caracteres."),
    apellido: z.string().min(2, "El apellido debe tener al menos 2 caracteres."),
    username: z.email(),
    dni: z.string().min(7, "El documento debe tener al menos 7 dígitos."),
    domicilio: z.string().optional(),
})

/* 
        setValue("nombre", usuario.nombre || "");
        setValue("apellido", usuario.apellido || "");
        setValue("username", usuario.username || "");
        setValue("dni", usuario.dni || "");
        setValue("domicilio", usuario.domicilio || "");
        setValue("rol", usuario.rol || "");
*/