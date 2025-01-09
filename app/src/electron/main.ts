import { app, BrowserWindow } from "electron";
import path from "path";

const isDev = !app.isPackaged;

app.on("ready", () => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  const startUrl = isDev
    ? path.join(__dirname, '../dist-react/index.html')
    : path.join(process.resourcesPath, 'dist-react/index.html'); 

  mainWindow.loadFile(startUrl);
});
