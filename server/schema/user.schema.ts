import { z } from "zod";
import { imageSchema } from "./image.schema";

export const loginUserInputSchema = z.object({
  username: z.string({
    message: 'Username name is required.',
  }).max(250, {
    message: 'Invalid Username name. Max length: 250 characters.',
  }).regex(/^(?=.*[a-zA-Z]{1,})(?=.*[\d]{0,})[a-zA-Z0-9]{1,150}$/, {
    message: 'Insert a valid username without special characters.',
  }),
  password: z.string({
    message: 'password is required.',
  }).min(6, {
    message: 'Enter a password with at least 6 characters.'
  }),
}, {
  message: 'Input with username and password properties is required.',
});

export const createUserInputSchema = z.object({
  ...loginUserInputSchema.shape,
  image: imageSchema.optional().nullable().default(null),
}, {
  message: 'Input with username and password properties is required.',
});
