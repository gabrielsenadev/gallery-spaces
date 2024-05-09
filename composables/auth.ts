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
  };
  message: string;
};

type ErrorResponse = {
  success: boolean;
  message: string;
};

type GetAuthUserResponse = {
  success: boolean;
  data: AuthUser;
  message: string;
};

const user = ref<AuthUser | null>(null);
const isAuthenticated = computed(() => !!user.value);

export const useAuth = () => {

  const init = async () => {
    const token = await localStorage.getItem('auth:token');
    if (token) {
      fetchUser();
    }
  };

  async function login({ username, password }: LoginInput) {
    try {
      const { data, error } = await useFetch<LoginResponse, ErrorResponse>("/api/auth/login", {
        body: JSON.stringify({
          username,
          password,
        }),
        method: "POST",
      });

      if (!data.value) {
        return {
          success: false,
          message: error.value?.message,
        };
      }
  
      if (data.value.success) {
        localStorage.setItem("auth:token", data.value.data.token);
        fetchUser();
        return {
          success: true,
        };
      }

      return {
        success: false,
        message: data.value.message,
      };
    } catch (error) {
      if (error instanceof Error) {
        return {
          success: false,
          message: error.message,
        }
      }
    }
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

  async function logout() {
    try {
      const header = await getUserTokenAuthorizationHeader();

      const { data, error } = await useFetch<GetAuthUserResponse, ErrorResponse>("/api/auth/logout", {
        headers: header,
        method: "POST",
      });

      if (!data.value) {
        return {
          success: false,
          message: error,
        };
      }

      if (data.value.success) {
        localStorage.removeItem("auth:token");
        return {
          success: true,
        };
      }

      return {
        success: false,
        message: data.value.message,
      };
    } catch (error) {
      if (error instanceof Error) {
        return {
          success: false,
          message: error.message,
        };
      }
    }
  };

  async function fetchUser() {
    try {
      const header = await getUserTokenAuthorizationHeader();

      const { data, error } = await useFetch<GetAuthUserResponse, ErrorResponse>("/api/auth/user", {
        headers: header,
        method: "GET",
      });

      if (!data.value) {
        return {
          success: false,
          message: error.value?.message,
        };
      }

      if (data.value.success) {
        user.value = data.value.data;
        return {
          success: true,
          data: user.value,
        };
      }

      return {
        success: false,
        message: data.value.message,
      };
    } catch (error) {
      if (error instanceof Error) {
        return {
          success: false,
          message: error.message,
        };
      }
    }
  };

  async function signUp(form: FormData) {
    try {
      const { data, error } = await useFetch<LoginResponse, ErrorResponse>("/api/auth/create", {
        body: form,
        method: "POST",
      });

      if (!data.value) {
        return {
          success: false,
          message: error.value?.message,
        };
      }

      if (data.value.success) {
        return {
          success: true,
        };
      }

      return {
        success: false,
        message: data.value.message,
      };
    } catch (error) {
      if (error instanceof Error) {
        return {
          success: false,
          message: error.message,
        };
      }
    }
  };

  init();

  return {
    user,
    fetchUser,
    login,
    logout,
    signUp,
    isAuthenticated,
  };
};
