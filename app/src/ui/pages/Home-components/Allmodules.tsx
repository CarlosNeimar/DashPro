import { useModules } from '../../renderAPI/hooks/useStore';
import { Modulecard } from '@/ui/new components/Modulecard';

export const Allmodules = () => {
  const { modules } = useModules();

  return (
    <div className="top-section flex-grow-[3] bg-popover p-4">
      <div className="w-fit mx-auto">
        <h2 className="scroll-m-20 border-b pb-2 text-2xl sm:text-3xl font-semibold tracking-tight first:mt-0 text-center">
          Todos os Módulos
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-5 px-4 sm:px-0">
        {modules.map((module) => (

          <div className="block w-full" key={`${module.id}`}>
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
              format='group'
            />
          </div>

        ))}
      </div>
    </div>
  );
};