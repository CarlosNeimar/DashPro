import { Header } from "./new components/Header";
import { Theme ,ThemeProvider } from "@/components/theme-provider";
import { useSettings } from './renderAPI/hooks/useStore';


import { Outlet } from "react-router-dom";

import { AppSidebar } from "@/ui/new components/sidebar/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"

export const Layout = () => {
  const { settings, updateSettings, isLoading } = useSettings();
  const theme = settings.theme as Theme;

  console.log('Renderizando Layout com tema:', theme);
  
  // Se ainda estiver carregando as configurações, não renderiza nada
  if (isLoading) {
    return null;
  }

  return (
    <ThemeProvider
      theme={theme}
      onThemeChange={(newTheme) => {
        console.log('Mudando tema para:', newTheme);
        updateSettings({ theme: newTheme });
      }}
    >
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <Header />
          <Outlet />
        </SidebarInset>
      </SidebarProvider>
    </ThemeProvider>
  );
};