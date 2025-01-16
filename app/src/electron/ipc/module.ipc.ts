import { ipcMain } from "electron";
import store from "../store.js";

ipcMain.handle("get-modules", async () => {
  return store.get("modules") || [];
});

ipcMain.handle("add-module", async (_event, moduleData) => {
  const modules = store.get("modules") || [];
  modules.push(moduleData);
  store.set("modules", modules);
  return moduleData;
});

ipcMain.handle("remove-module", async (_event, moduleId) => {
  const modules = (store.get("modules") || []).filter(
    (module: { id: string }) => module.id !== moduleId
  );
  store.set("modules", modules);
  return moduleId;
});
