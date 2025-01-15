import { useState, useEffect } from "react";
import { Home } from "./pages/Home";
import { Load } from "./pages/Load";

export function App() {

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a loading delay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading ? (
        <>
        {/*//TODO: Pagina de loading */}
        </>
      ) : (
        <>
        <Load/>
        </>
      )}
    </>
  );
}
