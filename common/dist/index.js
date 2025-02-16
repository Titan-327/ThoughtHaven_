"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePostInput = exports.postInput = exports.signinInput = exports.signupInput = void 0;
const zod_1 = __importDefault(require("zod"));
exports.signupInput = zod_1.default.object({
    email: zod_1.default.string().email(),
    name: zod_1.default.string(),
    password: zod_1.default.string()
});
exports.signinInput = zod_1.default.object({
    email: zod_1.default.string().email(),
    password: zod_1.default.string()
});
exports.postInput = zod_1.default.object({
    title: zod_1.default.string(),
    content: zod_1.default.string(),
    image: zod_1.default
        .instanceof(File)
        .refine((file) => file.size > 0, "Image file is required") // Ensures file is not empty
        .refine((file) => ["image/jpeg", "image/png", "image/webp"].includes(file.type), "Only JPG, PNG, and WEBP are allowed"), // Restrict file type
    status: zod_1.default.string()
});
exports.updatePostInput = zod_1.default.object({
    title: zod_1.default.string(), // Title must be a non-empty string
    content: zod_1.default.string(), // Content must be a non-empty string
    id: zod_1.default.string(), // ID must be a non-empty string
    image: zod_1.default
        .instanceof(File)
        .refine((file) => file.size > 0, "Image file is required") // Ensure the file is not empty
        .refine((file) => ["image/jpeg", "image/png", "image/webp"].includes(file.type), "Only JPG, PNG, and WEBP are allowed")
        .optional(), // Image is optional
    status: zod_1.default.string()
});
