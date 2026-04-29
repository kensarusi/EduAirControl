import { email, refine, z } from "zod";
import { da } from "zod/v4/locales";

export const loginSchema = z.object({
    name: z
        .string()
        .min(2, "errors.name_short"),
    email: z
        .string()
        .min(1, "errors.required:_email"),
    password: z
        .string()
        .min(6, "errors.minLength:_password"),
    confirmPassword: z
        .string()

});
refine((data)=> data.password === data.confirmPassword, {
    message: "errors.passwords_dont_match",
    path: ["confirmPassword"]
})