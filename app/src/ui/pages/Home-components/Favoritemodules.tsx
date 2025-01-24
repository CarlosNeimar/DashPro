import { useModules } from '../../renderAPI/hooks/useStore';
import { Modulecard } from '@/ui/new components/Modulecard';

interface FavoritesProps {
  onRefresh: () => void;
}

export const Favoritemodules: React.FC<FavoritesProps> = ({ onRefresh}) => {
  const { modules } = useModules();

  return (
    <>
      <div className="top-section flex-grow-[3] bg-background p-4">
        <div className="w-fit">
          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
            Principais Modulos
          </h2>
        </div>
        {modules.map((module) => (
          <div className="block w-52">
            <Modulecard
              key={module.id}
              id={module.id}
              name={module.name}
              path={module.path}
              Classname={module.class.name}
              Classicon={module.class.icon}
              Classcolor={module.class.color}
              status={module.status}
              isFavorite={module.isFavorite}
              description={module.description}
              onFavoriteChange={onRefresh}
            />
          </div>
            ))}
      </div>
    </>
  )
}