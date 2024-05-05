import { createEventResponse } from "~/server/utils";
import { EventExecutorResponse } from "../../../type";
import { GalleryService } from "~/server/service/";

export default eventHandler(async (event): Promise<EventExecutorResponse> => {
  try {
    const input = await GalleryService.getInstance().getUploadRequestInput(event);

    if (!input.success) {
      return createEventResponse({
        code: 400,
        event,
        success: false,
        message: input.error.errors[0].message,
      });
    }

    const { image, title, description } = input.data;

    const { username } = event.context.user;

    const success = await GalleryService.getInstance().uploadImage({
      image,
      title,
      description: description ?? '',
      username,
    });

    if (success) {
      return createEventResponse({
        event,
        success: true,
      });
    }

    return createEventResponse({
      event,
      success: false,
      code: 500,
      message: 'Upload failed, try again.',
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
