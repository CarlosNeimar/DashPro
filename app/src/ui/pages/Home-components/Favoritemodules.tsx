import { useModules } from '../../renderAPI/hooks/useStore';
import { Modulecard } from '@/ui/new components/Modulecard';

export const Favoritemodules = () => {
  const { modules } = useModules();

  return (
    <>
      <div className="top-section flex-grow-[3] bg-background p-4">
        <div className="w-fit mx-auto">
          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 text-center">
            Principais Módulos
          </h2>
        </div>

        {/* Grid centralizado */}
        <div className="grid grid-cols-1 ml-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 justify-items-center">
          {modules.map((module) => (
            <div key={module.id} className="block w-52"> {/* Moved the key prop here */}
              <Modulecard
                id={module.id}
                name={module.name}
                path={module.path}
                Classname={module.class.name}
                Classicon={module.class.icon}
                Classcolor={module.class.color}
                status={module.status}
                isFavorite={module.isFavorite}
                description={module.description}
                format='title'
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};