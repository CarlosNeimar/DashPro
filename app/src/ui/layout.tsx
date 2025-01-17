import { Header } from "./new components/Header";
import { ThemeProvider } from "@/components/theme-provider";
import { useAppData } from "./context/AppDataContext";

import { Outlet } from "react-router-dom";

import { AppSidebar } from "@/ui/new components/sidebar/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
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
          <Header />          
          <Outlet />
        </SidebarInset>
      </SidebarProvider>
    </ThemeProvider>
  )
}


