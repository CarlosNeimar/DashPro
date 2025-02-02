import { motion } from 'framer-motion';
import Lottie from 'lottie-react';
import Animation from '@/ui/assets/arts/Nomodules.json';
import LordIcon from '@/ui/lordicons/Lordi';
import Addclass from '@/ui/assets/icons/Newclass.json';
import Addmodules from '@/ui/assets/icons/Newmodule.json';
import { useSettings } from '@/ui/renderAPI/hooks/useStore';

export const Nomodules = () => {
  const { settings } = useSettings();

  const backgrondcolor = () => {
    return settings.theme === 'light';
  };

  const textColor = backgrondcolor() ? 'black' : 'white';

  // Animação de fade in e fade out para os 3 pontos
  const dotFadeAnimation = {
    initial: { opacity: 0 },
    animate: (i: number) => ({
      opacity: [0, 1, 0], // Alterna entre visível e invisível
      transition: {
        delay: i * 0.5, // Atraso entre os pontos
        duration: 1.5, // Duração da animação
        repeat: Infinity, // Repetição infinita
        ease: 'easeInOut', // Easing suave
      },
    }),
  };

  // Animação de flutuação para a animação Lottie
  const floatAnimation = {
    initial: { y: 0 },
    animate: {
      y: [-10, 10], // Movimento para cima e para baixo
      transition: {
        duration: 3, // Duração mais longa para suavidade
        repeat: Infinity, // Repetição infinita
        repeatType: 'mirror' as const, // Inverte a animação ao repetir
        ease: 'easeInOut', // Easing suave
      },
    },
  };

  return (
    <div className="flex h-screen p-5">
      {/* Lado esquerdo: Botões */}
      <div className="w-1/2 flex flex-col justify-start items-start space-y-8 mt-10">
        <motion.h2
          className="scroll-m-20 text-3xl font-semibold tracking-tight flex items-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Sem modulos ainda
          <motion.span className="flex">
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                custom={i} // Passa o índice para a animação
                variants={dotFadeAnimation}
                initial="initial"
                animate="animate"
              >
                .
              </motion.span>
            ))}
          </motion.span>
        </motion.h2>

        <motion.div
          className="flex flex-col space-y-4"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          {/* Botão Nova Classe */}
          <button
            className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            onClick={() => window.location.href = 'home/newclass'}
          >
            <LordIcon
              icon={Addclass}
              size={130}
              trigger="loop"
              colors={`primary:#32CD32,secondary:${textColor}`}
            />
            <span className="text-xl">Nova classe</span>
          </button>

          {/* Botão Novo Módulo */}
          <button
            className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            onClick={() => console.log('Novo modulo clicado!')}
          >
            <LordIcon
              icon={Addmodules}
              size={130}
              trigger="loop"
              colors={`primary:#32CD32,secondary:${textColor}`}
            />
            <span className="text-xl">Novo modulo</span>
          </button>
        </motion.div>
      </div>

      {/* Lado direito: Animação Lottie com flutuação */}
      <motion.div
        className="w-1/2 flex justify-center items-center"
        variants={floatAnimation}
        initial="initial"
        animate="animate"
      >
        <Lottie
          animationData={Animation}
          loop
          autoplay
          style={{ width: '80%', height: '80%' }}
        />
      </motion.div>
    </div>
  );
};