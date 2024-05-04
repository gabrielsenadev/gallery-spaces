import { loginUserInputSchema } from "~/server/schema";
import { EventExecutorResponse } from "~/server/type";
import { AuthService } from "~/server/service/";

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

    const isUserExists = await AuthService.getInstance().checkUser({ username: usernameInput });

    if (isUserExists) {
      setResponseStatus(event, 401);

      return {
        success: false,
        message: 'Username already exists.',
      };
    }

    await AuthService.getInstance().createUser({
      username: usernameInput,
      pincode: pincodeInput,
    });

    setResponseStatus(event, 200);

    return {
      success: true,
      message: 'User created.',
    };
  } catch (error) {
    console.error('Unhandled error when user tries login', error);
    setResponseStatus(event, 500);

    return {
      message: 'Internal server error',
      success: false,
    }
  }
});
