import { z } from "zod";

export const loginSchema = z.object({
    email: z
        .string()
        .min(1, "errors.required:_email")
        .email("errors.invalid:_email"),
    password: z
        .string()
        .min(6, "errors.minLength:_password")
});