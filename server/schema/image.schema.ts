import { z } from "zod";

const MAX_IMAGE_SIZE = 5 * 1024 * 1024 * 1024;

export const uploadImageInputSchema = z.object({
  image: z.instanceof(File, {
    message: 'Invalid field format. Only accepts images.',
  }).refine(image => image.type.startsWith('image'), {
    message: 'Invalid image type.',
  }).refine((image) => image.size <= MAX_IMAGE_SIZE, {
    message: 'File too large.',
  }),
  title: z.string().max(120),
  description: z.string().max(300).optional(),
}, {
  message: 'Input with image, title and description properties is required.',
});

export const getImageInputSchema = z.object({
  image: z.string({
    message: 'Image query is required.'
  }),
  username: z.string().optional(),
});

export const getGalleryListInputSchema = z.object({
  username: z.string().optional(),
});

export const deleteImageInputSchema = z.object({
  imageId: z.string(),
}, {
  message: 'Input with imageId property is required.',
});
