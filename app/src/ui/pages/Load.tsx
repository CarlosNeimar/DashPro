import { motion } from "framer-motion";
import LOADING_ICON from "../assets/icons/Logo.json";
import LordIcon from "../lordicons/Lordi";
import { useEffect } from "react";
// interface LoadProps {
//   loadingMessage?: string;
// }

// export const Load: React.FC<LoadProps> = ({
//   loadingMessage = "Carregando configurações do sistema"
// }) => {
export const Load = () => {

  useEffect(() => {
    setTimeout(() => {
      window.location.href = "/home";
    }, 2500);
  });

  return (
    <div className="flex min-h-svh bg-stone-950 items-center justify-center">      <motion.div
      className="flex flex-col items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <h1 className="mb-8 scroll-m-20 text-5xl font-extrabold tracking-tight lg:text-6xl relative">
        <span className="text-primary">Dash</span>
        <span className="text-white">pro</span>
        <div className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-primary/0 via-primary to-primary/0"></div>
      </h1>

      <div className="relative">
        <div className="absolute -inset-4 bg-primary/10 blur-lg rounded-full"></div>
        <motion.div
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
        >
          <LordIcon
            icon={LOADING_ICON}
            size={120}
            trigger="loop"
            colors="primary:#ffffff"
          />
        </motion.div>
      </div>

      <div className="mt-8 space-y-2 text-center">
        {/* <motion.p
          className="text-white/80 text-sm font-medium"
          whileHover={{ x: 10 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          {loadingMessage}
        </motion.p> */}
        <motion.p
          className="text-white/40 text-xs"
          whileHover={{ x: -10 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          Por favor, aguarde um momento...
        </motion.p>
      </div>
    </motion.div>
    </div>
  );
};
