import { Layout } from "./layout";
import { Load } from "./pages/Load";
import { useEffect, useState } from "react";
import { useSettings, useModules, useModuleClasses } from './renderAPI/hooks/useStore';

export const App = () => {
  const [isReady, setIsReady] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("Iniciando aplicação...");
  
  const { settings, isLoading: settingsLoading } = useSettings();
  const { moduleClasses, isLoading: classesLoading } = useModuleClasses();
  const { modules, isLoading: modulesLoading } = useModules();

  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    const checkLoading = () => {
      console.log('Status de carregamento:', {
        settings: settingsLoading,
        classes: classesLoading,
        modules: modulesLoading
      });

      if (!settingsLoading) {
        console.log('Configurações carregadas:', settings);
      }
      if (!classesLoading) {
        console.log('Classes carregadas:', moduleClasses);
      }
      if (!modulesLoading) {
        console.log('Módulos carregados:', modules);
      }

      // Se tudo estiver carregado
      if (!settingsLoading && !classesLoading && !modulesLoading) {
        console.log('Todos os dados carregados, iniciando timer para renderização');
        setLoadingMessage("Finalizando carregamento...");
        
        // Timer mínimo antes de mostrar a aplicação
        timer = setTimeout(() => {
          console.log('Timer finalizado, preparando para renderizar Layout');
          setIsReady(true);
        }, 2500);
      } else {
        // Atualiza mensagem baseado no que está carregando
        if (settingsLoading) setLoadingMessage("Carregando configurações...");
        else if (classesLoading) setLoadingMessage("Carregando classes...");
        else if (modulesLoading) setLoadingMessage("Carregando módulos...");
      }
    };

    checkLoading();

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [settingsLoading, classesLoading, modulesLoading, settings, moduleClasses, modules]);

  console.log('Estado atual da aplicação:', {
    isReady,
    loadingMessage,
    settingsLoaded: !settingsLoading,
    classesLoaded: !classesLoading,
    modulesLoaded: !modulesLoading
  });

  if (!isReady) {
    return <Load loadingMessage={loadingMessage} />;
  }

  return <Layout />;
};
