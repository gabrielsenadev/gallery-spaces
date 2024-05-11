import { H3Error } from "h3";
import { UserWithoutTokenError } from "~/errors/UserWithoutTokenError";

type AuthUser = {
  username: string;
};

type LoginInput = {
  username: string;
  password: string;
};

type LoginResponse = {
  success: boolean;
  data: {
    token: string;
    user: AuthUser;
  };
  message: string;
};

type GetAuthUserResponse = {
  success: boolean;
  data: AuthUser;
  message: string;
};

const getUserTokenAuthorizationHeader = async () => {
  const token = await localStorage.getItem("auth:token");
  if (!token) {
    throw new UserWithoutTokenError();
  }

  const header = new Headers();
  header.set("Authorization", `Bearer ${token}`);
  return header;
};

const user = ref<AuthUser | null>(null);
const isAuthenticated = computed(() => !!user.value);

async function signUp(form: FormData) {
  const response = await $fetch<LoginResponse>("/api/auth/create", {
    body: form,
    method: "POST",
  });
  localStorage.setItem("auth:token", response.data.token);
  user.value = response.data.user;
  return true;
}

async function upload(form: FormData) {
  const header = await getUserTokenAuthorizationHeader();
  await $fetch<LoginResponse>("/api/gallery/upload", {
    body: form,
    method: "POST",
    headers: header,
  });
  return true;
}

async function login({ username, password }: LoginInput) {
  const response = await $fetch<LoginResponse>("/api/auth/login", {
    body: JSON.stringify({
      username,
      password,
    }),
    method: "POST",
  });

  localStorage.setItem("auth:token", response.data.token);
  user.value = response.data.user;
  return true;
}

async function logout() {
  const header = await getUserTokenAuthorizationHeader();

  await $fetch<GetAuthUserResponse>("/api/auth/logout", {
    headers: header,
    method: "POST",
  });

  localStorage.removeItem("auth:token");
  user.value = null;
}

async function fetchUser() {
  const header = await getUserTokenAuthorizationHeader();

  const response = await $fetch<GetAuthUserResponse>("/api/auth/user", {
    headers: header,
    method: "GET",
  });

  user.value = response.data;
}

const init = async () => {
  try {
    const token = await localStorage.getItem("auth:token");
    if (token) {
      fetchUser();
    }
  } catch (error) {
  }
};

init();

export const useAuth = () => {
  return {
    user,
    login,
    logout,
    signUp,
    upload,
    fetchUser,
    isAuthenticated,
  };
};
