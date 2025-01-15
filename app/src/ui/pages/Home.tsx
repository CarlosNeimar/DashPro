import { useEffect, useState } from "react";
import { ThemeProvider, Theme } from "../../components/theme-provider";
import { ModeToggle } from "../new components/Mode-togle";

export const Home = () => {
  const [defaultTheme, setDefaultTheme] = useState<Theme>("system"); // Valor padrão ajustado

  useEffect(() => {
    // Recupera as configurações ao montar o componente
    //@ts-ignore
    window.electron.getSettings()
      .then((settings: any) => {
        if (["dark", "light", "system"].includes(settings.theme)) {
          setDefaultTheme(settings.theme);
          console.log("Configuração recebida do Electron:", settings.theme); // Valor recebido
        }
      })
      .catch((error: any) => {
        console.error("Erro ao obter configurações:", error);
      });
  }, []);

  // Verifica alterações no valor de `defaultTheme`
  useEffect(() => {
    console.log("Estado defaultTheme atualizado:", defaultTheme);
  }, [defaultTheme]);

  return (
    <ThemeProvider defaultTheme={defaultTheme} storageKey="vite-ui-theme">
      <div className="flex min-h-svh bg-background">
        <ModeToggle />
      </div>
    </ThemeProvider>
  );
};
