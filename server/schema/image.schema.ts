import { z } from "zod";

export const addImageInputSchema = z.object({
  image: z.instanceof(File),
  title: z.string(),
  description: z.string().optional(),
}, {
  message: 'Input with image, title and description properties is required.',
});

export const deleteImageInputSchema = z.object({
  imageId: z.string(),
}, {
  message: 'Input with imageId property is required.',
});
