import { createContext, useContext, useState, ReactNode } from "react";

type AppDataContextType = {
  settings: any;
  modules: any[];
};

const AppDataContext = createContext<AppDataContextType | undefined>(undefined);

export const AppDataProvider = ({ children }: { children: ReactNode }) => {
  const [settings, setSettings] = useState(() => {
    const storedSettings = localStorage.getItem("settings");
    return storedSettings ? JSON.parse(storedSettings) : {};
  });

  const [modules, setModules] = useState(() => {
    const storedModules = localStorage.getItem("modules");
    return storedModules ? JSON.parse(storedModules) : [];
  });

  return (
    <AppDataContext.Provider value={{ settings, modules }}>
      {children}
    </AppDataContext.Provider>
  );
};

export const useAppData = () => {
  const context = useContext(AppDataContext);
  if (!context) {
    throw new Error("useAppData must be used within an AppDataProvider");
  }
  return context;
};
