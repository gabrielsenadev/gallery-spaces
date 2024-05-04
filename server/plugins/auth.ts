import { defineNuxtPlugin } from "nuxt/app";
import auth from "../middlewares/auth";

const AUTH_ROUTES = [
  '/api/auth/user',
  '/api/auth/logout',
  '/api/gallery/upload/',
  '/api/gallery/delete',
];

export default defineNitroPlugin(async (plugin) => {
  AUTH_ROUTES.forEach(route => plugin.router.use(route, auth))
});
