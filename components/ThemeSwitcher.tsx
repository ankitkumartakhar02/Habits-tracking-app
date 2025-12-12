
import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { themes } from '../themes';

interface ThemeSwitcherProps {
  isOpen: boolean;
  onClose: () => void;
}

const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ isOpen, onClose }) => {
  const { theme, setTheme } = useTheme();

  return (
    <>
      <div 
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      ></div>
      <div 
        className={`fixed top-0 right-0 h-full w-72 bg-white/80 backdrop-blur-xl border-l border-slate-200 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="p-6">
          <h3 className="text-xl font-bold text-slate-800 mb-6">Select a Theme</h3>
          <div className="space-y-3">
            {themes.map(t => (
              <button
                key={t.name}
                onClick={() => setTheme(t.name)}
                className={`w-full flex items-center justify-between p-3 rounded-lg border transition-all duration-200 ${
                  theme.name === t.name ? 'border-[var(--color-accent)] bg-[var(--color-accent)]/10' : 'border-slate-200 hover:bg-slate-100'
                }`}
              >
                <span className="font-semibold text-slate-700">{t.name}</span>
                <div className="flex -space-x-2">
                    <div className="w-6 h-6 rounded-full" style={{ background: t.colors.gradientFrom }}></div>
                    <div className="w-6 h-6 rounded-full" style={{ background: t.colors.gradientVia }}></div>
                    <div className="w-6 h-6 rounded-full" style={{ background: t.colors.gradientTo }}></div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ThemeSwitcher;
