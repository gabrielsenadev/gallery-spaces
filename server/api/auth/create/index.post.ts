import { createLoginUserInputSchema } from "~/server/schema";
import { EventExecutorResponse } from "~/server/type";
import { AuthService } from "~/server/service/";

export default eventHandler(async (event): Promise<EventExecutorResponse> => {
  try {
    const body = await readValidatedBody(event, createLoginUserInputSchema.safeParse);

    if (!body.success) {
      setResponseStatus(event, 400);
      return {
        success: false,
        message: body.error.errors[0].message,
      };
    }

    const { username: usernameInput, pincode: pincodeInput } = body.data;

    const existsGallery = await AuthService.getInstance().checkUser({ username: usernameInput });

    if (existsGallery) {
      setResponseStatus(event, 401);

      return {
        success: false,
        message: 'Gallery already exists.',
      };
    }

    await AuthService.getInstance().createUser({
      username: usernameInput,
      pincode: pincodeInput,
    });

    setResponseStatus(event, 200);

    return {
      success: true,
      message: 'Gallery created.',
    };
  } catch (error) {
    setResponseStatus(event, 500);

    return {
      message: 'There are some unhandled error, sorry.',
      success: false,
    }
  }
});
