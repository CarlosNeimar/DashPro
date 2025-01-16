import { useState } from "react";
import { AppDataProvider } from "./context/AppDataContext";
import { Load } from "./pages/Load";
import { Home } from "./pages/Home";
import ModuleManager from "./Testemodules"

export const App = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <AppDataProvider>
      {isLoaded ? (
        <>
        <Home />
        <ModuleManager />
        </>
      ) : (
        <Load onLoadComplete={() => setIsLoaded(true)} />
      )}
    </AppDataProvider>
  );
};
