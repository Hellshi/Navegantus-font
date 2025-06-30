console.log("=== PRELOAD SCRIPT STARTING ===")
import Store from "electron-store"

import { contextBridge } from "electron"

// Verificar se os módulos estão disponíveis
try {
  console.log("Checking electron module...")
  console.log("✅ Electron contextBridge loaded")

  console.log("Checking electron-store module...")
  console.log("✅ Electron Store module loaded")

  console.log("Creating store instance...")
  console.log("✅ Store instance created")

  console.log("Exposing electronStore to main world...")
  const store = new Store()
  contextBridge.exposeInMainWorld("electronStore", {
    get: (key) => {
      console.log(`[PRELOAD] Getting key: ${key}`)
      try {
        const value = store.get(key)
        console.log(`[PRELOAD] Retrieved value:`, value)
        return value
      } catch (error) {
        console.error(`[PRELOAD] Error getting key ${key}:`, error)
        return undefined
      }
    },
    set: (key, value) => {
      console.log(`[PRELOAD] Setting key: ${key}, value:`, value)
      try {
        store.set(key, value)
        console.log(`[PRELOAD] Successfully set ${key}`)
      } catch (error) {
        console.error(`[PRELOAD] Error setting key ${key}:`, error)
      }
    },
    delete: (key) => {
      console.log(`[PRELOAD] Deleting key: ${key}`)
      try {
        store.delete(key)
        console.log(`[PRELOAD] Successfully deleted ${key}`)
      } catch (error) {
        console.error(`[PRELOAD] Error deleting key ${key}:`, error)
      }
    },
    clear: () => {
      console.log(`[PRELOAD] Clearing all data`)
      try {
        store.clear()
        console.log(`[PRELOAD] Successfully cleared store`)
      } catch (error) {
        console.error(`[PRELOAD] Error clearing store:`, error)
      }
    },
    // Método de teste
    test: () => {
      console.log("[PRELOAD] Test method called")
      return "Hello from preload!"
    },
  })

  console.log("✅ electronStore successfully exposed to main world")
  console.log("=== PRELOAD SCRIPT COMPLETED SUCCESSFULLY ===")
} catch (error) {
  console.error("❌ CRITICAL ERROR in preload script:", error)
  console.error("Error stack:", error.stack)
}
