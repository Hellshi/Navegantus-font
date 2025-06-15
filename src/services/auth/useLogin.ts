import { useNavigate } from "react-router-dom";

import { useMutation } from "@tanstack/react-query";

import { enqueueSnackbar } from "notistack";

import { api } from "../axios";
import { endpoints } from "../endpoints";
import { AuthRequest, AuthResponse } from "../interfaces/auth";
import { useAuthStore } from "../../stores/auth";

async function login(data: AuthRequest) {
  const res = await api.post<AuthResponse>(endpoints.auth.login, data);

  return res.data;
}

export const useLogin = () => {
  const navigate = useNavigate();
  const authenticate = useAuthStore((state) => state.authenticate);

  return useMutation({
    mutationFn: login,
    onSuccess: async (res) => {
      authenticate(res);

      navigate("/", { replace: true });
    },
    onError: (err) => {
      console.log({ err });

      //@ts-ignore
      if (err?.response?.status === 401) {
        return enqueueSnackbar("Email/Senha inválidos", {
          variant: "error",
        });
      }

      enqueueSnackbar(
        "Ocorreu um erro ao realizar a autenticação. Tente novamente",
        {
          variant: "error",
        },
      );
    },
  });
};
