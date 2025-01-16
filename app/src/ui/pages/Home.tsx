import { useAppData } from "../context/AppDataContext";

export const Home = () => {
  const { settings, modules } = useAppData();

  return (
    <div>
      <h1>Home</h1>
      <pre>{JSON.stringify(settings, null, 2)}</pre>
      <pre>{JSON.stringify(modules, null, 2)}</pre>
    </div>
  );
};
