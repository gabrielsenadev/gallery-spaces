import { getGalleryListInputSchema } from "~/server/schema";
import { GalleryService } from "~/server/service/";
import { EventExecutorResponse } from "~/server/type";
import { createEventResponse } from "~/server/utils";

export default eventHandler(async (event): Promise<EventExecutorResponse> => {
  try {
    const galleries = await GalleryService.getInstance().getGalleries();

    return createEventResponse({
      event,
      success: true,
      data: galleries,
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
