import React from 'react';
import { CharacterType } from '../types';

export const WarriorIcon: React.FC<{ type: CharacterType; className?: string }> = ({ type, className }) => {
  const isBoy = type === CharacterType.BOY;

  const imgSrc = isBoy
    ? "https://img.freepik.com/vetores-premium/belas-ilustracoes-vetoriais-de-bebes_1253044-22329.jpg?semt=ais_hybrid&w=740&q=80"
    : "https://img.freepik.com/vetores-premium/criancas-bonitas-ilustracao-vetorial-de-personagens_1253202-280474.jpg?semt=ais_hybrid&w=740&q=80";

  return (
    <img 
      src={imgSrc}
      alt={isBoy ? "Guerreiro" : "Guerreira"}
      className={`${className} object-cover rounded-full border-2 border-white shadow-sm bg-white`}
    />
  );
};

export const DragonIcon: React.FC<{ className?: string }> = ({ className }) => (
  <img 
    src="https://png.pngtree.com/png-vector/20251006/ourmid/pngtree-cute-baby-dragon-breathing-fire-cartoon-character-png-image_17661384.webp"
    alt="Dragão fofo cuspindo fogo"
    className={`${className} object-contain`}
  />
);

export const WaterCupIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M25,20 L30,90 L70,90 L75,20 Z" fill="#bfdbfe" stroke="#3b82f6" strokeWidth="3" />
    <path d="M25,20 L75,20" fill="none" stroke="#3b82f6" strokeWidth="3" />
    <path d="M30,30 Q50,35 70,30" fill="none" stroke="#fff" strokeWidth="2" opacity="0.6" />
    <circle cx="40" cy="50" r="3" fill="#fff" opacity="0.6" />
    <circle cx="60" cy="70" r="2" fill="#fff" opacity="0.6" />
  </svg>
);

export const CastleIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect x="20" y="40" width="60" height="60" fill="#9ca3af" stroke="#4b5563" strokeWidth="2" />
    <rect x="20" y="30" width="10" height="10" fill="#9ca3af" stroke="#4b5563" strokeWidth="2" />
    <rect x="45" y="30" width="10" height="10" fill="#9ca3af" stroke="#4b5563" strokeWidth="2" />
    <rect x="70" y="30" width="10" height="10" fill="#9ca3af" stroke="#4b5563" strokeWidth="2" />
    <path d="M40,100 L40,70 Q50,60 60,70 L60,100 Z" fill="#4b5563" />
  </svg>
);

export const FireEffect: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M10,50 Q30,10 50,50 T90,50" fill="none" stroke="#f97316" strokeWidth="8" strokeLinecap="round" className="animate-pulse" />
    <path d="M10,50 Q30,20 50,60 T90,40" fill="none" stroke="#ef4444" strokeWidth="4" className="animate-pulse" style={{ animationDelay: '0.1s' }} />
  </svg>
);