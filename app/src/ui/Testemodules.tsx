import React, { useState } from "react";

const ModuleManager: React.FC = () => {
  const [modules, setModules] = useState<any[]>([]); // Armazena os módulos no estado
  const [newModule, setNewModule] = useState({
    name: "",
    path: "",
    classType: "",
  });

  // Carregar módulos do backend
  const loadModules = async () => {
    try {
      //@ts-ignore
      const loadedModules = await window.electron.getModules();
      setModules(loadedModules);
    } catch (error) {
      console.error("Erro ao carregar módulos:", error);
    }
  };

  // Adicionar módulo
  const addModule = async () => {
    if (!newModule.name || !newModule.path || !newModule.classType) {
      alert("Preencha todos os campos para adicionar um módulo!");
      return;
    }
    try {
      //@ts-ignore
      await window.electron.addModule(
        newModule.name,
        newModule.path,
        newModule.classType
      );
      alert("Módulo adicionado com sucesso!");
      setNewModule({ name: "", path: "", classType: "" }); // Limpa o formulário
      loadModules(); // Atualiza a lista de módulos
    } catch (error) {
      console.error("Erro ao adicionar módulo:", error);
    }
  };

  // Remover módulo
  const removeModule = async (id: string) => {
    try {
      // @ts-ignore
      await window.electron.removeModule(id);
      alert("Módulo removido com sucesso!");
      loadModules(); // Atualiza a lista de módulos
    } catch (error) {
      console.error("Erro ao remover módulo:", error);
    }
  };

  // Carregar módulos na primeira renderização
  React.useEffect(() => {
    loadModules();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Gerenciar Módulos</h1>
      
      {/* Formulário para adicionar módulo */}
      <div className="mb-4">
        <h2 className="text-xl mb-2">Adicionar Novo Módulo</h2>
        <input
          className="border p-2 mb-2 w-full"
          placeholder="Nome"
          value={newModule.name}
          onChange={(e) =>
            setNewModule((prev) => ({ ...prev, name: e.target.value }))
          }
        />
        <input
          className="border p-2 mb-2 w-full"
          placeholder="Caminho"
          value={newModule.path}
          onChange={(e) =>
            setNewModule((prev) => ({ ...prev, path: e.target.value }))
          }
        />
        <input
          className="border p-2 mb-2 w-full"
          placeholder="Classe"
          value={newModule.classType}
          onChange={(e) =>
            setNewModule((prev) => ({ ...prev, classType: e.target.value }))
          }
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={addModule}
        >
          Adicionar Módulo
        </button>
      </div>

      {/* Lista de módulos */}
      <div>
        <h2 className="text-xl mb-2">Lista de Módulos</h2>
        {modules.length === 0 ? (
          <p>Nenhum módulo encontrado.</p>
        ) : (
          <ul>
            {modules.map((module) => (
              <li
                key={module.id}
                className="flex items-center justify-between mb-2 p-2 border rounded"
              >
                <div>
                  <strong>{module.name}</strong> ({module.class}) -{" "}
                  {module.path}
                </div>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded"
                  onClick={() => removeModule(module.id)}
                >
                  Remover
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ModuleManager;
