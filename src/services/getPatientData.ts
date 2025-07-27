import { useQuery } from "@tanstack/react-query";
import { api } from "./axios";
import { endpoints } from "./endpoints";
import { Patient } from "./listPatients";

async function fetchPatients(id: string) {
  const res = await api.get<Patient>(
    endpoints.list.patients + `/${id}`,
  );

  return res.data;
}

export const useFindPatientById = (id: string) => {
  return useQuery({
    queryKey: [
      "patient",
    ],
    queryFn: () =>
      fetchPatients(id),
    refetchOnWindowFocus: false,
  });
};
