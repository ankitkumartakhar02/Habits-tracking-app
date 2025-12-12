
import React from 'react';
import { SparklesIcon } from './Icons';

const Header: React.FC = () => {
  return (
    <header className="text-center animate-fade-in">
      <div className="flex items-center justify-center gap-4">
        <SparklesIcon className="w-10 h-10 text-cyan-400" />
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
          Zenith Habits
        </h1>
      </div>
      <p className="mt-4 text-lg text-slate-400">
        Forge discipline. Build your ideal self, one day at a time.
      </p>
    </header>
  );
};

export default Header;
