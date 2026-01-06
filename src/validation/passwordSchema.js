import z from "zod";

export const passwordSchema = z.object({
    contraseña: z.string().min(3, "La contraseña actual es obligatoria."),
    nuevaContraseña: z.string()
        .min(8, "Debe tener al menos 8 caracteres.")
        .regex(/[A-Z]/, "Debe tener al menos una mayúscula.")
        .regex(/[0-9]/, "Debe tener al menos un número.")
        .regex(/[^A-Za-z0-9]/, "Debe tener al menos un símbolo."),
    confirmarContraseña: z.string(),
}).refine(
    (data) => data.nuevaContraseña === data.confirmarContraseña, {
        message: "Las contraseñas no coinciden",
        path: ["confirmarContraseña"]
    }
)