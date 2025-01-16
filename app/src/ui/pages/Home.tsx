import { useAppData } from "../context/AppDataContext";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "../new components/Mode-togle";

export const Home = () => {
  const { settings, updateSettings, modules } = useAppData();

  const handleThemeChange = (newTheme: "light" | "dark" | "system") => {
    updateSettings({ ...settings, theme: newTheme });
  };

  return (
    <ThemeProvider theme={settings.theme} onThemeChange={handleThemeChange}>
      <div className="bg-background">
        <h1>Home</h1>
        <ModeToggle />
        <pre>{JSON.stringify(settings, null, 2)}</pre>
        <pre>{JSON.stringify(modules, null, 2)}</pre>
      </div>
    </ThemeProvider>
  );
};
