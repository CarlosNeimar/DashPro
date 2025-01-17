import { useState } from "react";
import { AppDataProvider } from "./context/AppDataContext";
import { Load } from "./pages/Load";
import { Layout } from "./layout"
// import ModuleManager from "./Testemodules"
import TestDashboard from "@/ui/Newapitest"

export const App = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  function loadpage() {
    setTimeout(() => {
      setIsLoaded(true);
    }, 2500);
  }

  return (
    <>
      <TestDashboard />
    </>

    // <AppDataProvider>
    //   {isLoaded ? (
    //     <>



    //       {/* <Layout /> */}
    //       {/* <ModuleManager /> */}
    //       {/* <Load onLoadComplete={function (): void {
    //         throw new Error("Function not implemented.");
    //       } } /> */}
    //     </>
    //   ) : (
    //     // <Load onLoadComplete={loadpage} />
    //     <>
    //     </>
    //   )}
    // </AppDataProvider>
  );
};
