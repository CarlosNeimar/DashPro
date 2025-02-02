import { ipcMain } from 'electron';
import { StoreService } from '../store/store.js';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

// Get dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

  // Icons handlers with error handling
  ipcMain.handle('get-icons', async () => {
    try {
      const iconsPath = path.resolve(__dirname, '../../src/ui/assets/icons/modulesicons');
  
      if (!fs.existsSync(iconsPath)) {
        console.error(`Icons directory not found: ${iconsPath}`);
        return [];
      }
  
      const files = fs.readdirSync(iconsPath);
  
      // Filtra apenas arquivos .json
      const jsonFiles = files.filter(file => file.endsWith('.json'));
  
      // Retorna os arquivos sem a extensão .json
      return jsonFiles.map(file => ({
        name: file.replace('.json', ''), // Remove a extensão .json
        path: path.join(iconsPath, file)
      }));
    } catch (error) {
      console.error('Error reading icons directory:', error);
      return [];
    }
  });
}