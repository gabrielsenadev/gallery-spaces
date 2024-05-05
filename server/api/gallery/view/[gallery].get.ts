import { getGalleryListInputSchema } from "~/server/schema";
import { GalleryService } from "~/server/service/";
import { EventExecutorResponse } from "~/server/type";
import { createEventResponse } from "~/server/utils";

export default eventHandler(async (event): Promise<EventExecutorResponse> => {
  try {
    const input = await getValidatedRouterParams(event, getGalleryListInputSchema.safeParse);

    if (!input.success) {
      return createEventResponse({
        event,
        code: 400,
        success: false,
        message: input.error.errors[0]?.message,
      });
    }

    const { gallery } = input.data;

    const images = await GalleryService.getInstance().getImages(gallery);

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
      data: {
        gallery,
        images,
      },
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
