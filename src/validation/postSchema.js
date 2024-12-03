import { z } from "zod";

const postSchema = z.object({
  image: z
    .custom((value) => value instanceof File && value.size > 0, {
      message: "Image is required",
    })
    .refine(
      (file) =>
        file instanceof File &&
        ["image/jpeg", "image/png", "image/webp"].includes(file.type),
      {
        message: "Only .jpeg, .png, or .webp files are allowed",
      }
    ),
  text: z
    .string()
    .min(6, { message: "Minimum 6 characters required" })
    .max(50, { message: "Maximum 50 characters allowed" }),
});

export default postSchema;
