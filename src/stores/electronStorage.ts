import type { PersistStorage, StorageValue } from "zustand/middleware"

export function createElectronStorage<T>(): PersistStorage<T> {
  return {
    getItem: async (name) => {
      if (typeof window === "undefined" || !window.electronStore) {
        console.warn("Electron store not available, falling back to localStorage")
        const fallback = localStorage.getItem(name)
        return fallback ? JSON.parse(fallback) : null
      }

      try {
        const value = window.electronStore.get(name)
        return value ? (JSON.parse(value) as StorageValue<T>) : null
      } catch (error) {
        console.error("Error reading from electron store:", error)
        return null
      }
    },

    setItem: async (name, value) => {
      if (typeof window === "undefined" || !window.electronStore) {
        console.warn("Electron store not available, falling back to localStorage")
        localStorage.setItem(name, JSON.stringify(value))
        return
      }

      try {
        window.electronStore.set(name, JSON.stringify(value))
      } catch (error) {
        console.error("Error writing to electron store:", error)
      }
    },

    removeItem: async (name) => {
      if (typeof window === "undefined" || !window.electronStore) {
        console.warn("Electron store not available, falling back to localStorage")
        localStorage.removeItem(name)
        return
      }

      try {
        window.electronStore.delete(name)
      } catch (error) {
        console.error("Error deleting from electron store:", error)
      }
    },
  }
}
