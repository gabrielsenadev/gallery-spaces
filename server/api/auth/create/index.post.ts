import { createGalleryInputSchema } from "~/server/schema";
import { EventExecutorResponse } from "~/server/type";
import { AuthService } from "~/server/service/";

export default eventHandler(async (event): Promise<EventExecutorResponse> => {
  try {
    const body = await readValidatedBody(event, createGalleryInputSchema.safeParse);

    if (!body.success) {
      setResponseStatus(event, 400);
      return {
        success: false,
        message: body.error.errors[0].message,
      };
    }

    const { gallery: galleryInput, pincode: pincodeInput } = body.data;

    const existsGallery = await AuthService.getInstance().checkGallery({ gallery: galleryInput });

    if (existsGallery) {
      setResponseStatus(event, 401);

      return {
        success: false,
        message: 'Gallery already exists.',
      };
    }

    await AuthService.getInstance().createGallery({
      gallery: galleryInput,
      pincode: pincodeInput,
    });

    setResponseStatus(event, 200);

    return {
      success: true,
      message: 'Gallery created.',
    };
  } catch (error) {
    setResponseStatus(event, 500);

    return {
      message: 'There are some unhandled error, sorry.',
      success: false,
    }
  }
});
