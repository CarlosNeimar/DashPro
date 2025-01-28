import { useModules } from '../../renderAPI/hooks/useStore';
import { Modulecard } from '@/ui/new components/Modulecard';

export const Allmodules = () => {
  const { modules } = useModules();

  return (
    <div className="top-section flex-grow-[3] bg-popover p-4">
      <div className="w-fit mx-auto">
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 text-center">
          Toods os Módulos
        </h2>
      </div>

      <div className="grid grid-cols-5 gap-4 mt-5">
        {modules.map((module) => (
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
          />
        ))}
      </div>
    </div>
  );
};
