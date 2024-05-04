import { loginGalleryInputSchema } from "~/server/schema";
import { AuthService } from "~/server/service/auth.service";
import { EventExecutorResponse } from "../../../type";

export default eventHandler(async (event): Promise<EventExecutorResponse> => {
  const body = await readValidatedBody(event, loginGalleryInputSchema.safeParse);

  if (!body.success) {
    setResponseStatus(event, 400);

    return {
      success: false,
      message: body.error.errors[0].message,
    };
  }

  const { gallery: galleryInput, pincode: pincodeInput } = body.data;
  
  const isValid = await AuthService.getInstance().checkPassword({
    gallery: galleryInput,
    pincode: pincodeInput,
  });

  if (!isValid) {
    setResponseStatus(event, 401);

    return {
      success: false,
      message: 'Invalid pincode.',
    };
  }

  const token = await AuthService.getInstance().generateJWTToken({
    gallery: galleryInput,
  });

  setResponseStatus(event, 200);

  return {
    success: true,
    message: 'Auth success.',
    data: {
      token,
    },
  };
});
