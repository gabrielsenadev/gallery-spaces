import { getImageInputSchema } from "~/server/schema";
import { GalleryService } from "~/server/service/gallery.service";
import { EventExecutorResponse } from "~/server/type";

export default eventHandler(async (event) => {
  try {
    const query = await getValidatedQuery(event, getImageInputSchema.safeParse);
  
    if (!query.success) {
      setResponseStatus(event, 400);

      return {
        success: false,
        message: query.error.errors[0].message,
      };
    }

    const username = query.data.username ?? event.context.user?.username;
    const { image: imageId } = query.data;

    if (!username) {
      setResponseStatus(event, 400);
      return {
        success: false,
        message: 'Username is required.',
      };
    }

    const image = await GalleryService.getInstance().getGalleryImage(username, imageId);

    if (!image) {
      setResponseStatus(event, 404);

      return {
        message: 'Image not found.',
        success: false,
      }
    }

    if (!image.metadata.type || typeof image.metadata.type !== 'string') {
      setResponseStatus(event, 500);

      return {
        message: 'Invalid image format.',
        success: false,
      }
    }

    setResponseHeader(event, 'content-type', image.metadata.type);
    return image.data;

  } catch (error) {
    console.log('Unhandled error', error);
    setResponseStatus(event, 500);

    return {
      message: 'Internal Server Error.',
      success: false,
    }
  }
});
