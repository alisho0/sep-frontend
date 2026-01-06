import { z } from "zod";

export const passwordSchema = z.object({
    contrasenia: z.string().min(3, "La contraseña actual es obligatoria."),
    nuevaContrasenia: z.string()
        .min(8, "Debe tener al menos 8 caracteres.")
        .regex(/[A-Z]/, "Debe tener al menos una mayúscula.")
        .regex(/[0-9]/, "Debe tener al menos un número.")
        .regex(/[^A-Za-z0-9]/, "Debe tener al menos un símbolo."),
    confirmarContrasenia: z.string(),
}).refine(
    (data) => data.nuevaContrasenia === data.confirmarContrasenia, {
        message: "Las contraseñas no coinciden",
        path: ["confirmarContrasenia"]
    }
);