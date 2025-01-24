import React from 'react';
import { motion } from 'framer-motion';
import { StarOff } from 'lucide-react';
import { Card } from "@/components/ui/card";
import LordIcon from "../lordicons/Lordi";
import Favorit from "@/ui/assets/icons/Start-favorite.json";
import { useModules } from "@/ui/renderAPI/hooks/useStore";
interface ModulecardProps {
  id: string;
  name: string;
  path: string;
  Classname: string;
  Classicon: string;
  Classcolor: string;
  status: string;
  isFavorite: boolean;
  description?: string;
  onFavoriteChange: () => void; // Prop de atualização
}

const isColorLight = (color: string): boolean => {
  const hex = color.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 128;
};

const isYellowOrOrange = (color: string): boolean => {
  const hex = color.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16) / 255;
  const g = parseInt(hex.substring(2, 4), 16) / 255;
  const b = parseInt(hex.substring(4, 6), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min;

  let hue = 0;

  if (delta !== 0) {
    if (max === r) hue = ((g - b) / delta) % 6;
    else if (max === g) hue = (b - r) / delta + 2;
    else hue = (r - g) / delta + 4;
    hue *= 60;
    if (hue < 0) hue += 360;
  }

  return hue >= 30 && hue <= 60;
};

export const Modulecard: React.FC<ModulecardProps> = ({
  id,
  name,
  Classicon,
  Classcolor,
  isFavorite: initialFavorite,
  onFavoriteChange,
}) => {
  const [isFavorite, setIsFavorite] = React.useState(initialFavorite);
  const { updateModule } = useModules();

  const textColor = isColorLight(Classcolor) ? 'black' : 'white';
  const iconColor = isYellowOrOrange(Classcolor)
    ? 'white'
    : isColorLight(Classcolor)
    ? '#F09C2B'
    : 'yellow';

  const handleFavoriteToggle = async () => {
    const updatedFavorite = !isFavorite;
    setIsFavorite(updatedFavorite);
    try {
      await updateModule(id, { isFavorite: updatedFavorite });
      console.log(`Módulo ${id} atualizado com sucesso.`);
      onFavoriteChange();
    } catch (error) {
      console.error(`Erro ao atualizar favorito do módulo ${id}:`, error);
      // Reverter a mudança no estado local em caso de erro
      setIsFavorite(!updatedFavorite);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <Card
        className="h-72 relative overflow-hidden cursor-pointer"
        style={{ backgroundColor: Classcolor, color: textColor }}
      >
        {/* Favorite Button */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={handleFavoriteToggle}
          className="absolute top-4 right-4 z-10"
        >
          {isFavorite ? (
            <LordIcon
              icon={Favorit}
              size={20}
              trigger="hover"
              colors={`primary:${iconColor}`}
            />
          ) : (
            <StarOff
              className="w-5 h-5"
              style={{ color: iconColor }}
            />
          )}
        </motion.button>

        {/* Title */}
        <motion.h3
          className="text-lg font-semibold text-center mt-6 px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          {name}
        </motion.h3>

        {/* Icon Container */}
        <motion.div
          className="w-16 h-16 rounded-xl flex items-center justify-center mx-auto mt-12"
          whileHover={{ rotate: 5 }}
          transition={{ duration: 0.2 }}
        >
          <span className="text-2xl">{Classicon}</span>
        </motion.div>
      </Card>
    </motion.div>
  );
};

export default Modulecard;
