import { contextBridge } from "electron"
import Store from "electron-store"

const store = new Store()

contextBridge.exposeInMainWorld("electronStore", {
  get: (key: string): string | undefined => {
    const value = store.get(key)
    return typeof value === "string" ? value : undefined
  },
  set: (key: string, value: string): void => store.set(key, value),
  delete: (key: string): void => store.delete(key),
  clear: (): void => store.clear(),
})

console.log("Preload script loaded successfully")
