import { AuthService } from "~/server/service";

const AUTH_ROUTES = [
  '/api/auth/user',
  '/api/auth/logout',
  '/api/gallery/upload',
  '/api/gallery/delete',
];

export default defineEventHandler(async (event) => {
  const url = getRequestURL(event);
  
  if (!AUTH_ROUTES.some(route => url.pathname.startsWith(route))) {
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
  
  const user = await AuthService.getInstance().getUserByToken(token);

  if (!user) {
    throw createError({
      statusCode: 401,
      message: 'Invalid user token.',
    });
  }

  event.context.user = user;
})