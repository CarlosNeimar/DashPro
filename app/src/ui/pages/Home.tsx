import { Module, useAppData } from "../context/AppDataContext";

const { modules } = useAppData();

function renderModule(module: Module) {
  return (
    <div key={module.id} className="module">
      <h3>{module.name}</h3>
      <p>{module.description}</p>
    </div>
  );
}

export const Home = () => {
  return (
    <div className="home-container h-screen flex flex-col">
      <div className="top-section flex-grow-[3] bg-background  p-4">
        <div className="w-fit">
          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
            Principais Modulos
          </h2>
        </div>
      </div>
      <div className="bottom-section flex-grow-[1] bg-popover p-4">
        <div className="w-fit">
          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
            Todos os Modulos
          </h2>
        </div>
      </div>
    </div>
  );
};
