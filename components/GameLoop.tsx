import React, { useEffect, useState, useRef } from 'react';
import { GameState, CharacterType } from '../types';
import { WarriorIcon, DragonIcon, WaterCupIcon, CastleIcon, FireEffect } from './Assets';

interface Props {
  character: CharacterType;
  setGameState: (state: GameState) => void;
  addWater: () => void;
  waterCollected: number;
}

const GameLoop: React.FC<Props> = ({ character, setGameState, addWater, waterCollected }) => {
  const [time, setTime] = useState(0);
  const [showIntro, setShowIntro] = useState(true);
  const [dragonVisible, setDragonVisible] = useState(false);
  const [fireVisible, setFireVisible] = useState(false);
  const [position, setPosition] = useState(0); // 0 to 100 progress

  const loopRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const hasTriggeredPauseRef = useRef(false);

  useEffect(() => {
    // Intro text timer
    const introTimer = setTimeout(() => {
      setShowIntro(false);
      startTimeRef.current = Date.now();
      startWalking();
    }, 4000); // Read text for 4 seconds

    return () => clearTimeout(introTimer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const startWalking = () => {
    const duration = 12000; // 12 seconds total sequence until pause

    const update = () => {
      const now = Date.now();
      const elapsed = now - (startTimeRef.current || now);
      setTime(elapsed);

      // Walk logic
      if (elapsed < 8000) {
        setPosition((elapsed / 8000) * 80); // Move to 80% (castle)
      } else {
        setPosition(80); // Stop at castle
      }
    };

    loopRef.current = window.setInterval(update, 100);
    return () => {
        if (loopRef.current) clearInterval(loopRef.current);
    };
  };

  // Events based on time
  useEffect(() => {
    if (showIntro) return;

    // Cup 1 at 2s
    if (time > 2000 && time < 2200 && waterCollected === 0) addWater();
    // Cup 2 at 4s
    if (time > 4000 && time < 4200 && waterCollected === 1) addWater();
    // Cup 3 at 6s
    if (time > 6000 && time < 6200 && waterCollected === 2) addWater();
    
    // Dragon at 10s (Arrive at 8s + 2s wait)
    if (time > 10000 && !dragonVisible) setDragonVisible(true);

    // Fire at 11s
    if (time > 11000 && !fireVisible) setFireVisible(true);

    // Hit/Pause at 13s (giving time for fire animation)
    if (time > 13000 && !hasTriggeredPauseRef.current) {
      hasTriggeredPauseRef.current = true;
      if (loopRef.current) clearInterval(loopRef.current);
      setGameState(GameState.PAIN_ASSESSMENT);
    }
  }, [time, showIntro, waterCollected, addWater, dragonVisible, fireVisible, setGameState]);

  // Clean up interval on unmount
  useEffect(() => {
      return () => {
          if (loopRef.current) clearInterval(loopRef.current);
      };
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-sky-300">
      {/* Background Elements */}
      <div className="absolute bottom-0 w-full h-1/3 bg-green-500 z-10"></div>
      
      {/* Mountains */}
      <div className="absolute bottom-1/3 w-full flex items-end z-0 opacity-80">
         <div className="w-1/3 h-64 bg-stone-600 rounded-t-[100px] transform translate-y-10"></div>
         <div className="w-1/3 h-80 bg-stone-500 rounded-t-[150px]"></div>
         <div className="w-1/3 h-56 bg-stone-600 rounded-t-[80px] transform translate-y-5"></div>
      </div>

      {/* Intro Overlay */}
      {showIntro && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-8">
          <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-2xl text-center">
            <h2 className="text-3xl font-bold text-blue-900 animate-pulse">
              Você está levando algo muito importante para o seu reino.
            </h2>
          </div>
        </div>
      )}

      {/* Scene Container */}
      <div className="relative w-full h-full max-w-6xl mx-auto z-20">
        
        {/* Castle */}
        <div className="absolute right-4 bottom-[25%] w-48 h-48 transition-opacity duration-1000">
           <CastleIcon className="w-full h-full" />
        </div>

        {/* Character */}
        <div 
          className="absolute bottom-[25%] w-32 h-32 transition-transform duration-100 ease-linear"
          style={{ 
            left: `${position}%`,
            transform: `translate(-50%, 0) ${time < 8000 ? 'scale(1) translateY(-5px)' : 'scale(1)'}`
          }}
        >
          <div className={time < 8000 ? 'animate-walk' : ''}>
             <WarriorIcon type={character} className="w-full h-full drop-shadow-lg" />
          </div>
          
          {/* Hit Effect */}
          {fireVisible && (
              <div className="absolute inset-0 bg-red-500 mix-blend-overlay animate-pulse rounded-full opacity-50"></div>
          )}
        </div>

        {/* Water Cups on the path */}
        {waterCollected < 1 && (
            <div className="absolute left-[20%] bottom-[28%] w-12 h-12 animate-bounce">
                <WaterCupIcon className="w-full h-full" />
            </div>
        )}
        {waterCollected < 2 && (
            <div className="absolute left-[45%] bottom-[28%] w-12 h-12 animate-bounce" style={{ animationDelay: '0.2s' }}>
                <WaterCupIcon className="w-full h-full" />
            </div>
        )}
        {waterCollected < 3 && (
            <div className="absolute left-[70%] bottom-[28%] w-12 h-12 animate-bounce" style={{ animationDelay: '0.4s' }}>
                <WaterCupIcon className="w-full h-full" />
            </div>
        )}

        {/* Dragon - Moved closer to the tower (right-[2%]) and aligned to ground (bottom-[25%]) */}
        <div 
            className={`absolute right-[2%] bottom-[25%] w-64 h-64 transition-all duration-1000 transform ${dragonVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}
        >
            <DragonIcon className="w-full h-full drop-shadow-2xl" />
        </div>

        {/* Fire Breath - Adjusted to match Dragon's new position */}
        {fireVisible && (
            <div className="absolute right-[18%] bottom-[27%] w-64 h-32 origin-right">
                <FireEffect className="w-full h-full" />
            </div>
        )}

      </div>
      
      {/* HUD: Water collected */}
      <div className="absolute top-4 right-4 flex gap-2 bg-white/80 p-3 rounded-full backdrop-blur-sm shadow-lg z-30">
          {[...Array(3)].map((_, i) => (
              <div key={i} className={`w-8 h-8 ${i < waterCollected ? 'opacity-100' : 'opacity-30 grayscale'}`}>
                  <WaterCupIcon />
              </div>
          ))}
      </div>

    </div>
  );
};

export default GameLoop;