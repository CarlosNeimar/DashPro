import { contextBridge, ipcRenderer } from 'electron';

// Exponha apenas os métodos necessários para o renderer process
contextBridge.exposeInMainWorld('electron', {
  store: {
    // Settings
    getSettings: () => ipcRenderer.invoke('get-settings'),
    updateSettings: (settings: any) => ipcRenderer.invoke('update-settings', settings),
    
    // Modules
    getModules: () => ipcRenderer.invoke('get-modules'),
    addModule: (module: any) => ipcRenderer.invoke('add-module', module),
    updateModule: (id: string, updates: any) => ipcRenderer.invoke('update-module', id, updates),
    deleteModule: (id: string) => ipcRenderer.invoke('delete-module', id),
    
    // Module Classes
    getModuleClasses: () => ipcRenderer.invoke('get-module-classes'),
    addModuleClass: (moduleClass: any) => ipcRenderer.invoke('add-module-class', moduleClass),
    updateModuleClass: (id: string, updates: any) => 
      ipcRenderer.invoke('update-module-class', id, updates),
    deleteModuleClass: (id: string) => ipcRenderer.invoke('delete-module-class', id),

    // Icons
    getIcons: () => ipcRenderer.invoke('get-icons'),
  }
});