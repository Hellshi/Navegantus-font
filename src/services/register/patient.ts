/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate } from "react-router-dom";

import { useMutation } from "@tanstack/react-query";

import { enqueueSnackbar } from "notistack";

import { api } from "../axios";
import { endpoints } from "../endpoints";
import { CreatePatientDto, PatientResponse } from "../interfaces/patient";

async function postCreatePatient(data: CreatePatientDto) {
  const res = await api.post<PatientResponse>(endpoints.register.patient, data);

  return res.data;
}

export const useCreatePatient = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: postCreatePatient,
    onSuccess: async () => {
        //Redirect to a listing user screen here (I Think)
      navigate("/patient", { replace: true });
    },
    onError: (err: any) => {
      console.log({ err });

      enqueueSnackbar(
        "Ocorreu um erro ao realizar a solicitação. Tente novamente mais tarde",
        {
          variant: "error",
        },
      );
    },
  });
};
