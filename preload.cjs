console.log("=== PRELOAD SCRIPT STARTING ===")

// Implementação de storage simples sem dependências externas
class SimpleFileStorage {
  constructor() {
    const fs = require("fs")
    const path = require("path")
    const os = require("os")
    
    this.fs = fs
    this.storePath = path.join(os.homedir(), ".navegantus-store.json")
    this.data = this.loadData()
    
    console.log("✅ SimpleFileStorage initialized")
    console.log("📁 Storage path:", this.storePath)
  }

  loadData() {
    try {
      if (this.fs.existsSync(this.storePath)) {
        const content = this.fs.readFileSync(this.storePath, "utf8")
        const parsed = JSON.parse(content)
        console.log("📂 Loaded existing data:", Object.keys(parsed))
        return parsed
      }
    } catch (error) {
      console.error("Error loading store data:", error)
    }
    console.log("📂 Creating new storage file")
    return {}
  }

  saveData() {
    try {
      this.fs.writeFileSync(this.storePath, JSON.stringify(this.data, null, 2))
      console.log("💾 Data saved successfully")
    } catch (error) {
      console.error("Error saving store data:", error)
    }
  }

  get(key) {
    const value = this.data[key]
    console.log(`📖 Get "${key}":`, value)
    return value
  }

  set(key, value) {
    console.log(`📝 Set "${key}":`, value)
    this.data[key] = value
    this.saveData()
  }

  delete(key) {
    console.log(`🗑️ Delete "${key}"`)
    delete this.data[key]
    this.saveData()
  }

  clear() {
    console.log("🧹 Clear all data")
    this.data = {}
    this.saveData()
  }

  has(key) {
    return key in this.data
  }

  size() {
    return Object.keys(this.data).length
  }

  keys() {
    return Object.keys(this.data)
  }
}

try {
  console.log("Loading electron contextBridge...")
  const { contextBridge } = require("electron")
  console.log("✅ contextBridge loaded")

  console.log("Creating storage instance...")
  const storage = new SimpleFileStorage()
  console.log("✅ Storage instance created")

  console.log("Exposing electronStore to main world...")
  contextBridge.exposeInMainWorld("electronStore", {
    // Métodos básicos
    get: (key) => storage.get(key),
    set: (key, value) => storage.set(key, value),
    delete: (key) => storage.delete(key),
    clear: () => storage.clear(),
    
    // Métodos extras
    has: (key) => storage.has(key),
    size: () => storage.size(),
    keys: () => storage.keys(),
    
    // Método de teste
    test: () => {
      console.log("[PRELOAD] Test method called")
      return "Hello from preload!"
    },
    
    // Informações do storage
    info: () => ({
      type: "SimpleFileStorage",
      path: storage.storePath,
      size: storage.size(),
      keys: storage.keys()
    })
  })

  console.log("✅ electronStore successfully exposed to main world")
  console.log("=== PRELOAD SCRIPT COMPLETED SUCCESSFULLY ===")
} catch (error) {
  console.error("❌ CRITICAL ERROR in preload script:", error)
  console.error("Error stack:", error.stack)
}
