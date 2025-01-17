import { useState, useEffect } from 'react';
import storeApi from '../api/storeAPI.js';
import { Settings, Module, ModuleClass } from '../../../electron/types/types';

export function useSettings() {
  const [settings, setSettings] = useState<Settings>({
    theme: 'light',
    defaultEditor: 'vscode',
    notifications: false
  });

  useEffect(() => {
    storeApi.getSettings().then(newSettings => {
      if (newSettings) {
        setSettings(newSettings);
      }
    });
  }, []);

  const updateSettings = async (updates: Partial<Settings>) => {
    await storeApi.updateSettings(updates);
    setSettings(current => ({ ...current, ...updates }));
  };

  return { settings, updateSettings };
}

export function useModules() {
  const [modules, setModules] = useState<Module[]>([]);

  useEffect(() => {
    storeApi.getModules().then(setModules);
  }, []);

  const addModule = async (module: Module) => {
    await storeApi.addModule(module);
    setModules(await storeApi.getModules());
  };

  const updateModule = async (id: string, updates: Partial<Module>) => {
    await storeApi.updateModule(id, updates);
    setModules(await storeApi.getModules());
  };

  const deleteModule = async (id: string) => {
    await storeApi.deleteModule(id);
    setModules(await storeApi.getModules());
  };

  return { modules, addModule, updateModule, deleteModule };

}

export function useModuleClasses() {
  const [moduleClasses, setModuleClasses] = useState<ModuleClass[]>([]);

  useEffect(() => {
    storeApi.getModuleClasses().then(setModuleClasses);
  }, []);

  const addModuleClass = async (moduleClass: ModuleClass) => {
    await storeApi.addModuleClass(moduleClass);
    setModuleClasses(await storeApi.getModuleClasses());
  };

  const updateModuleClass = async (id: string, updates: Partial<ModuleClass>) => {
    await storeApi.updateModuleClass(id, updates);
    setModuleClasses(await storeApi.getModuleClasses());
  };

  const deleteModuleClass = async (id: string) => {
    await storeApi.deleteModuleClass(id);
    setModuleClasses(await storeApi.getModuleClasses());
  };

  return { moduleClasses, addModuleClass, updateModuleClass, deleteModuleClass };
}