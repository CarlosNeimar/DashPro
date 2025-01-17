import { app, BrowserWindow } from "electron";
import path from "path";
import { setupIpcHandlers } from "./ipc/handlers.js";
import { StoreService } from "./store/store.js";
import { isDev } from "./util.js";
import { getPreloadPath } from "./pathResolver.js";


export class Main {
  private mainWindow: BrowserWindow | null = null;
  private store: StoreService;

  constructor() {
    this.store = new StoreService();
  }

  private createWindow() {
    this.mainWindow = new BrowserWindow({
      width: 1300,
      height: 700,
      webPreferences: {
        nodeIntegration: false,
        contextIsolation: true,
        preload: getPreloadPath(),
      },
      autoHideMenuBar: true,
    });

    if (isDev()) {
      this.mainWindow.loadURL("http://localhost:5123");
      // this.mainWindow.webContents.openDevTools();
    } else {
      this.mainWindow.loadFile(path.join(app.getAppPath(), 'dist-react/index.html'));
    }
  }

  public init() {
    app.on("ready", () => {
      this.createWindow();
      setupIpcHandlers(this.store);
    });

    app.on("window-all-closed", () => {
      if (process.platform !== "darwin") {
        app.quit();
      }
    });

    app.on("activate", () => {
      if (this.mainWindow === null) {
        this.createWindow();
      }
    });
  }
}

// Inicialização da aplicação
const main = new Main();
main.init();