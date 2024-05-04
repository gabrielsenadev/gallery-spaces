import { loginUserInputSchema } from "~/server/schema";
import { AuthService } from "~/server/service/";
import { EventExecutorResponse } from "../../../type";

export default eventHandler(async (event): Promise<EventExecutorResponse> => {
  try {
    if (!event.context.user) {

      return createEventResponse({
        event,
        success: false,
        code: 400,
        message: 'User not logged.'
      });
    }

    const { username } = event.context.user;

    await AuthService.getInstance().logoutUser(username);

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
