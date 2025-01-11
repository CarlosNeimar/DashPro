import store from '../store.js';
import { v4 as uuid } from 'uuid'; // Explicação abaixo

interface Module {
  id: string;
  name: string;
  path: string;
  class: string;
  status: string;
}

const getModules = (): Module[] => {
  return store.get('modules') || [];
};

const addModule = (name: string, path: string, classType: string): Module => {
  const newModule: Module = {
    id: uuid(),
    name,
    path,
    class: classType,
    status: 'idle',
  };

  const modules = getModules();
  modules.push(newModule);
  store.set('modules', modules);

  return newModule;
};

const removeModule = (id: string): void => {
  const modules = getModules().filter((module) => module.id !== id);
  store.set('modules', modules);
};

export { getModules, addModule, removeModule };
