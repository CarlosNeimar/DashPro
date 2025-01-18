import { useModules } from '../../renderAPI/hooks/useStore';
import { Modulecard } from '@/ui/new components/Modulecard';

export const Allmodules = () => {
  const { modules } = useModules();

  return (
    <div className="bottom-section flex-grow-[1] bg-popover p-4">
      <div className="w-fit">
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          Todos os Modulos
        </h2>
      </div>
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
  );
};
