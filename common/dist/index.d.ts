import z from "zod";
export declare const signupInput: z.ZodObject<{
    email: z.ZodString;
    name: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    name: string;
    password: string;
}, {
    email: string;
    name: string;
    password: string;
}>;
export declare const signinInput: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
}, {
    email: string;
    password: string;
}>;
export declare const postInput: z.ZodObject<{
    title: z.ZodString;
    content: z.ZodString;
    image: z.ZodEffects<z.ZodEffects<z.ZodType<File, z.ZodTypeDef, File>, File, File>, File, File>;
    status: z.ZodString;
}, "strip", z.ZodTypeAny, {
    status: string;
    title: string;
    content: string;
    image: File;
}, {
    status: string;
    title: string;
    content: string;
    image: File;
}>;
export declare const updatePostInput: z.ZodObject<{
    title: z.ZodString;
    content: z.ZodString;
    id: z.ZodString;
    image: z.ZodOptional<z.ZodEffects<z.ZodEffects<z.ZodType<File, z.ZodTypeDef, File>, File, File>, File, File>>;
    status: z.ZodString;
}, "strip", z.ZodTypeAny, {
    status: string;
    title: string;
    content: string;
    id: string;
    image?: File | undefined;
}, {
    status: string;
    title: string;
    content: string;
    id: string;
    image?: File | undefined;
}>;
export type SignupInput = z.infer<typeof signupInput>;
export type SigninInput = z.infer<typeof signinInput>;
export type PostInput = z.infer<typeof postInput>;
export type UpdatePostInput = z.infer<typeof updatePostInput>;
