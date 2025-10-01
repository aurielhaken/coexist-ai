const { contextBridge, ipcRenderer } = require('electron');

// Exposer les APIs sécurisées au processus de rendu
contextBridge.exposeInMainWorld('electronAPI', {
  // Informations sur l'application
  getAppVersion: () => ipcRenderer.invoke('get-app-version'),
  
  // Boîtes de dialogue
  showMessageBox: (options) => ipcRenderer.invoke('show-message-box', options),
  
  // Vérification des mises à jour
  checkForUpdates: () => ipcRenderer.invoke('check-for-updates'),
  
  // Notifications système
  showNotification: (options) => ipcRenderer.invoke('show-notification', options),
  
  // Événements de l'application
  onAppReady: (callback) => {
    ipcRenderer.on('app-ready', callback);
  },
  
  onAppUpdate: (callback) => {
    ipcRenderer.on('app-update', callback);
  },
  
  // Utilitaires
  platform: process.platform,
  isElectron: true,
  
  // Gestion des fenêtres
  minimizeWindow: () => ipcRenderer.send('minimize-window'),
  maximizeWindow: () => ipcRenderer.send('maximize-window'),
  closeWindow: () => ipcRenderer.send('close-window'),
  
  // Gestion des raccourcis clavier
  registerShortcut: (shortcut, callback) => {
    ipcRenderer.on(`shortcut-${shortcut}`, callback);
  },
  
  unregisterShortcut: (shortcut) => {
    ipcRenderer.removeAllListeners(`shortcut-${shortcut}`);
  }
});

// Gestion des erreurs
window.addEventListener('error', (event) => {
  console.error('Erreur dans le processus de rendu:', event.error);
});

window.addEventListener('unhandledrejection', (event) => {
  console.error('Promesse rejetée non gérée:', event.reason);
});

console.log('🔧 Preload script chargé avec succès');
