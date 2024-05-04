import { getGalleryListInputSchema } from "~/server/schema";
import { GalleryService } from "~/server/service/gallery.service";
import { EventExecutorResponse } from "~/server/type";
import { createEventResponse } from "~/server/utils";

export default eventHandler(async (event): Promise<EventExecutorResponse> => {
  try {
    const query = await getValidatedQuery(event, getGalleryListInputSchema.safeParse);
    
    const username = query.data?.username ?? event.context.user?.username;

    if (!username) {
      return createEventResponse({
        event,
        code: 400,
        success: false,
        message: 'Username is required.'
      });
    }

    const images = await GalleryService.getInstance().getGalleryImages(username);

    if (!images) {
      return createEventResponse({
        event,
        code: 404,
        success: false,
        message: 'Image source not found.'
      });
    }

    return createEventResponse({
      event,
      success: true,
      data: images,
    });

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
