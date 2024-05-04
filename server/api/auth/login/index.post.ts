import { loginUserInputSchema } from "~/server/schema";
import { AuthService } from "~/server/service/auth.service";
import { EventExecutorResponse } from "../../../type";
import { UserNotFoundError } from "~/server/error/user-not-found";

export default eventHandler(async (event): Promise<EventExecutorResponse> => {
  try {
    const body = await readValidatedBody(event, loginUserInputSchema.safeParse);

    if (!body.success) {
      setResponseStatus(event, 400);

      return {
        success: false,
        message: body.error.errors[0].message,
      };
    }

    const { username: usernameInput, pincode: pincodeInput } = body.data;

    const isValid = await AuthService.getInstance().checkPassword({
      username: usernameInput,
      pincode: pincodeInput,
    });

    if (!isValid) {
      setResponseStatus(event, 401);

      return {
        success: false,
        message: 'Invalid pincode.',
      };
    }

    const token = await AuthService.getInstance().generateJWTToken({
      username: usernameInput,
    });

    setResponseStatus(event, 200);

    return {
      success: true,
      message: 'Auth success.',
      data: {
        token,
      },
    };
  } catch (error) {

    if (error instanceof UserNotFoundError) {
      console.log('Unhandled error', error);
      setResponseStatus(event, 401);
      return {
        success: false,
        message: 'Invalid pincode.',
      };
    }

    console.error('Unhandled error when user tries login', error);
    setResponseStatus(event, 500);
    return {
      success: false,
      message: 'Internal server error.',
    };
  }
});
