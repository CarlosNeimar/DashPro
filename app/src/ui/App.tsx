import { useEffect, useState } from "react";
import { ModuleCard } from "./new components/Modulecard";

export function App() {
  const [modules, setModules] = useState([]);

  // Carrega os módulos do backend
  useEffect(() => {
    //@ts-ignore
    window.electron.getModules()
      .then((data : any) => {
        setModules(data);
      })
      .catch((error : any) => {
        console.error("Error fetching modules:", error);
      });
  }, []);

  // Função para executar um módulo
  const executeModule = (module: object) => {
    //@ts-ignore
    window.electron.executeModule(module)
      .then(() => {
        console.log(`Module executed: ${JSON.stringify(module)}`);
      })
      .catch((error : any) => {
        console.error("Error executing module:", error);
      });
  };

  return (
    <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {modules.map((module: any) => (
        <ModuleCard
          key={module.id}
          name={module.name}
          path={module.path}
          classType={module.class}
          onExecute={() => executeModule(module)}
        />
      ))}
    </div>
  );
}
