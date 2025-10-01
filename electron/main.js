const { app, BrowserWindow, Menu, shell, ipcMain, dialog } = require('electron');
const path = require('path');
const isDev = process.env.NODE_ENV === 'development';

let mainWindow;

function createWindow() {
  // Créer la fenêtre du navigateur
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
      preload: path.join(__dirname, 'preload.js')
    },
    icon: path.join(__dirname, '../public/icon-512.png'),
    titleBarStyle: 'default',
    show: false, // Ne pas afficher jusqu'à ce que la page soit prête
    webSecurity: true
  });

  // Charger l'application
  const startUrl = isDev 
    ? 'http://localhost:3003' 
    : `file://${path.join(__dirname, '../out/index.html')}`;
  
  mainWindow.loadURL(startUrl);

  // Afficher la fenêtre quand elle est prête
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
    
    // Ouvrir les DevTools en développement
    if (isDev) {
      mainWindow.webContents.openDevTools();
    }
  });

  // Gérer la fermeture de la fenêtre
  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  // Gérer les liens externes
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: 'deny' };
  });

  // Créer le menu de l'application
  createMenu();
}

function createMenu() {
  const template = [
    {
      label: 'COEXIST.AI',
      submenu: [
        {
          label: 'À propos de COEXIST.AI',
          click: () => {
            dialog.showMessageBox(mainWindow, {
              type: 'info',
              title: 'À propos de COEXIST.AI',
              message: 'COEXIST.AI - Assistant de Coexistence Pacifique',
              detail: 'Version 1.0.0\n\nAssistant IA spécialisé dans la résolution de conflits et la promotion de la coexistence pacifique.\n\nDéveloppé avec ❤️ pour un monde plus paisible 🌍',
              buttons: ['OK']
            });
          }
        },
        { type: 'separator' },
        {
          label: 'Quitter',
          accelerator: process.platform === 'darwin' ? 'Cmd+Q' : 'Ctrl+Q',
          click: () => {
            app.quit();
          }
        }
      ]
    },
    {
      label: 'Édition',
      submenu: [
        { role: 'undo', label: 'Annuler' },
        { role: 'redo', label: 'Rétablir' },
        { type: 'separator' },
        { role: 'cut', label: 'Couper' },
        { role: 'copy', label: 'Copier' },
        { role: 'paste', label: 'Coller' },
        { role: 'selectall', label: 'Tout sélectionner' }
      ]
    },
    {
      label: 'Affichage',
      submenu: [
        { role: 'reload', label: 'Recharger' },
        { role: 'forceReload', label: 'Forcer le rechargement' },
        { role: 'toggleDevTools', label: 'Outils de développement' },
        { type: 'separator' },
        { role: 'resetZoom', label: 'Zoom normal' },
        { role: 'zoomIn', label: 'Zoom avant' },
        { role: 'zoomOut', label: 'Zoom arrière' },
        { type: 'separator' },
        { role: 'togglefullscreen', label: 'Plein écran' }
      ]
    },
    {
      label: 'Fenêtre',
      submenu: [
        { role: 'minimize', label: 'Réduire' },
        { role: 'close', label: 'Fermer' }
      ]
    },
    {
      label: 'Aide',
      submenu: [
        {
          label: 'Documentation',
          click: () => {
            shell.openExternal('https://coexist-ai.com/docs');
          }
        },
        {
          label: 'Support',
          click: () => {
            shell.openExternal('https://coexist-ai.com/support');
          }
        },
        {
          label: 'Raccourcis clavier',
          click: () => {
            dialog.showMessageBox(mainWindow, {
              type: 'info',
              title: 'Raccourcis clavier',
              message: 'Raccourcis disponibles dans COEXIST.AI',
              detail: 'Ctrl+Q (Cmd+Q sur Mac) : Quitter l\'application\nCtrl+R (Cmd+R sur Mac) : Recharger la page\nF11 : Basculer en plein écran\nCtrl+Shift+I (Cmd+Option+I sur Mac) : Outils de développement',
              buttons: ['OK']
            });
          }
        }
      ]
    }
  ];

  // Adapter le menu pour macOS
  if (process.platform === 'darwin') {
    template[0].submenu.unshift(
      { role: 'about', label: 'À propos de COEXIST.AI' },
      { type: 'separator' },
      { role: 'services', label: 'Services' },
      { type: 'separator' },
      { role: 'hide', label: 'Masquer COEXIST.AI' },
      { role: 'hideothers', label: 'Masquer les autres' },
      { role: 'unhide', label: 'Afficher tout' },
      { type: 'separator' }
    );
  }

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}

// Gestionnaires d'événements de l'application
app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// Gestion des messages IPC
ipcMain.handle('get-app-version', () => {
  return app.getVersion();
});

ipcMain.handle('show-message-box', async (event, options) => {
  const result = await dialog.showMessageBox(mainWindow, options);
  return result;
});

// Gestion des mises à jour (pour les futures versions)
ipcMain.handle('check-for-updates', () => {
  // Ici, vous pourriez intégrer un système de mise à jour automatique
  return { available: false, version: app.getVersion() };
});

// Gestion des notifications système
ipcMain.handle('show-notification', (event, options) => {
  if (process.platform === 'win32') {
    // Windows
    const notification = new Notification(options.title, {
      body: options.body,
      icon: path.join(__dirname, '../public/icon-192.png')
    });
    notification.show();
  } else if (process.platform === 'darwin') {
    // macOS
    const notification = new Notification(options.title, {
      body: options.body,
      icon: path.join(__dirname, '../public/icon-192.png')
    });
    notification.show();
  }
  // Linux gère les notifications via le système
});

console.log('🌟 COEXIST.AI Desktop Application démarrée avec succès !');
