import { ipcMain } from 'electron';
import { StoreService } from '../store/store.js'

export function setupIpcHandlers(store: StoreService) {
  // Settings handlers
  ipcMain.handle('get-settings', () => store.getSettings());
  ipcMain.handle('update-settings', (_, settings) => store.updateSettings(settings));

  // Modules handlers
  ipcMain.handle('get-modules', () => store.getAllModulesWithClasses());
  ipcMain.handle('add-module', (_, module) => store.addModule(module));
  ipcMain.handle('update-module', (_, id, updates) => store.updateModule(id, updates));
  ipcMain.handle('delete-module', (_, id) => store.deleteModule(id));

  // Module Classes handlers
  ipcMain.handle('get-module-classes', () => store.getModuleClasses());
  ipcMain.handle('add-module-class', (_, moduleClass) => store.addModuleClass(moduleClass));
  ipcMain.handle('update-module-class', (_, id, updates) => 
    store.updateModuleClass(id, updates));
  ipcMain.handle('delete-module-class', (_, id) => store.deleteModuleClass(id));
}