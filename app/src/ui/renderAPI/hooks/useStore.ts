import { useState, useEffect } from 'react';
import storeApi from '../api/storeAPI.js';
import { Settings, Module, ModuleClass } from '../../../electron/types/types';

export function useSettings() {
  const [settings, setSettings] = useState<Settings>({
    theme: 'light',
    defaultEditor: 'vscode',
    notifications: false
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadSettings = async () => {
      console.log('Iniciando carregamento de configurações');
      try {
        const newSettings = await storeApi.getSettings();
        console.log('Configurações recebidas:', newSettings);
        if (newSettings) {
          setSettings(newSettings);
        }
      } catch (error) {
        console.error('Erro ao carregar configurações:', error);
      } finally {
        console.log('Finalizando carregamento de configurações');
        setIsLoading(false);
      }
    };

    loadSettings();
  }, []);

  const updateSettings = async (updates: Partial<Settings>) => {
    try {
      await storeApi.updateSettings(updates);
      setSettings(current => ({ ...current, ...updates }));
    } catch (error) {
      console.error('Erro ao atualizar configurações:', error);
    }
  };

  return { settings, updateSettings, isLoading };
}

export function useModules() {
  const [modules, setModules] = useState<Module[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const loadModules = async () => {
      console.log('Iniciando carregamento dos módulos');
      try {
        const data = await storeApi.getModules();
        setModules(data);
        console.log('Módulos recebidos:', data);
      } catch (error) {
        console.error('Erro ao carregar módulos:', error);
      } finally {
        console.log('Finalizando carregamento dos módulos');
        setIsLoading(false);
      }
    };

    loadModules();
  }, [refresh]);

  const addModule = async (module: Module) => {
    await storeApi.addModule(module);
  };

  const updateModule = async (id: string, updates: Partial<Module>) => {
    await storeApi.updateModule(id, updates);
  };

  const deleteModule = async (id: string) => {
    await storeApi.deleteModule(id);
  };

  return { modules, addModule, updateModule, deleteModule, isLoading };
}


export function useModuleClasses() {
  const [moduleClasses, setModuleClasses] = useState<ModuleClass[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadModuleClasses = async () => {
      console.log('Iniciando carregamento das classes');
      try {
        const data = await storeApi.getModuleClasses();
        setModuleClasses(data);
        console.log('Classes recebidas:', data);
      } catch (error) {
        console.error('Erro ao carregar classes de módulos:', error);
      } finally {
        console.log('Finalizando carregamento das classes');
        setIsLoading(false);
      }
    };

    loadModuleClasses();
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

  return { moduleClasses, addModuleClass, updateModuleClass, deleteModuleClass, isLoading };
}

export function useIcons() {
  const [icons, setIcons] = useState<{ name: string; path: string }[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadIcons = async () => {
      try {
        const data = await storeApi.getIcons();
        setIcons(data);
      } catch (error) {
        console.error('Erro ao carregar ícones:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadIcons();
  }, []);

  return { icons, isLoading };
}