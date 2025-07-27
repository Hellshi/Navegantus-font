

import axios, { AxiosError, AxiosResponse } from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";
import { enqueueSnackbar } from "notistack";
import { useAuthStore } from "../stores/auth";
import { RefreshTokenResponse } from "./interfaces/auth";
import { getAccessToken } from "../helpers/getAccessToken";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

const refreshAuthLogic = async (failedRequest: AxiosError) => {
  try {
    const refreshToken = useAuthStore.getState().refreshToken;

    if (!refreshToken) return;

    const res = await axios.post<void, AxiosResponse<RefreshTokenResponse>>(
      "/pdv-auth/refresh",
      null,
      {
        baseURL: import.meta.env.VITE_API_URL,
        headers: { Authorization: `Bearer ${refreshToken}` },
      },
    );

    useAuthStore.setState({
      token: res.data.token,
      refreshToken: res.data.refreshToken,
    });

    failedRequest.response?.config.headers.set(
      "Authorization",
      `Bearer ${res.data.token}`,
    );

    return Promise.resolve();
  } catch (e) {
    useAuthStore.getState().resetAuthStore();
    enqueueSnackbar("Sua sessão expirou.", {
      variant: "error",
    });
    return Promise.reject(e);
  }
};

createAuthRefreshInterceptor(api, refreshAuthLogic);

api.interceptors.request.use(
  async (config) => {
    if (!getAccessToken()) {
      config.auth = {
        username: import.meta.env.VITE_HTTP_BASIC_USER,
        password: import.meta.env.VITE_HTTP_BASIC_PASS,
      };

      return config;
    }
    config.headers.Authorization = `Bearer ${getAccessToken()}`;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    if (error.code === "ERR_NETWORK") {
      useAuthStore.getState().resetAuthStore();
    }

    return Promise.reject(error);
  },
);

export { api };
