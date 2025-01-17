const storeApi = {
  // Settings
  getSettings: () => window.electron.store.getSettings(),
  updateSettings: (settings: any) => window.electron.store.updateSettings(settings),
  
  // Modules
  getModules: () => window.electron.store.getModules(),
  addModule: (module: any) => window.electron.store.addModule(module),
  updateModule: (id: string, updates: any) => window.electron.store.updateModule(id, updates),
  deleteModule: (id: string) => window.electron.store.deleteModule(id),
  
  // Module Classes
  getModuleClasses: () => window.electron.store.getModuleClasses(),
  addModuleClass: (moduleClass: any) => window.electron.store.addModuleClass(moduleClass),
  updateModuleClass: (id: string, updates: any) => 

    window.electron.store.updateModuleClass(id, updates),
  deleteModuleClass: (id: string) => window.electron.store.deleteModuleClass(id),
};

export default storeApi;