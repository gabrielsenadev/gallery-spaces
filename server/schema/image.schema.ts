import { z } from "zod";

const MAX_IMAGE_SIZE = 5 * 1024 * 1024 * 1024;

export const uploadImageInputSchema = z.object({
  image: z.any()
    .refine(file => file.type.startsWith('image'), {
      message: 'Invalid image type.',
    }).refine((file) => {
      return file.size <= MAX_IMAGE_SIZE;
    }, {
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
  }).optional().default(''),
}, {
  message: 'Input with image, title and description properties is required.',
});

export const getImageInputSchema = z.object({
  key: z.string({
    message: 'key param is required.'
  }),
});

export const getGalleryListInputSchema = z.object({
  gallery: z.string({
    message: 'gallery param is required.'
  }),
});

export const deleteImageInputSchema = z.object({
  image: z.string({
    message: 'image property is required.'
  }),
}, {
  message: 'Input with image property is required.',
});
