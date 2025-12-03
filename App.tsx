import React, { useState, useCallback } from 'react';
import { GameState, CharacterType } from './types';
import CharacterSelector from './components/CharacterSelector';
import GameLoop from './components/GameLoop';
import PainScale from './components/PainScale';
import WaterCombat from './components/WaterCombat';
import Victory from './components/Victory';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(GameState.SELECTION);
  const [character, setCharacter] = useState<CharacterType>(CharacterType.BOY); // Default
  const [waterCollected, setWaterCollected] = useState(0);
  const [painLevel, setPainLevel] = useState<number | null>(null);

  const resetGame = useCallback(() => {
    setGameState(GameState.SELECTION);
    setWaterCollected(0);
    setPainLevel(null);
  }, []);

  const handleCharacterSelect = useCallback((char: CharacterType) => {
    setCharacter(char);
    setGameState(GameState.WALKING);
  }, []);

  const handleAddWater = useCallback(() => {
    setWaterCollected(prev => Math.min(prev + 1, 3));
  }, []);

  const handlePainSelect = useCallback((level: number) => {
    setPainLevel(level);
    setGameState(GameState.WATER_SELECTION);
  }, []);

  const handleVictory = useCallback(() => {
    setGameState(GameState.VICTORY);
  }, []);

  return (
    <div className="relative w-full h-screen font-sans">
      
      {gameState === GameState.SELECTION && (
        <CharacterSelector onSelect={handleCharacterSelect} />
      )}

      {/* Game Loop runs during walking and pain assessment (background) */}
      {(gameState === GameState.WALKING || 
        gameState === GameState.PAIN_ASSESSMENT || 
        gameState === GameState.WATER_SELECTION) && (
        <GameLoop 
          character={character} 
          setGameState={setGameState} 
          addWater={handleAddWater}
          waterCollected={waterCollected}
        />
      )}

      {gameState === GameState.PAIN_ASSESSMENT && (
        <PainScale onSelectPain={handlePainSelect} />
      )}

      {gameState === GameState.WATER_SELECTION && (
        <WaterCombat character={character} onVictory={handleVictory} />
      )}

      {gameState === GameState.VICTORY && (
        <Victory onEnd={resetGame} />
      )}
    </div>
  );
};

export default App;