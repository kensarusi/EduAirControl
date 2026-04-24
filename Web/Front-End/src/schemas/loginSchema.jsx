import { z } from "zod";

export const loginSchema = z.object({
    email: z
        .string()
        .min(1, "errors.required_email")
        .email("errors.invalid_email"),
    password: z
        .string()
        .min(6, "errors.password_min")
});