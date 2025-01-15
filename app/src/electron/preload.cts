import { contextBridge, IpcRenderer, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld("electron", {
  toggleFavorite: (moduleId: any) => ipcRenderer.invoke("toggle-favorite", moduleId),
  getFavorites: () => ipcRenderer.invoke("get-favorites"),
  getModules: () => ipcRenderer.invoke("get-modules"),
  addModule: (name: any, path: any, classType: any) =>
    ipcRenderer.invoke("add-module", { name, path, class: classType }),
  removeModule: (id: any) => ipcRenderer.invoke("remove-module", id),
  getSettings: () => ipcRenderer.invoke("get-settings"),
  updateSettings: (newSettings: any) =>
    ipcRenderer.invoke("update-settings", newSettings),
  executeModule: (module: any) => ipcRenderer.invoke("execute-module", module),
});

