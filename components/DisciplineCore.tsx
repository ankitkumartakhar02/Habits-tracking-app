
import React from 'react';

interface DisciplineCoreProps {
  completedToday: number;
  totalToday: number;
}

const ProgressRing: React.FC<{ progress: number }> = ({ progress }) => {
    const radius = 50;
    const stroke = 8;
    const normalizedRadius = radius - stroke * 2;
    const circumference = normalizedRadius * 2 * Math.PI;
    const strokeDashoffset = circumference - progress * circumference;

    return (
        <svg
            height={radius * 2}
            width={radius * 2}
            className="-rotate-90"
        >
            <circle
                stroke="rgba(255,255,255,0.1)"
                fill="transparent"
                strokeWidth={stroke}
                r={normalizedRadius}
                cx={radius}
                cy={radius}
            />
            <defs>
              <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="var(--color-gradient-from)" />
                <stop offset="50%" stopColor="var(--color-gradient-via)" />
                <stop offset="100%" stopColor="var(--color-gradient-to)" />
              </linearGradient>
            </defs>
            <circle
                stroke="url(#progressGradient)"
                fill="transparent"
                strokeWidth={stroke}
                strokeDasharray={`${circumference} ${circumference}`}
                style={{ strokeDashoffset, transition: 'stroke-dashoffset 0.5s ease-out' }}
                strokeLinecap="round"
                r={normalizedRadius}
                cx={radius}
                cy={radius}
            />
        </svg>
    );
};


const DisciplineCore: React.FC<DisciplineCoreProps> = ({ completedToday, totalToday }) => {
  const completionPercentage = totalToday > 0 ? (completedToday / totalToday) : 0;
  
  return (
    <div className="bg-black/20 backdrop-blur-xl rounded-2xl p-6 border border-white/10 shadow-lg flex flex-col items-center justify-center animate-fade-in">
      <h3 className="text-lg font-semibold text-slate-300 mb-4">Discipline Core</h3>
      <div className="w-32 h-32 relative flex items-center justify-center">
        <ProgressRing progress={completionPercentage} />
        <div className="absolute flex flex-col items-center justify-center">
            <span className="text-2xl font-bold text-white">{completedToday}</span>
            <span className="text-sm text-slate-400">/ {totalToday}</span>
        </div>
      </div>
       <p className="text-sm text-slate-400 mt-4 text-center">Your progress fuels the core.</p>
    </div>
  );
};

export default DisciplineCore;
