import { createUserInputSchema, loginUserInputSchema } from "~/server/schema";
import { EventExecutorResponse } from "~/server/type";
import { AuthService } from "~/server/service/";
import { getStore } from "@netlify/blobs";

export default eventHandler(async (event): Promise<EventExecutorResponse> => {
  try {
    const input = await AuthService.getInstance().getCreateRequestInput(event);

    if (!input.success) {
      return createEventResponse({
        event,
        success: false,
        code: 400,
        message: input.error.errors[0].message,
      });
    }

    const { username, password, image } = input.data;

    const isUserExists = await AuthService.getInstance().checkUser({ username });

    if (isUserExists) {
      return createEventResponse({
        event,
        success: false,
        code: 401,
        message: 'User already exists.',
      });
    }

    await AuthService.getInstance().createUser({
      username,
      password,
      image
    });

    const token = await AuthService.getInstance().generateJWTToken({ username });
    const user = await AuthService.getInstance().getUserByToken(token);

    return createEventResponse({
      event,
      success: true,
      data: {
        token,
        user,
      },
    });
  } catch (error) {
    console.error('Unhandled error', error);

    return createEventResponse({
      event,
      success: false,
      code: 500,
      message: 'Internal server error'
    });
  }
});
