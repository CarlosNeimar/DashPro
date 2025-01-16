import { app, BrowserWindow } from "electron";
import { getPreloadPath } from "./pathResolver.js";
import "./ipc/module.ipc.js"
import "./ipc/settings.ipc.js"

let mainWindow: BrowserWindow | null = null;

app.on("ready", () => {
  mainWindow = new BrowserWindow({
    webPreferences: {
      preload: getPreloadPath(),
    },
  });

  mainWindow.loadURL("http://localhost:5123"); // Substitua pela sua URL
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
