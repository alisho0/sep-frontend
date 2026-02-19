import z from "zod";

export const observacionSchema = z.object({
    contenido: z.string().min(3, "La descripción es obligatoria y debe tener al menos 3 caracteres."),
    motivo: z.enum(["SOCIAL", "CONDUCTA", "PEDAGOGICO", "DERIVACION", "OTRO"], "El motivo es obligatorio y debe ser uno de los siguientes: SOCIAL, CONDUCTA, PEDAGOGICO, DERIVACION, OTRO."),
    fecha: z.string().optional(),
    nombreUsuario: z.string().optional(),
    idRegistro: z.int("Debe seleccionar un alumno."),
})
