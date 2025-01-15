import { useEffect, useState } from "react";

export function Modules() {
  const [modules, setModules] = useState<{ id: string; name: string; isFavorite: boolean }[]>([]);
  const [favorites, setFavorites] = useState<{ id: string; name: string; isFavorite: boolean }[]>([]);

  useEffect(() => {
    // Fetch all modules
    //@ts-ignore
    window.electron.getModules().then(setModules);

    // Fetch favorite modules
    //@ts-ignore
    window.electron.getFavorites().then(setFavorites);
  }, []);

  const toggleFavorite = (moduleId: string) => {
    //@ts-ignore
    window.electron.toggleFavorite(moduleId).then((updatedModules) => {
      setModules(updatedModules);
      setFavorites(updatedModules.filter((mod: { isFavorite: any; }) => mod.isFavorite));
    });
  };

  return (
    <div>
      <h1>All Modules</h1>
      <ul>
        {modules.map((mod) => (
          <li key={mod.id}>
            <span>{mod.name}</span>
            <button onClick={() => toggleFavorite(mod.id)}>
              {mod.isFavorite ? "Unfavorite" : "Favorite"}
            </button>
          </li>
        ))}
      </ul>

      <h1>Favorite Modules</h1>
      <ul>
        {favorites.map((mod) => (
          <li key={mod.id}>{mod.name}</li>
        ))}
      </ul>
    </div>
  );
}
