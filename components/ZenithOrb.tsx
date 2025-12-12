
import React from 'react';

interface ZenithOrbProps {
  completedToday: number;
  totalToday: number;
}

const ZenithOrb: React.FC<ZenithOrbProps> = ({ completedToday, totalToday }) => {
  const completionPercentage = totalToday > 0 ? (completedToday / totalToday) : 0;
  const pulseDuration = Math.max(1, 4 - completionPercentage * 3); // Faster pulse for more completions

  return (
    <div className="bg-slate-800/50 rounded-xl p-6 backdrop-blur-sm border border-slate-700 flex flex-col items-center justify-center animate-fade-in">
      <h3 className="text-lg font-semibold text-slate-300 mb-4">Focus Core</h3>
      <div className="w-32 h-32 relative flex items-center justify-center">
        {/* Glow effect */}
        <div 
          className="orb absolute w-full h-full rounded-full bg-cyan-500/20 blur-xl"
          style={{ animationDuration: `${pulseDuration}s` }}
        ></div>
        {/* Main Orb */}
        <div className="w-full h-full rounded-full bg-gradient-to-br from-slate-900 to-slate-800 p-1 overflow-hidden">
          <div className="w-full h-full rounded-full bg-slate-900 relative">
             {/* Inner rotating element */}
            <div className="orb-inner absolute inset-0 rounded-full">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-1/2 bg-gradient-to-b from-cyan-400 to-transparent"></div>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1/2 bg-gradient-to-t from-cyan-400 to-transparent"></div>
               <div className="absolute left-0 top-1/2 -translate-y-1/2 h-1 w-1/2 bg-gradient-to-r from-cyan-400 to-transparent"></div>
              <div className="absolute right-0 top-1/2 -translate-y-1/2 h-1 w-1/2 bg-gradient-to-l from-cyan-400 to-transparent"></div>
            </div>
          </div>
        </div>
      </div>
       <p className="text-sm text-slate-400 mt-4 text-center">Your discipline fuels the core.</p>
    </div>
  );
};

export default ZenithOrb;
