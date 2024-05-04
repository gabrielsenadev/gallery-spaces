import { z } from "zod";

export const createGalleryInputSchema = z.object({
  gallery: z.string({
    message: 'Gallery name is required.',
  }).max(250, {
    message: 'Invalid Gallery name. Max length: 250 characters.',
  }).regex(/^(?=.*[a-zA-Z]{1,})(?=.*[\d]{0,})[a-zA-Z0-9]{1,150}$/, {
    message: 'Insert a valid Gallery name without special characters.',
  }),
  pincode: z.string({
    message: 'Pincode is required.',
  }).regex(/^\d{4}$/, {
    message: 'Invalid Pincode format. Use only 4 digits.',
  }),
}, {
  message: 'Input with gallery and pincode properties is required.',
});

export const loginGalleryInputSchema = z.object({
 ...createGalleryInputSchema.shape,
}, {
  message: 'Input with gallery and pincode properties is required.',
});
