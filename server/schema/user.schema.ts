import { z } from "zod";

export const createLoginUserInputSchema = z.object({
  username: z.string({
    message: 'Username name is required.',
  }).max(250, {
    message: 'Invalid Username name. Max length: 250 characters.',
  }).regex(/^(?=.*[a-zA-Z]{1,})(?=.*[\d]{0,})[a-zA-Z0-9]{1,150}$/, {
    message: 'Insert a valid username without special characters.',
  }),
  pincode: z.string({
    message: 'Pincode is required.',
  }).regex(/^\d{4}$/, {
    message: 'Invalid Pincode format. Use only 4 digits.',
  }),
}, {
  message: 'Input with username and pincode properties is required.',
});
