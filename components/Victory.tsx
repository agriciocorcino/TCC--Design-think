import React, { useEffect } from 'react';

interface Props {
  onEnd: () => void;
}

const Victory: React.FC<Props> = ({ onEnd }) => {
  useEffect(() => {
    const timer = setTimeout(onEnd, 6000); // 5s animation + 1s buffer
    return () => clearTimeout(timer);
  }, [onEnd]);

  return (
    <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-indigo-900 to-blue-900 text-white overflow-hidden">
      
      {/* Background Particles (Simulated with simple divs) */}
      <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
             <div 
                key={i}
                className="absolute bg-yellow-300 rounded-full opacity-60 animate-ping"
                style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    width: `${Math.random() * 10 + 5}px`,
                    height: `${Math.random() * 10 + 5}px`,
                    animationDuration: `${Math.random() * 2 + 1}s`,
                    animationDelay: `${Math.random()}s`
                }}
             />
          ))}
      </div>

      <div className="relative flex flex-col items-center z-10 animate-fade-in-up">
        {/* Star */}
        <div className="w-64 h-64 text-yellow-400 drop-shadow-[0_0_30px_rgba(250,204,21,0.8)] animate-spin-slow mb-8">
           <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
             <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
           </svg>
        </div>

        <h1 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-600 text-center drop-shadow-sm">
          Você é muito corajoso!
        </h1>
      </div>
      
      <style>{`
        .animate-spin-slow {
            animation: spin 10s linear infinite;
        }
        @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
        .animate-fade-in-up {
            animation: fadeInUp 1s ease-out forwards;
        }
        @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default Victory;
