
import React, { useState } from 'react';
import { TargetIcon, PaletteIcon, LogoutIcon } from './Icons';
import { User } from '../types';

interface HeaderProps {
    user: User;
    onLogout: () => void;
    onThemeClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, onLogout, onThemeClick }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="flex justify-between items-center animate-fade-in">
      <div className="flex items-center gap-4">
        <TargetIcon className="w-10 h-10 text-[rgb(var(--color-primary))]" />
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[var(--color-gradient-from)] via-[var(--color-gradient-via)] to-[var(--color-gradient-to)]">
          DHabits Tracker
        </h1>
      </div>
      <div className="flex items-center gap-2 sm:gap-4">
          <button onClick={onThemeClick} className="p-2 rounded-full hover:bg-white/10 transition-colors">
              <PaletteIcon className="w-6 h-6 text-slate-300"/>
          </button>
          <div className="relative">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="flex items-center gap-2">
                  <img src={user.avatarUrl} alt={user.name} className="w-10 h-10 rounded-full border-2 border-white/20"/>
              </button>
              {isMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-black/50 backdrop-blur-xl rounded-lg shadow-lg border border-white/10 animate-fade-in z-10">
                      <div className="p-2 border-b border-white/10">
                          <p className="font-semibold text-white text-sm">{user.name}</p>
                      </div>
                      <button 
                        onClick={() => {
                            onLogout();
                            setIsMenuOpen(false);
                        }}
                        className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-400 hover:bg-white/10"
                      >
                         <LogoutIcon />
                         <span>Sign Out</span>
                      </button>
                  </div>
              )}
          </div>
      </div>
    </header>
  );
};

export default Header;
