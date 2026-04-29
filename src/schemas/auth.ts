import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().min(2, {
    message: "O nome de utilizador é obrigatório.",
  }),
  password: z
    .string()
    .min(6, { message: "A palavra-passe é obrigatório." }),
});

export type LoginDTO = z.infer<typeof loginSchema>
