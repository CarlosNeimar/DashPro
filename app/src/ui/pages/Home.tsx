import { useModules } from '../renderAPI/hooks/useStore';
import { Nomodules } from './Home-components/Nomodules';
import { Allmodules } from './Home-components/Allmodules';
import { Favoritemodules } from './Home-components/Favoritemodules';
import { useEffect, useState } from 'react';

export const Home = () => {
  const { modules } = useModules();
  const [haveModules, setHaveModules] = useState(false);
  const [haveFavorite, setHaveFavorite] = useState(false);

  useEffect(() => {
    if (modules.length > 0) {
      setHaveModules(true);
      setHaveFavorite(modules.some((module) => module.isFavorite));
    } else {
      setHaveModules(false);
      setHaveFavorite(false);
    }
  }, [modules]);

  return (
    <div className="home-container h-screen flex flex-col">
      {haveModules ? (
        <>
          {haveFavorite && <Favoritemodules />}
          <Allmodules />
        </>
      ) : (
        <Nomodules />
      )}
    </div>
  );
};