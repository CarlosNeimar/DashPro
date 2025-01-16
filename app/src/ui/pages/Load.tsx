import { useEffect, useState } from "react";
import LOADING_ICON from '../assets/icons/Logo.json';
import LordIcon from "../lordicons/Lordi";

export const Load = ({ onLoadComplete }: { onLoadComplete: () => void }) => {
  const [loading, setLoading] = useState(true);
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    setTimeout(() => setFadeIn(true), 100);

    const fetchData = async () => {
      try {
        //@ts-ignore
        const settings = await window.electron.getSettings();
        //@ts-ignore
        const modules = await window.electron.getModules();

        localStorage.setItem("settings", JSON.stringify(settings));
        localStorage.setItem("modules", JSON.stringify(modules));

        setLoading(false);
        onLoadComplete();
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      }
    };

    fetchData();
  }, [onLoadComplete]);

  return (
    <div className="flex min-h-svh bg-stone-950 items-center justify-center">
      <div 
        className={`flex flex-col items-center transition-opacity duration-1000 ${
          fadeIn ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <h1 className="mb-8 scroll-m-20 text-5xl font-extrabold tracking-tight lg:text-6xl relative">
          <span className="text-primary">DASH</span>
          <span className="text-white">pro</span>
          <div className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-primary/0 via-primary to-primary/0"></div>
        </h1>
        
        <div className="relative">
          <div className="absolute -inset-4 bg-primary/10 blur-lg rounded-full"></div>
          <LordIcon
            icon={LOADING_ICON}
            size={120}
            trigger="loop"
            colors="primary:#ffffff"
          />
        </div>
        
        {loading && (
          <div className="mt-8 space-y-2 text-center">
            <p className="text-white/80 text-sm font-medium">
              Carregando configurações do sistema
            </p>
            <p className="text-white/40 text-xs">
              Por favor, aguarde um momento...
            </p>
          </div>
        )}
      </div>
    </div>
  );
};