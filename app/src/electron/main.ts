import { app, BrowserWindow, ipcMain } from "electron";
import path from "path";
import { getPreloadPath } from "./pathResolver.js";

let mainWindow: BrowserWindow;

const modules = [
  { id: "1", name: "Module A", path: "/path/to/module-a", class: "Utility" },
  { id: "2", name: "Module B", path: "/path/to/module-b", class: "Tool" },
];

ipcMain.handle("get-modules", async () => {
  console.log("Fetching modules...");
  return modules;
});

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
});
