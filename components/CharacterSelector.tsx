import React from 'react';
import { CharacterType } from '../types';
import { WarriorIcon } from './Assets';

interface Props {
  onSelect: (char: CharacterType) => void;
}

const CharacterSelector: React.FC<Props> = ({ onSelect }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-50 p-4">
      <h1 className="text-3xl md:text-5xl font-bold text-blue-900 mb-8 text-center">
        Escolha seu Herói
      </h1>
      <div className="flex flex-col md:flex-row gap-8">
        <button
          onClick={() => onSelect(CharacterType.BOY)}
          className="flex flex-col items-center p-6 bg-white rounded-3xl shadow-xl hover:scale-105 transition-transform border-4 border-transparent hover:border-blue-400"
        >
          <div className="w-48 h-48 mb-4">
            <WarriorIcon type={CharacterType.BOY} className="w-full h-full" />
          </div>
          <span className="text-2xl font-bold text-blue-800">Guerreiro</span>
        </button>

        <button
          onClick={() => onSelect(CharacterType.GIRL)}
          className="flex flex-col items-center p-6 bg-white rounded-3xl shadow-xl hover:scale-105 transition-transform border-4 border-transparent hover:border-pink-400"
        >
          <div className="w-48 h-48 mb-4">
            <WarriorIcon type={CharacterType.GIRL} className="w-full h-full" />
          </div>
          <span className="text-2xl font-bold text-pink-700">Guerreira</span>
        </button>
      </div>
    </div>
  );
};

export default CharacterSelector;
