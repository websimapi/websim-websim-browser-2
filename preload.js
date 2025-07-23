const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  navigateToWebSim: () => ipcRenderer.send('navigate-to-websim'),
  onNavigateToWebSim: (callback) => ipcRenderer.on('navigate-to-websim', callback),
  removeAllListeners: (channel) => ipcRenderer.removeAllListeners(channel)
});

