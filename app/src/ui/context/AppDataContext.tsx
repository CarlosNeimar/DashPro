import React, { createContext, useContext, useEffect, useState } from "react";

// Types
export type Theme = "dark" | "light" | "system";

export type Settings = {
  theme: Theme;
  // Other settings can be added here
};

export type Module = {
  id: string;
  name: string;
  // Other relevant module properties
};

export type AppDataContextType = {
  settings: Settings;
  modules: Module[];
  updateSettings: (newSettings: Partial<Settings>) => void;
  setModules: (modules: Module[]) => void;
};

// Initial state
const initialSettings: Settings = {
  theme: "light",
};

const initialState: AppDataContextType = {
  settings: initialSettings,
  modules: [],
  updateSettings: () => null,
  setModules: () => null,
};

// Context
const AppDataContext = createContext<AppDataContextType>(initialState);

// Custom hook
export const useAppData = () => {
  const context = useContext(AppDataContext);
  if (!context) {
    throw new Error("useAppData must be used within an AppDataProvider");
  }
  return context;
};

// Provider
export const AppDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<Settings>(initialSettings);
  const [modules, setModules] = useState<Module[]>([]);

  // Theme validation from the second file
  const validateTheme = (theme: string): theme is Theme => {
    return ["light", "dark", "system"].includes(theme);
  };

  useEffect(() => {
    // Load settings from store via IPC
    //@ts-ignore
    window.electron.getSettings().then((loadedSettings: Settings) => {
      if (loadedSettings) {
        setSettings(loadedSettings);
      }
    });

    // Load modules via IPC
    //@ts-ignore
    window.electron.getModules().then((loadedModules: Module[]) => {
      if (loadedModules) {
        setModules(loadedModules);
      }
    });
  }, []);

  const updateSettings = (newSettings: Partial<Settings>) => {
    // Validate theme if it's being updated
    if (newSettings.theme && !validateTheme(newSettings.theme)) {
      console.error("Invalid theme value:", newSettings.theme);
      return;
    }

    const updatedSettings = { ...settings, ...newSettings };
    setSettings(updatedSettings);
    //@ts-ignore
    window.electron.updateSettings(updatedSettings); // Persist via IPC
  };

  return (
    <AppDataContext.Provider value={{ settings, modules, updateSettings, setModules }}>
      {children}
    </AppDataContext.Provider>
  );
};