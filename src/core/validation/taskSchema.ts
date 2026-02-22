import { z } from "zod";

export const taskSchema = z.object({
  title: z
    .string()
    .min(3, "Mínimo 3 letras")
    .max(50, "Máximo 50 letras")
    .trim(),
  description: z.string().max(200).optional(),
});

export type TaskFormData = z.infer<typeof taskSchema>;
