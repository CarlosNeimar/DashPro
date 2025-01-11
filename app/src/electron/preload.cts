import { contextBridge, IpcRenderer, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electron', {
  getModules: () => ipcRenderer.invoke('get-modules'),
  addModule: (name: string, path: string, classType: string) =>
    ipcRenderer.invoke('add-module', { name, path, class: classType }),
  removeModule: (id: string) => ipcRenderer.invoke('remove-module', id),
  getSettings: () => ipcRenderer.invoke('get-settings'),
  updateSettings: (newSettings: object) =>
    ipcRenderer.invoke('update-settings', newSettings),
  executeModule: (module: object) => ipcRenderer.invoke('execute-module', module),
});
