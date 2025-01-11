import Store from 'electron-store';

interface Module {
  id: string;
  name: string;
  path: string;
  class: string;
  status: string;
}

interface Settings {
  theme: string;
  defaultEditor: string;
  notifications: boolean;
}

const store = new Store<{
  modules: Module[];
  settings: Settings;
}>({
  defaults: {
    modules: [],
    settings: {
      theme: 'light',
      defaultEditor: 'vscode',
      notifications: true,
    },
  },
});

export default store;
