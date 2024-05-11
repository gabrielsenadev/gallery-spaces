import { UserWithoutTokenError } from "~/errors/UserWithoutTokenError";

export default async () => {
  const token = await localStorage.getItem("auth:token");
  if (!token) {
    throw new UserWithoutTokenError();
  }

  const header = new Headers();
  header.set("Authorization", `Bearer ${token}`);
  return header;
};
