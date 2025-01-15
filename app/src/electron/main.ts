import { app, BrowserWindow, ipcMain } from "electron";
import path from "path";
import { getPreloadPath } from "./pathResolver.js";
import store from "./store.js";

let mainWindow: BrowserWindow;


app.on("ready", () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: getPreloadPath(),
    },
  });

  // Carregar o frontend
  mainWindow.loadURL("http://localhost:5123");
  console.log("Configurações iniciais do store:", store.get("settings"));

});

ipcMain.handle("get-settings", async () => {
  console.log("Obtendo configurações...");
  return store.get("settings"); // Certifique-se de que 'store' está configurado corretamente.
});

ipcMain.handle("toggle-favorite", (event, moduleId) => {
  const modules = store.get("modules");
  const updatedModules = modules.map((module) =>
    module.id === moduleId
      ? { ...module, isFavorite: !module.isFavorite }
      : module
  );
  store.set("modules", updatedModules);
  return updatedModules;
});

ipcMain.handle("get-favorites", () => {
  const modules = store.get("modules");
  return modules.filter((module) => module.isFavorite);
});