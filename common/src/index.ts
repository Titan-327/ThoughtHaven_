import z from "zod"
export const signupInput=z.object({
    email:z.string().email(),
    name:z.string(),
    password:z.string()
})

export const signinInput=z.object({
    email:z.string().email(),
    password:z.string()
})


export const postInput=z.object({
    title:z.string(),
    content:z.string(),
    image: z
        .instanceof(File)
        .refine((file) => file.size > 0, "Image file is required") // Ensures file is not empty
        .refine((file) => ["image/jpeg", "image/png", "image/webp"].includes(file.type), "Only JPG, PNG, and WEBP are allowed"), // Restrict file type
    status:z.string()
    })

 
export const updatePostInput = z.object({
    title: z.string(), // Title must be a non-empty string
    content: z.string(), // Content must be a non-empty string
    id: z.string(), // ID must be a non-empty string
    image: z
      .instanceof(File)
      .refine((file) => file.size > 0, "Image file is required") // Ensure the file is not empty
      .refine((file) => ["image/jpeg", "image/png", "image/webp"].includes(file.type), "Only JPG, PNG, and WEBP are allowed")
      .optional(), // Image is optional
     status:z.string()
  });

export type SignupInput=z.infer<typeof signupInput>
export type SigninInput=z.infer<typeof signinInput>
export type PostInput=z.infer<typeof postInput>
export type UpdatePostInput=z.infer<typeof updatePostInput>