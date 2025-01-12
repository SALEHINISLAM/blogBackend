import { z } from "zod";

// Define the Zod schema
export const createBlogValidationSchema = z.object({
    body: z.object({
        title: z.string()
            .trim()
            .min(1, { message: "Title is required" }),
        content: z.string()
            .trim()
            .min(1, { message: "Content is required" }),
        author: z.string()
            .regex(/^[0-9a-fA-F]{24}$/, { message: "Author must be a valid ObjectId" }).optional(),
        isPublished: z.boolean().optional(),
    })
});

// Type derived from the Zod schema
export const BlogValidations = { createBlogValidationSchema };
