import { Player } from '@lordicon/react';
import { useEffect, useRef } from 'react';

interface LordIconProps {
  icon: any;
  size?: number;
  state?: string;
  colorize?: string;
  colors?: string;
  direction?: 1 | -1;
  renderMode?: "AUTOMATIC" | "HARDWARE" | "SOFTWARE";
  onReady?: () => void;
  onComplete?: () => void;
  autoPlay?: boolean;
  trigger?: "hover" | "click" | "loop" | "none";
}

const LordIcon = ({
  icon,
  size = 32,
  state,
  colorize,
  colors,
  direction = 1,
  renderMode = "AUTOMATIC",
  onReady,
  onComplete,
  autoPlay = true,
  trigger = "none"
}: LordIconProps) => {
  const playerRef = useRef<Player>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (autoPlay) {
      playerRef.current?.playFromBeginning();
    }
  }, [autoPlay]);

  useEffect(() => {
    const container = containerRef.current;
    
    if (!container) return;

    const handleMouseEnter = () => {
      if (trigger === "hover") {
        playerRef.current?.playFromBeginning();
      }
    };

    const handleClick = () => {
      if (trigger === "click") {
        playerRef.current?.playFromBeginning();
      }
    };

    container.addEventListener("mouseenter", handleMouseEnter);
    container.addEventListener("click", handleClick);

    return () => {
      container.removeEventListener("mouseenter", handleMouseEnter);
      container.removeEventListener("click", handleClick);
    };
  }, [trigger]);

  useEffect(() => {
    if (trigger === "loop") {
      const interval = setInterval(() => {
        if (playerRef.current && !playerRef.current.isPlaying) {
          playerRef.current.playFromBeginning();
        }
      }, 100);

      return () => clearInterval(interval);
    }
  }, [trigger]);

  return (
    <div ref={containerRef} style={{ display: 'inline-block' }}>
      <Player
        ref={playerRef}
        icon={icon}
        size={size}
        state={state}
        colorize={colorize}
        colors={colors}
        direction={direction}
        renderMode={renderMode}
        onReady={onReady}
        onComplete={onComplete}
      />
    </div>
  );
};

export default LordIcon;