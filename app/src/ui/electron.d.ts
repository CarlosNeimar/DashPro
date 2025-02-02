export interface ElectronAPI {
  store: {
    // Settings
    getSettings: () => Promise<any>;
    updateSettings: (settings: any) => Promise<void>;
    
    // Modules
    getModules: () => Promise<any[]>;
    addModule: (module: any) => Promise<void>;
    updateModule: (id: string, updates: any) => Promise<void>;
    deleteModule: (id: string) => Promise<void>;
    
    // Module Classes
    getModuleClasses: () => Promise<any[]>;
    addModuleClass: (moduleClass: any) => Promise<void>;
    updateModuleClass: (id: string, updates: any) => Promise<void>;
    deleteModuleClass: (id: string) => Promise<void>;

    getIcons: () => Promise<{ name: string; path: string }[]>;

  }
}

declare global {
  interface Window {
    electron: ElectronAPI;
  }
}