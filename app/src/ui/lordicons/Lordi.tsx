import ICON from '../assets/icons/Logo.json';
import { useEffect, useRef } from 'react';
import { Player } from '@lordicon/react';


export default function PlayOnce() {    
  const playerRef = useRef<Player>(null);
  
    useEffect(() => {
        playerRef.current?.playFromBeginning();
    }, [])

    return (
        <Player 
            ref={playerRef} 
            icon={ ICON }
        />
    );
}