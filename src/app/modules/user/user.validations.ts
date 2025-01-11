import z from 'zod'
const createUserValidationSchema=z.object({
    body:z.object({
        name: z.string().trim().min(1, { message: "Name is required" }),
        email: z.string().email({ message: "Invalid email address" }),
        password: z
          .string()
          .min(8, { message: "Password must be at least 8 characters long" }),
        role: z.enum(["admin", "user"]).default("user"),
        isBlocked: z.boolean().default(false),
    })
})

export const UserValidations={createUserValidationSchema}