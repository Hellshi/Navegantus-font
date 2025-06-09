import type { PersistStorage, StorageValue } from "zustand/middleware";

export function createElectronStorage<T>(): PersistStorage<T> {
  return {
    getItem: async (name) => {
      const value = window.electronStore.get(name);
      return value ? (JSON.parse(value) as StorageValue<T>) : null;
    },
    setItem: async (name, value) => {
      window.electronStore.set(name, JSON.stringify(value));
    },
    removeItem: async (name) => {
      window.electronStore.delete(name);
    },
  };
}