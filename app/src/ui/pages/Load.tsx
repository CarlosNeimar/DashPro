import { useEffect, useState } from "react";
import PlayOnce from "../lordicons/Lordi";

export const Load = ({ onLoadComplete }: { onLoadComplete: () => void }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Carregar configurações e módulos
    const fetchData = async () => {
      try {
        //@ts-ignore
        const settings = await window.electron.getSettings();
        //@ts-ignore
        const modules = await window.electron.getModules();

        // Salve os dados no localStorage (ou em algum estado global)
        localStorage.setItem("settings", JSON.stringify(settings));
        localStorage.setItem("modules", JSON.stringify(modules));

        console.log("Configurações:", settings);
        console.log("Módulos:", modules);

        // Finaliza o loading
        setLoading(false);
        onLoadComplete();
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      }
    };

    fetchData();
  }, [onLoadComplete]);

  return (
    <div className="flex min-h-svh bg-stone-950 items-center justify-center">
      {loading ? <PlayOnce /> : null}
    </div>
  );
};
