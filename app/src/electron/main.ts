import { app, BrowserWindow } from "electron";
import { getPreloadPath } from "./pathResolver.js";
import "./ipc/module.ipc.js"
import "./ipc/settings.ipc.js"
import {isDev} from "./util.js";
import path from "path";

let mainWindow: BrowserWindow | null = null;

app.on("ready", () => {
  mainWindow = new BrowserWindow({
    webPreferences: {
      preload: getPreloadPath(),
    },
  });

  if (isDev()){
    mainWindow.loadURL("http://localhost:5123");
  } else {
    mainWindow.loadFile(path.join(app.getAppPath(), '/dist-react/index.html'));
  }
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
