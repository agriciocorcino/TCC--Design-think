import React from 'react';

interface Props {
  onSelectPain: (level: number) => void;
}

const PainScale: React.FC<Props> = ({ onSelectPain }) => {
  const levels = [
    { level: 1, label: 'Pouca dor', color: 'bg-green-400' },
    { level: 2, label: 'Dor leve', color: 'bg-yellow-300' },
    { level: 3, label: 'Dor moderada', color: 'bg-yellow-500' },
    { level: 4, label: 'Dor forte', color: 'bg-orange-500' },
    { level: 5, label: 'Muita dor', color: 'bg-red-600' },
  ];

  return (
    <div className="absolute inset-0 z-[100] flex items-center justify-center bg-black/80 p-4">
      <div className="bg-white w-full max-w-4xl p-8 rounded-3xl shadow-2xl animate-fade-in pointer-events-auto">
        <h2 className="text-3xl font-bold text-red-600 mb-2 text-center">
          Você foi atingido pelo fogo do dragão!
        </h2>
        <p className="text-xl text-gray-700 mb-8 text-center">
          Sabemos que assim como o personagem você também está com dor.
          <br />
          <span className="font-bold">Qual é o grau de dor que está sentindo?</span>
        </p>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {levels.map((item) => (
            <button
              key={item.level}
              type="button"
              onClick={() => onSelectPain(item.level)}
              className={`${item.color} p-6 rounded-2xl flex flex-col items-center justify-center gap-3 hover:scale-105 transition-transform shadow-lg border-4 border-white active:scale-95 cursor-pointer relative z-10`}
            >
              <div className="text-4xl font-black text-white shadow-sm pointer-events-none">{item.level}</div>
              <span className="font-bold text-white text-lg text-center leading-tight pointer-events-none">
                {item.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PainScale;