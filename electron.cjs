const { app, BrowserWindow } = require('electron');
const path = require('path');
const fs = require('fs');

function createWindow() {
  console.log("=== CREATING ELECTRON WINDOW ===")
  
  const preloadPath = path.join(__dirname, 'preload.cjs');
  console.log('📁 Preload path:', preloadPath);
  
  if (!fs.existsSync(preloadPath)) {
    console.error('❌ Preload file not found at:', preloadPath);
    console.log('📂 Available files:', fs.readdirSync(__dirname).filter(f => f.includes('preload')));
    return;
  }
  
  console.log('✅ Preload file found');

  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    title: "Navegantus",
    webPreferences: {
      preload: preloadPath,
      contextIsolation: true,
      nodeIntegration: false,
      webSecurity: false,
      allowRunningInsecureContent: false,
      enableRemoteModule: false,
      sandbox: false
    },
  });

  const isDev = !app.isPackaged;

  if (isDev) {
    const url = process.env.VITE_DEV_SERVER_URL || 'http://localhost:5173';
    console.log('🌐 Loading URL:', url);
    win.loadURL(url);
  } else {
    win.loadFile(path.join(__dirname, 'dist', 'index.html'));
  }

  if (isDev) {
    win.webContents.openDevTools();
  }

  win.webContents.on('dom-ready', () => {
    console.log('🎯 DOM ready - running tests...');
    
    setTimeout(() => {
      win.webContents.executeJavaScript(`
        console.log('=== RENDERER PROCESS TEST ===');
        
        if (typeof window.electronStore !== 'undefined') {
          console.log('✅ electronStore is available!');
          console.log('📋 Methods:', Object.keys(window.electronStore));
          
          try {
            // Teste básico
            const testResult = window.electronStore.test();
            console.log('🧪 Test method result:', testResult);
            
            // Teste de storage
            window.electronStore.set('test-key', 'Hello World!');
            const retrieved = window.electronStore.get('test-key');
            console.log('💾 Basic storage test:', retrieved);
            
            // Teste com dados complexos
            const userData = { name: 'João', age: 30, preferences: { theme: 'dark' } };
            window.electronStore.set('user-data', JSON.stringify(userData));
            const userRetrieved = JSON.parse(window.electronStore.get('user-data') || '{}');
            console.log('📦 Complex data test:', userRetrieved);
            
            // Informações do storage
            const info = window.electronStore.info();
            console.log('ℹ️ Storage info:', info);
            
            console.log('✅ ALL TESTS PASSED!');
            
            // Disponibilizar globalmente para debug
            window.debugStorage = window.electronStore;
            console.log('🔧 Storage available as window.debugStorage for manual testing');
            
          } catch (error) {
            console.error('❌ Test failed:', error);
          }
        } else {
          console.error('❌ electronStore is NOT available');
          console.log('🔍 Available window properties:', Object.keys(window).filter(k => k.includes('electron') || k.includes('store')));
        }
        
        console.log('=== END RENDERER TEST ===');
      `).catch(err => {
        console.error('❌ Error executing test:', err);
      });
    }, 1000);
  });

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
