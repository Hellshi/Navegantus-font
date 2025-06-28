import { useState, useEffect } from "react"

export function useElectronStore<T>(key: string, defaultValue: T) {
  const [value, setValue] = useState<T>(defaultValue)

  useEffect(() => {
    if (typeof window !== "undefined" && window.electronStore) {
      const storedValue = window.electronStore.get(key) as T
      if (storedValue !== undefined) {
        setValue(storedValue)
      }
    }
  }, [key])

  const setStoredValue = (newValue: T) => {
    setValue(newValue)
    if (typeof window !== "undefined" && window.electronStore) {
      window.electronStore.set(key, newValue)
    }
  }

  return [value, setStoredValue] as const
}
