import React, { useState } from 'react';
import { WaterCupIcon, WarriorIcon, DragonIcon } from './Assets';
import { CharacterType } from '../types';

interface Props {
  character: CharacterType;
  onVictory: () => void;
}

const WaterCombat: React.FC<Props> = ({ character, onVictory }) => {
  const [selectedCount, setSelectedCount] = useState(0);
  const [isThrowing, setIsThrowing] = useState(false);

  const handleCupClick = () => {
    if (isThrowing) return;
    const newCount = selectedCount + 1;
    setSelectedCount(newCount);
    
    if (newCount === 3) {
      setTimeout(() => {
        setIsThrowing(true);
        setTimeout(onVictory, 2500); // 2.5s animation
      }, 500);
    }
  };

  return (
    <div className="absolute inset-0 z-[100] bg-sky-900/90 flex flex-col items-center justify-center">
      
      {!isThrowing ? (
        <div className="bg-white p-8 rounded-3xl shadow-2xl max-w-2xl w-full text-center">
          <h2 className="text-2xl font-bold text-blue-900 mb-6">
            Use a água que você coletou para apagar o fogo!
          </h2>
          <p className="mb-8 text-gray-600">Toque nos 3 copos para lançá-los!</p>
          
          <div className="flex justify-center gap-8 mb-4">
            {[1, 2, 3].map((id) => (
              <button
                key={id}
                onClick={handleCupClick}
                disabled={id <= selectedCount}
                className={`w-24 h-24 rounded-full p-4 transition-all duration-300 transform cursor-pointer
                  ${id <= selectedCount ? 'scale-0 opacity-0' : 'scale-100 hover:scale-110 bg-blue-100 border-4 border-blue-400 shadow-lg'}
                `}
              >
                <WaterCupIcon />
              </button>
            ))}
          </div>
          
          <div className="text-blue-500 font-bold">
            {selectedCount} / 3 Selecionados
          </div>
        </div>
      ) : (
        // Throwing Animation Scene
        <div className="relative w-full h-full max-w-4xl">
          {/* Character */}
          <div className="absolute left-[20%] bottom-[30%] w-40 h-40">
             <WarriorIcon type={character} className="w-full h-full" />
          </div>

          {/* Dragon */}
          <div className="absolute right-[20%] bottom-[30%] w-64 h-64 animate-pulse">
             <DragonIcon className="w-full h-full opacity-80" />
          </div>

          {/* Flying Water Stream */}
          <div className="absolute left-[30%] bottom-[40%] w-[50%] h-20 overflow-hidden">
             <div className="w-full h-full bg-blue-400 rounded-full animate-slide-right opacity-80 blur-sm"></div>
          </div>
          <style>{`
            @keyframes slideRight {
                0% { transform: translateX(-100%); }
                100% { transform: translateX(100%); }
            }
            .animate-slide-right {
                animation: slideRight 1s linear infinite;
            }
          `}</style>
        </div>
      )}
    </div>
  );
};

export default WaterCombat;