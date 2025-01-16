import { useState } from "react";
import { AppDataProvider } from "./context/AppDataContext";
import { Load } from "./pages/Load";
import { Home } from "./pages/Home";
// import ModuleManager from "./Testemodules"

export const App = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  function loadpage() {
    setTimeout(() => {
      setIsLoaded(true);
    }, 2500);
  }

  return (
    <AppDataProvider>
      {isLoaded ? (
        <>
        <Home />
        {/* <ModuleManager /> */}
        {/* <Load onLoadComplete={function (): void {
            throw new Error("Function not implemented.");
          } } /> */}
        </>
      ) : (
        <Load onLoadComplete={loadpage} />
      )}
    </AppDataProvider>
  );
};
