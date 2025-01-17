import { useAppData } from "../context/AppDataContext";
import { ModeToggle } from "../new components/Mode-togle";

export const Home = () => {
  const { settings, modules } = useAppData();

  return (
      <div className="bg-background">
        <h1>Home</h1>
        <ModeToggle />
        <pre>{JSON.stringify(settings, null, 2)}</pre>
        <pre>{JSON.stringify(modules, null, 2)}</pre>
      </div>
  );
};
