import Store from 'electron-store';

interface Module {
  id: string;
  name: string;
  path: string;
  class: string;
  status: string;
  isFavorite: boolean;
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
    modules: [
      {
        id: "1",
        name: "Module A",
        path: "/path/to/module-a",
        class: "Utility",
        status: "",
        isFavorite: false,
      },
      {
        id: "2",
        name: "Module B",
        path: "/path/to/module-b",
        class: "Tool",
        status: "",
        isFavorite: false,
      },
    ],
    settings: {
      theme: "light",
      defaultEditor: "vscode",
      notifications: true,
    },
  },
});


export default store;
