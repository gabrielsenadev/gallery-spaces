import { loginUserInputSchema } from "~/server/schema";
import { EventExecutorResponse } from "~/server/type";
import { AuthService } from "~/server/service/";
import { getStore } from "@netlify/blobs";

export default eventHandler(async (event): Promise<EventExecutorResponse> => {
  try {
    const store = getStore('auth');
    console.log('store test', store);
    const body = await readValidatedBody(event, loginUserInputSchema.safeParse);

    if (!body.success) {
      return createEventResponse({
        event,
        success: false,
        code: 400,
        message: body.error.errors[0].message,
      });
    }

    const { username: usernameInput, pincode: pincodeInput } = body.data;

    const isUserExists = await AuthService.getInstance().checkUser({ username: usernameInput });

    if (isUserExists) {
      return createEventResponse({
        event,
        success: false,
        code: 401,
        message: 'User already exists.',
      });
    }

    await AuthService.getInstance().createUser({
      username: usernameInput,
      pincode: pincodeInput,
    });


    return createEventResponse({
      event,
      success: true,
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
