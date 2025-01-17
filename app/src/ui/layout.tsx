import { ThemeProvider } from "@/components/theme-provider";
import { useAppData } from "./context/AppDataContext";
import { Home } from "./pages/Home";

import { AppSidebar } from "@/ui/new components/sidebar/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

export const Layout = () => {
  const { settings, updateSettings } = useAppData();

  const handleThemeChange = (newTheme: "light" | "dark" | "system") => {
    updateSettings({ ...settings, theme: newTheme });
  };

  return (
    <ThemeProvider theme={settings.theme} onThemeChange={handleThemeChange}>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          {/* Conteudo todo aqui  */}
          <Home />
        </SidebarInset>
      </SidebarProvider>
    </ThemeProvider>
  )
}


