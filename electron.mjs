import { app, BrowserWindow } from "electron";
import path from "path";
import { fileURLToPath } from "url";
import Store from "electron-store";

Store.initRenderer();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function createWindow() {
  console.log("=== CREATING ELECTRON WINDOW ===")
    
  console.log('✅ Preload file found');

  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    title: "Navegantus",
    webPreferences: {
      preload: path.join(__dirname, "preload.mjs"),
      contextIsolation: true,
      nodeIntegration: false,
      webSecurity: false,
      allowRunningInsecureContent: false,
      enableRemoteModule: false,
      sandbox: false,
    },
  });

  const isDev = !app.isPackaged;

  if (isDev) {
    win.loadURL(process.env.VITE_DEV_SERVER_URL || 'http://localhost:5173');
  } else {
    win.loadFile(path.join(__dirname, 'dist', 'index.html'));
  }

  if (isDev) {
    win.webContents.openDevTools();
  }
  
  console.log("=== WINDOW CREATION COMPLETED ===")
}

app.whenReady().then(() => {
  console.log('🚀 Electron app is ready');
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});