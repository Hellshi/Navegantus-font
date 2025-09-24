"use client"

import { useLocation } from "react-router"
import { useModal } from "../../hooks/useModal"
import PathologyReportModal from "./AddAnatopatologicalExam"

export default function UserInfoCard() {
  const { isOpen, openModal, closeModal } = useModal()

  const params = new URLSearchParams(useLocation().search)
  const id = params.get('id')
  if(!id) {
    throw new Error("Patient ID not found")
  }

  const previousExams = [
    {
      id: "2024-AP-00298",
      sampleType: "Biópsia por agulha grossa",
      location: "Pulmão direito – Lobo inferior",
      diagnosis: "Tecido pulmonar normal",
      date: "15/03/2024",
      status: "Concluído",
    },
    {
      id: "2024-AP-00156",
      sampleType: "Lavado broncoalveolar",
      location: "Brônquio principal direito",
      diagnosis: "Processo inflamatório crônico",
      date: "22/01/2024",
      status: "Concluído",
    },
    {
      id: "2023-AP-00892",
      sampleType: "Biópsia transtorácica",
      location: "Pulmão direito – Lobo superior",
      diagnosis: "Nódulo benigno",
      date: "08/11/2023",
      status: "Concluído",
    },
  ]

  return (
    <div className="flex flex-col">
      <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6">2025-AP-00341</h4>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7 2xl:gap-x-32">
              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">Tipo de Amostra</p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">Biópsia por agulha fina (BAAF)</p>
              </div>

              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">Local da Amostra</p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">Pulmão direito – Lobo superior</p>
              </div>

              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">Diagnóstico da Amostra</p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  Adenocarcinoma de pulmão - Moderadamente diferenciado
                </p>
              </div>

              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">Data do exame</p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">07/09/2025</p>
              </div>

              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">Observações</p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  Lesão compatível com adenocarcinoma invasivo. Sugere correlação com exames de imagem.
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={openModal}
            className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 lg:inline-flex lg:w-auto"
          >
            <svg
              className="fill-current"
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M15.0911 2.78206C14.2125 1.90338 12.7878 1.90338 11.9092 2.78206L4.57524 10.116C4.26682 10.4244 4.0547 10.8158 3.96468 11.2426L3.31231 14.3352C3.25997 14.5833 3.33653 14.841 3.51583 15.0203C3.69512 15.1996 3.95286 15.2761 4.20096 15.2238L7.29355 14.5714C7.72031 14.4814 8.11172 14.2693 8.42013 13.9609L15.7541 6.62695C16.6327 5.74827 16.6327 4.32365 15.7541 3.44497L15.0911 2.78206ZM12.9698 3.84272C13.2627 3.54982 13.7376 3.54982 14.0305 3.84272L14.6934 4.50563C14.9863 4.79852 14.9863 5.2734 14.6934 5.56629L14.044 6.21573L12.3204 4.49215L12.9698 3.84272ZM11.2597 5.55281L5.6359 11.1766C5.53309 11.2794 5.46238 11.4099 5.43238 11.5522L5.01758 13.5185L6.98394 13.1037C7.1262 13.0737 7.25666 13.003 7.35947 12.9002L12.9833 7.27639L11.2597 5.55281Z"
                fill=""
              />
            </svg>
            Novo Exame
          </button>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90 mb-4">Exames Anteriores</h3>

        <div className="space-y-4">
          {previousExams.map((exam) => (
            <div
              key={exam.id}
              className="p-4 border border-gray-200 rounded-xl dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors cursor-pointer"
            >
              <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h5 className="text-sm font-semibold text-gray-800 dark:text-white/90">{exam.id}</h5>
                    <span className="inline-flex items-center px-2 py-1 text-xs font-medium text-green-700 bg-green-100 rounded-full dark:bg-green-900/20 dark:text-green-400">
                      {exam.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 gap-2 lg:grid-cols-3">
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Tipo</p>
                      <p className="text-sm font-medium text-gray-800 dark:text-white/90">{exam.sampleType}</p>
                    </div>

                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Local</p>
                      <p className="text-sm font-medium text-gray-800 dark:text-white/90">{exam.location}</p>
                    </div>

                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Diagnóstico</p>
                      <p className="text-sm font-medium text-gray-800 dark:text-white/90">{exam.diagnosis}</p>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-xs text-gray-500 dark:text-gray-400">Data</p>
                  <p className="text-sm font-medium text-gray-800 dark:text-white/90">{exam.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <PathologyReportModal id={id} isOpen={isOpen} closeModal={closeModal} />
    </div>
  )
}
