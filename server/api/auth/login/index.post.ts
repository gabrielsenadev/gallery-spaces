import { loginUserInputSchema } from "~/server/schema";
import { AuthService } from "~/server/service";
import { EventExecutorResponse } from "../../../type";
import { UserNotFoundError } from "~/server/error/UserNotFound";

export default eventHandler(async (event): Promise<EventExecutorResponse> => {
  try {
    const body = await readValidatedBody(event, loginUserInputSchema.safeParse);

    if (!body.success) {
      return createEventResponse({
        event,
        success: false,
        code: 400,
        message: body.error.errors[0].message,
      });
    }

    const { username, password } = body.data;

    const isValid = await AuthService.getInstance().checkPassword({
      username,
      password,
    });

    if (!isValid) {

      return createEventResponse({
        event,
        success: false,
        code: 400,
        message: 'Invalid password',
      });
    }

    const token = await AuthService.getInstance().generateJWTToken({
      username,
    });

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
    if (error instanceof UserNotFoundError) {
      return createEventResponse({
        event,
        success: false,
        code: 400,
        message: 'Invalid password',
      });
    }

    console.error('Unhandled error', error);

    return createEventResponse({
      event,
      success: false,
      code: 500,
      message: 'Internal server error'
    });
  }
});
