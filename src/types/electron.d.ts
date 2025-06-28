export interface IElectronAPI {
  electronStore: {
    get: (key: string) => any
    set: (key: string, value: any) => void
    delete: (key: string) => void
    clear: () => void
  }
}

declare global {
  interface Window {
    electronStore: IElectronAPI["electronStore"]
  }
}