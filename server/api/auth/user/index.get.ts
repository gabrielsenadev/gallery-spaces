import { EventExecutorResponse } from "~/server/type";

export default eventHandler(async (event): Promise<EventExecutorResponse> => {
  if (!event.context.user) {
    return createEventResponse({
      event,
      success: false,
      message: 'Invalid user.',
    });
  }

  return createEventResponse({
    event,
    success: true,
    data: event.context.user,
  });
});
