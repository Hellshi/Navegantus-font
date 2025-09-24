import { useMutation } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";

import { api } from "../axios";
import { endpoints } from "../endpoints";

export interface IhcMarker {
  markerName: string;
  result: "positivo" | "negativo" | "inconclusivo";
}

export interface Recommendation {
  recommendation: string;
}

export interface CreatePathologyReportDto {
  procedure: string;
  macroscopy: string;
  microscopy: string;
  diagnosisType: string;
  diagnosisGrade: string;
  ihcMarkers: IhcMarker[];
  recommendations: Recommendation[];
}

export interface PathologyReportResponse {
  id: string;
  createdAt: string;
  updatedAt: string;
}

async function postCreatePathologyReport({ id, data }:{
  id: string,
  data: CreatePathologyReportDto,
}): Promise<PathologyReportResponse> {
  const res = await api.patch<PathologyReportResponse>(
    `${endpoints.reports.pathologyReport}/${id}`,
    data,
  );
  return res.data;
}

export const useCreatePathologyReport = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: postCreatePathologyReport,
    onSuccess: () => {
      enqueueSnackbar("Laudo cadastrado com sucesso!", { variant: "success" });
      navigate("/pathology-reports", { replace: true });
    },
    onError: (err) => {
      console.error(err);
      enqueueSnackbar(
        "Erro ao cadastrar o laudo. Tente novamente mais tarde.",
        { variant: "error" },
      );
    },
  });
};
