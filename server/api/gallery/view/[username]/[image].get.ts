import { getImageInputSchema } from "~/server/schema";
import { GalleryService } from "~/server/service/";

export default eventHandler(async (event) => {
  try {
    const input = await getValidatedRouterParams(event, getImageInputSchema.safeParse);

    if (!input.success) {
      return createEventResponse({
        event,
        code: 400,
        success: false,
        message: input.error.errors[0]?.message,
      });
    }

    const { username, image: imageId } = input.data;

    const image = await GalleryService.getInstance().getImage(username, imageId);

    if (!image) {
      return createEventResponse({
        event,
        code: 404,
        success: false,
        message: 'Image not found.',
      });
    }

    if (!image.metadata.type || typeof image.metadata.type !== 'string') {
      return createEventResponse({
        event,
        code: 500,
        success: false,
        message: 'Invalid image format type.',
      });
    }

    setResponseHeader(event, 'content-type', image.metadata.type);
    return image.data;

  } catch (error) {
    console.log('Unhandled error', error);
    return createEventResponse({
      code: 500,
      event,
      success: false,
      message: 'Internal Server Error',
    });
  }
});
