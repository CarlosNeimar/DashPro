import store from '../store.js';

interface Settings {
  theme: string;
  defaultEditor: string;
  notifications: boolean;
}

const getSettings = (): Settings => {
  return store.get('settings');
};

const updateSettings = (newSettings: Partial<Settings>): Settings => {
  const settings = { ...getSettings(), ...newSettings };
  store.set('settings', settings);
  return settings;
};

export { getSettings, updateSettings };
