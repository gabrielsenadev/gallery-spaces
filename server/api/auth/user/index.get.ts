import { AuthService } from "~/server/service/auth.service";
import { EventExecutorResponse } from "../../../type";

export default eventHandler(async (event): Promise<EventExecutorResponse> => {
  try {
    const authorizationHeader = getRequestHeader(event, 'Authorization');
    if (authorizationHeader === undefined) {
      setResponseStatus(event, 401);
      return {
        message: 'Authorization header is required.',
        success: false,
      };
    }

    const [, token] = authorizationHeader.split('Bearer ');

    const user = AuthService.getInstance().getUserByToken(token);
    
    if (!user) {
      setResponseStatus(event, 401);

      return {
        success: false,
        message: 'Invalid token.',
      };
    }

    return {
      message: 'Valid token.',
      success: true,
      data: user,
    };

  } catch (error) {
    console.log('Unhandled exception, stack: ', error);

    setResponseStatus(event, 500);
    return {
      success: false,
      message: 'Sorry, we cannot verify your token.',
    };
  }
});
