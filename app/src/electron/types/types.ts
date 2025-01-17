export interface ModuleClass {
  id: string;
  name: string;
  icon: string;
  color: string;
  description?: string;
}

export interface Module {
  id: string;
  name: string;
  path: string;
  class: ModuleClass;
  status: string;
  isFavorite: boolean;
  description?: string;
}

export interface Settings {
  theme: string;
  defaultEditor: string;
  notifications: boolean;
}
