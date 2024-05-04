import { AuthService } from "~/server/service";

export default defineEventHandler((event) => {
  const url = event.node.req.url;
  if (!url?.startsWith('/api/') || url?.startsWith('/api/auth') && url !== '/api/auth/user') {
    return;
  }
  
  const authorizationHeader = getRequestHeader(event, 'Authorization');

  if (authorizationHeader === undefined) {
    throw createError({
      statusCode: 401,
      message: 'Authorization header not found.',
    });
  }
  
  const [, token] = authorizationHeader.split('Bearer ');
  
  const user = AuthService.getInstance().getUserByToken(token);
  
  if (!user) {
    throw createError({
      statusCode: 401,
      message: 'Invalid user token.',
    });
  }

  event.context.user = user;
})