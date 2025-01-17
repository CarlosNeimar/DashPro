import React, { useState } from 'react';
import { useModules, useModuleClasses, useSettings } from './renderAPI/hooks/useStore';

export default function TestDashboard() {
  const { modules, addModule, updateModule, deleteModule } = useModules();
  const { moduleClasses, addModuleClass, updateModuleClass, deleteModuleClass } = useModuleClasses();
  const { settings, updateSettings } = useSettings();
  
  const [newClassName, setNewClassName] = useState('');
  const [newModuleName, setNewModuleName] = useState('');
  const [selectedClassId, setSelectedClassId] = useState('');

  // Previne o erro de controlled/uncontrolled input
  const currentSettings = settings || {
    theme: 'light',
    notifications: false,
    defaultEditor: 'vscode'
  };

  // Handlers para ModuleClass
  const handleAddClass = () => {
    if (!newClassName) return;
    
    addModuleClass({
      id: crypto.randomUUID(),
      name: newClassName, 
      icon: '📦',
      color: '#' + Math.floor(Math.random()*16777215).toString(16),
      description: `Classe criada em ${new Date().toLocaleString()}`
    });
    
    setNewClassName('');
  };

  // Handlers para Module
  const handleAddModule = () => {
    if (!newModuleName || !selectedClassId) return;
    
    const selectedClass = moduleClasses.find(c => c.id === selectedClassId);
    if (!selectedClass) return;

    addModule({
      id: crypto.randomUUID(),
      name: newModuleName,
      path: `/path/${newModuleName.toLowerCase().replace(/\s+/g, '-')}`,
      class: selectedClass,
      status: 'active',
      isFavorite: false,
      description: `Módulo criado em ${new Date().toLocaleString()}`
    });
    
    setNewModuleName('');
  };

  return (
    <div className="p-4">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Configurações</h2>
        <div className="space-y-2">
          <div>
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                checked={currentSettings.notifications}
                onChange={(e) => updateSettings({ notifications: e.target.checked })}
                className="form-checkbox h-5 w-5"
              />
              <span className="ml-2">Notificações</span>
            </label>
          </div>
          <div>
            <select
              value={currentSettings.theme}
              onChange={(e) => updateSettings({ theme: e.target.value })}
              className="form-select mt-1 block w-48"
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Classes de Módulos</h2>
        <div className="mb-4 flex gap-2">
          <input
            type="text"
            value={newClassName}
            onChange={(e) => setNewClassName(e.target.value)}
            placeholder="Nome da nova classe"
            className="form-input px-4 py-2"
          />
          <button
            onClick={handleAddClass}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Adicionar Classe
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {moduleClasses.map(moduleClass => (
            <div
              key={moduleClass.id}
              className="border p-4 rounded"
              style={{ borderColor: moduleClass.color }}
            >
              <div className="flex justify-between items-center">
                <span className="text-xl">{moduleClass.icon}</span>
                <button
                  onClick={() => deleteModuleClass(moduleClass.id)}
                  className="text-red-500"
                >
                  ❌
                </button>
              </div>
              <h3 className="font-bold">{moduleClass.name}</h3>
              <p className="text-sm text-gray-600">{moduleClass.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Módulos</h2>
        <div className="mb-4 flex gap-2">
          <input
            type="text"
            value={newModuleName}
            onChange={(e) => setNewModuleName(e.target.value)}
            placeholder="Nome do novo módulo"
            className="form-input px-4 py-2"
          />
          <select
            value={selectedClassId}
            onChange={(e) => setSelectedClassId(e.target.value)}
            className="form-select"
          >
            <option value="">Selecione uma classe</option>
            {moduleClasses.map(moduleClass => (
              <option key={moduleClass.id} value={moduleClass.id}>
                {moduleClass.name}
              </option>
            ))}
          </select>
          <button
            onClick={handleAddModule}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Adicionar Módulo
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {modules.map(module => (
            <div
              key={module.id}
              className="border p-4 rounded"
              style={{ borderColor: module.class.color }}
            >
              <div className="flex justify-between items-center">
                <span className="text-xl">{module.class.icon}</span>
                <div className="space-x-2">
                  <button
                    onClick={() => updateModule(module.id, { isFavorite: !module.isFavorite })}
                    className={`text-yellow-500 ${module.isFavorite ? 'opacity-100' : 'opacity-50'}`}
                  >
                    ⭐
                  </button>
                  <button
                    onClick={() => deleteModule(module.id)}
                    className="text-red-500"
                  >
                    ❌
                  </button>
                </div>
              </div>
              <h3 className="font-bold">{module.name}</h3>
              <p className="text-sm text-gray-600">Classe: {module.class.name}</p>
              <p className="text-sm text-gray-600">{module.description}</p>
              <p className="text-xs text-gray-500">Path: {module.path}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}