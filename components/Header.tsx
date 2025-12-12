
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
    <header className="fixed top-0 left-0 right-0 z-30 bg-white/80 backdrop-blur-lg border-b border-slate-200/80">
        <div className="max-w-4xl mx-auto flex justify-between items-center px-4 sm:px-6 lg:px-8 py-3">
            <div className="flex items-center gap-4">
                <TargetIcon className="w-8 h-8 text-[rgb(var(--color-primary))]" />
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[var(--color-gradient-from)] via-[var(--color-gradient-via)] to-[var(--color-gradient-to)]">
                DHabits Tracker
                </h1>
            </div>
            <div className="flex items-center gap-2 sm:gap-4">
                <button onClick={onThemeClick} className="p-2 rounded-full hover:bg-slate-200/60 transition-colors">
                    <PaletteIcon className="w-6 h-6 text-slate-500"/>
                </button>
                <div className="relative">
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="flex items-center gap-2">
                        <img src={user.avatarUrl} alt={user.name} className="w-10 h-10 rounded-full border-2 border-slate-200"/>
                    </button>
                    {isMenuOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white backdrop-blur-xl rounded-lg shadow-lg border border-slate-200/80 animate-fade-in z-10">
                            <div className="p-2 border-b border-slate-200">
                                <p className="font-semibold text-slate-700 text-sm">{user.name}</p>
                            </div>
                            <button 
                                onClick={() => {
                                    onLogout();
                                    setIsMenuOpen(false);
                                }}
                                className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-500 hover:bg-slate-100 rounded-b-lg"
                            >
                                <LogoutIcon />
                                <span>Sign Out</span>
                            </button>
                        </div>
                    )}
                </div>
            </div>
      </div>
    </header>
  );
};

export default Header;
