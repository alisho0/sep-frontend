import z from "zod";
import { personaSchema } from "./personaSchema";

export const alumnoEditarSchema = personaSchema.extend({
    discapacidad: z.boolean(),
    detalleDiscap: z.string().optional(), // considerar hacer esto un campo requerido si discapacidad es true
    discapacidadesSeleccionadas: z.array(z.number()).optional()
}).refine((data) => {
    if (data.discapacidad) {
        return !!data.detalleDiscap && data.discapacidadesSeleccionadas.length > 0;
    }
    return true; // Si no tiene discapacidad, no es necesario validar las discapacidades seleccionadas
}, {
    message: "Debe completar detalle y seleccionar al menos una discapacidad",
    path: ["detalleDiscap"], // campo donde mostrar el error
})