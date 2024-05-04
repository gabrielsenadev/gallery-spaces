import { EventExecutorResponse } from "~/server/type";

export default eventHandler(async (event): Promise<EventExecutorResponse> => {
  setResponseStatus(event, 200);
  return {
    message: 'Valid token.',
    success: true,
    data: event.context.user,
  };
});
