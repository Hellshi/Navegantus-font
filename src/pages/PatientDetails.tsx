"use client"

import { useEffect, useState } from "react"
import PageBreadcrumb from "../components/common/PageBreadCrumb"
import UserMetaCard from "../components/UserProfile/UserMetaCard"
import UserInfoCard from "../components/UserProfile/UserInfoCard"
import UserAddressCard from "../components/UserProfile/UserAddressCard"
import PageMeta from "../components/common/PageMeta"
import { useFindPatientById } from "../services/getPatientData"
import { useLocation } from 'react-router-dom'


export default function PatientDetails() {
  
  const params = new URLSearchParams(useLocation().search)
  const id = params.get('id')
  if(!id) {
    throw new Error("Patient ID not found")
  }
  const { data } = useFindPatientById(id)
  useEffect(() => {
    console.log(data)
  }, [data])
  const [activeTab, setActiveTab] = useState("overview")

  const tabs = [
    { id: "overview", label: "Visão Geral" },
    { id: "personal", label: "Anatopatologia" },
    { id: "address", label: "Endereço" },
    { id: "settings", label: "Configurações" },
  ]

  return (
    <>
      <PageMeta
        title="Detalhes de Paciente"
        description="Detalhes de Paciente"
      />
      <PageBreadcrumb pageTitle={data?.name || "Detalhes de Paciente"} />

      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">

        {/* Tabs Navigation */}
        <div className="mb-6">
          <div>
            <nav className="-mb-px flex space-x-8 overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 py-3 px-1 border-b-2 font-medium text-sm transition-colors whitespace-nowrap ${
                    activeTab === tab.id
                      ? "border-blue-500 text-blue-600 dark:text-blue-400"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300"
                  }`}
                >
                  <span className="text-base">{tab.icon}</span>
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <div className="space-y-6">
          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* User Meta Card */}
              <div className="rounded-lg">
                <UserMetaCard />
              </div>

              {/* Quick Info Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Status Card */}
                <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800/50">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                      <span className="text-green-600 dark:text-green-400 text-lg">✓</span>
                    </div>
                    <h4 className="font-semibold text-gray-800 dark:text-white/90">Status</h4>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm font-medium text-green-600">Ativo</span>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Último acesso: Hoje, 14:30</p>
                  </div>
                </div>

                {/* Activity Card */}
                <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800/50">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                      <span className="text-purple-600 dark:text-purple-400 text-lg">📊</span>
                    </div>
                    <h4 className="font-semibold text-gray-800 dark:text-white/90">Atividade</h4>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-xs text-gray-600 dark:text-gray-400">Perfil atualizado</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-xs text-gray-600 dark:text-gray-400">Login realizado</span>
                    </div>
                  </div>
                </div>

                {/* Member Since Card */}
                <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800/50">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                      <span className="text-blue-600 dark:text-blue-400 text-lg">📅</span>
                    </div>
                    <h4 className="font-semibold text-gray-800 dark:text-white/90">Membro</h4>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-800 dark:text-white/90">Janeiro 2023</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Há 1 ano e 2 meses</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "personal" && (
            <div className="rounded-lg border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800/50 overflow-hidden">
              <UserInfoCard />
            </div>
          )}

          {activeTab === "address" && (
            <div className="rounded-lg border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800/50 overflow-hidden">
              <UserAddressCard />
            </div>
          )}

          {activeTab === "settings" && (
            <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800/50">
              <div className="flex items-center gap-3 mb-6">
                <h4 className="font-semibold text-gray-800 dark:text-white/90">Configurações da Conta</h4>
              </div>

              <div className="space-y-8">
                {/* Notifications Section */}
                <div>
                  <h5 className="font-medium text-gray-800 dark:text-white/90 mb-4">Notificações</h5>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-800 dark:text-white/90">Notificações por email</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Receber atualizações por email</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-800 dark:text-white/90">Notificações push</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Receber notificações no navegador</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Security Section */}
                <div>
                  <h5 className="font-medium text-gray-800 dark:text-white/90 mb-4">Segurança</h5>
                  <div className="space-y-3">
                    <button className="w-full text-left p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                      <div className="flex items-center gap-3">
                        <span className="text-lg">🔑</span>
                        <div>
                          <div className="font-medium text-gray-800 dark:text-white/90">Alterar senha</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">Última alteração há 3 meses</div>
                        </div>
                      </div>
                    </button>

                    <button className="w-full text-left p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                      <div className="flex items-center gap-3">
                        <span className="text-lg">🛡️</span>
                        <div>
                          <div className="font-medium text-gray-800 dark:text-white/90">
                            Autenticação de dois fatores
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            Adicionar uma camada extra de segurança
                          </div>
                        </div>
                      </div>
                    </button>

                    <button className="w-full text-left p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                      <div className="flex items-center gap-3">
                        <span className="text-lg">📱</span>
                        <div>
                          <div className="font-medium text-gray-800 dark:text-white/90">Dispositivos conectados</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            Gerenciar dispositivos com acesso à conta
                          </div>
                        </div>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
