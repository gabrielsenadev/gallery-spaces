import { createEventResponse } from "~/server/utils";
import { EventExecutorResponse } from "../../../type";
import { GalleryService } from "~/server/service/";
import { deleteImageInputSchema } from "~/server/schema";

export default eventHandler(async (event): Promise<EventExecutorResponse> => {
  try {
    const input = await getValidatedQuery(event, deleteImageInputSchema.safeParse);

  if (!input.success) {
    return createEventResponse({
      code: 400,
      event,
      success: false,
      message: input.error.errors[0].message,
    });
  }

  const { image } = input.data;

  const user = event.context.user;

  await GalleryService.getInstance().deleteImage({
    image,
    username: user.username,
  });

  return createEventResponse({
    event,
    success: true,
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
