import React from 'react';
import { motion } from 'framer-motion';
import { StarOff } from 'lucide-react';
import { Card } from "@/components/ui/card";
import LordIcon from "../lordicons/Lordi";
import Favorit from "@/ui/assets/icons/Start-favorite.json";
import { useModules } from "@/ui/renderAPI/hooks/useStore";
// Dynamic icon import function
const importIcon = async (iconName: string) => {
  try {
    const icon = await import(`@/ui/assets/icons/${iconName}.json`);
    return icon.default;
  } catch (error) {
    console.error(`Error loading icon ${iconName}:`, error);
    return null;
  }
};

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
  format?: string;
  preview?: boolean;
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
  format,
  preview,
}) => {
  const [isFavorite, setIsFavorite] = React.useState(initialFavorite);
  const [isHovered, setIsHovered] = React.useState(false);
  const [iconData, setIconData] = React.useState(null);
  const { updateModule } = useModules();

  const textColor = isColorLight(Classcolor) ? 'black' : 'white';
  const iconColor = isYellowOrOrange(Classcolor)
    ? 'white'
    : isColorLight(Classcolor)
      ? '#F09C2B'
      : 'yellow';

  React.useEffect(() => {
    const loadIcon = async () => {
      const data = await importIcon(Classicon);
      setIconData(data);
    };
    loadIcon();
  }, [Classicon]);

  const handleFavoriteToggle = async () => {
    if (!preview) {
      const updatedFavorite = !isFavorite;
      setIsFavorite(updatedFavorite);
      try {
        await updateModule(id, { isFavorite: updatedFavorite });
        console.log(`Módulo ${id} atualizado com sucesso.`);
        console.log("Fazendo atualização de favoritos");
        window.location.reload();
      } catch (error) {
        console.error(`Erro ao atualizar favorito do módulo ${id}:`, error);
        setIsFavorite(!updatedFavorite);
      }
    }
  };

  const cardVariants = {
    initial: {
      opacity: 0,
      y: 20,
      zIndex: 0
    },
    animate: {
      opacity: 1,
      y: 0,
      zIndex: 0
    },
    hover: {
      y: format === "group" ? -20 : 0,
      scale: format === "group" ? 1.05 : 1.02,
      zIndex: 10,
      transition: {
        duration: 0.3,
        ease: "easeOut",
        zIndex: { duration: 0 }
      }
    }
  };

  const titleVariants = {
    initial: {
      opacity: 0,
      y: 30
    },
    hover: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };


  return (
    <div
      className="relative"
      style={{
        marginBottom: format === "group" ? "2rem" : "0",
        zIndex: isHovered ? 10 : 0
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        initial="initial"
        animate="animate"
        whileHover="hover"
        variants={cardVariants}
        className="relative"
      >
        <Card
          className="h-80 overflow-hidden cursor-pointer group relative flex flex-col items-center justify-center"
          style={{
            backgroundColor: Classcolor,
            color: textColor,
            transition: 'transform 0.3s ease-out'
          }}
        >
          {/* Favorite Button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={handleFavoriteToggle}
            className="absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
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

          {format === "title" ? (
            <motion.h3
              className="text-lg font-semibold text-center px-4 absolute top-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              {name}
            </motion.h3>
          ) : null}

          {/* Icon Container */}
          <motion.div
            className="w-32 h-32 rounded-xl flex items-center justify-center"
            // whileHover={{ rotate: 5 }}
            transition={{ duration: 0.2 }}
          >
            {iconData ? (
              <LordIcon
                icon={iconData}
                size={125}
                trigger='hover'
                colors={`primary:${textColor},secondary:#32CD32`}
              />
            ) : (
              <span className="text-4xl">{Classicon}</span>
            )}
          </motion.div>
        </Card>

        {/* Title for "group" format */}
        {format === "group" && (
          <motion.div
            variants={titleVariants}
            className="absolute w-full text-center text-foreground"
            style={{
              bottom: "-2rem",
              fontWeight: "500",
              zIndex: 5
            }}
          >
            {name}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default Modulecard;