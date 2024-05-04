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
  title: z.string({
    message: 'Image title is required.'
  }).max(120, {
    message: 'Max title size: 120 characters.',
  }),
  description: z.string({
    message: 'Description must be a string'
  }).max(300, {
    message: 'Max description size: 300 characters.',
  }).nullable().optional(),
}, {
  message: 'Input with image, title and description properties is required.',
});

export const getImageInputSchema = z.object({
  image: z.string({
    message: 'image param is required.'
  }),
  username: z.string({
    message: 'username param is required.'
  }),
});

export const getGalleryListInputSchema = z.object({
  username: z.string({
    message: 'username param is required.'
  }),
});

export const deleteImageInputSchema = z.object({
  image: z.string({
    message: 'image property is required.'
  }),
}, {
  message: 'Input with image property is required.',
});
