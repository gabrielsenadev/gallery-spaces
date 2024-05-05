import { getImageInputSchema } from "~/server/schema";
import { ImageService } from "~/server/service/";

export default eventHandler(async (event) => {
  try {
    const input = await getValidatedQuery(event, getImageInputSchema.safeParse);

    if (!input.success) {
      return createEventResponse({
        event,
        code: 400,
        success: false,
        message: input.error.errors[0]?.message,
      });
    }

    const { key } = input.data;

    const image = await ImageService.getInstance().getImage(key);

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
    setResponseHeader(event, 'content-length', image.data.size);
    
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
