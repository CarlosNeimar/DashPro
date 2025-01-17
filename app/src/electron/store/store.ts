import Store from 'electron-store';
import { Settings, Module, ModuleClass } from '../types/types.js';

interface StoreSchema {
  settings: Settings;
  modules: Module[];
  moduleClasses: ModuleClass[];
}

export class StoreService {
  private store: Store<StoreSchema>;

  constructor() {
    this.store = new Store<StoreSchema>({
      defaults: {
        settings: {
          theme: 'light',
          defaultEditor: 'vscode',
          notifications: true
        },
        modules: [],
        moduleClasses: []
      }
    });
  }

  // Settings methods
  getSettings(): Settings {
    return this.store.get('settings');
  }

  updateSettings(settings: Partial<Settings>): void {
    this.store.set('settings', { ...this.getSettings(), ...settings });
  }

  // Modules methods
  getModules(): Module[] {
    return this.store.get('modules');
  }

  addModule(module: Module): void {
    // Verifica se a classe existe antes de adicionar o módulo
    const moduleClass = this.store.get('moduleClasses').find(c => c.id === module.class.id);
    if (!moduleClass) {
      throw new Error('Module class not found');
    }
    const modules = this.getModules();
    modules.push(module);
    this.store.set('modules', modules);
  }

  updateModule(id: string, updates: Partial<Module>): void {
    const modules = this.getModules();
    const index = modules.findIndex(m => m.id === id);
    if (index !== -1) {
      modules[index] = { ...modules[index], ...updates };
      this.store.set('modules', modules);
    }
  }

  deleteModule(id: string): void {
    const modules = this.getModules();
    this.store.set('modules', modules.filter(m => m.id !== id));
  }

  // Module Classes methods
  getModuleClasses(): ModuleClass[] {
    return this.store.get('moduleClasses');
  }

  addModuleClass(moduleClass: ModuleClass): void {
    const classes = this.getModuleClasses();
    classes.push(moduleClass);
    this.store.set('moduleClasses', classes);
  }

  updateModuleClass(id: string, updates: Partial<ModuleClass>): void {
    const classes = this.getModuleClasses();
    const index = classes.findIndex(c => c.id === id);
    if (index !== -1) {
      classes[index] = { ...classes[index], ...updates };
      this.store.set('moduleClasses', classes);
    }
  }

  deleteModuleClass(id: string): void {
    const classes = this.getModuleClasses();
    this.store.set('moduleClasses', classes.filter(c => c.id !== id));
  }


  // Metodos auxiliares:
  getModuleWithClass(moduleId: string): Module | null {
    const module = this.getModules().find(m => m.id === moduleId);
    if (!module) return null;

    const moduleClass = this.getModuleClasses().find(c => c.id === module.class.id);
    if (!moduleClass) return null;

    return {
      ...module,
      class: moduleClass
    };
  }

  getAllModulesWithClasses(): Module[] {
    const modules = this.getModules();
    const classes = this.getModuleClasses();
    
    return modules.map(module => ({
      ...module,
      class: classes.find(c => c.id === module.class.id) || module.class
    }));
  }
}