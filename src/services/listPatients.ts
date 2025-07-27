import { useQuery } from "@tanstack/react-query";
import { PaginatedResponse } from "./interfaces/pagination";
import { api } from "./axios";
import { endpoints } from "./endpoints";

export type Patient = {
  addressId: string | undefined;
  birthDate: string;
  birthSex: string;
  cpf: string;
  createdAt: string;
  email: string;
  healthInsurance: string | undefined;
  id: string;
  mothersName: string;
  name: string;
  phone: string;
  rg: string;
  socialName: string;
  susIdCard: string | undefined;
  whatsappPhone: string;
};

async function fetchPatients(page = 1, limit = 10) {
    //TODO: Concertar a resposta paginada aqui
  const res = await api.get<Array<Patient>>(
    endpoints.list.patients,
    {
      params: {
        page,
        limit,
      },
    }
  );

  return res.data;
}

export const useFindAllPatients = (page = 1, limit = 10) => {
  return useQuery({
    queryKey: [
      "patients",
      page,
      limit,
    ],
    queryFn: () =>
      fetchPatients(page, limit),
    refetchOnWindowFocus: false,
  });
};
