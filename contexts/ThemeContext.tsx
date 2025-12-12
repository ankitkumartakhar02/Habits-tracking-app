
import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { themes } from '../themes';
import { Theme } from '../types';

interface ThemeContextType {
  theme: Theme;
  setTheme: (themeName: string) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [themeName, setThemeName] = useState(() => {
    return localStorage.getItem('dhabits-theme') || 'Fresh Mint';
  });

  useEffect(() => {
    const selectedTheme = themes.find(t => t.name === themeName) || themes[0];
    const root = document.documentElement;
    
    Object.entries(selectedTheme.colors).forEach(([key, value]) => {
      // Convert hex to RGB values for CSS variables that need it
      if (key === 'primary') {
        const rgb = value.match(/\w\w/g)?.map(x => parseInt(x, 16)).join(' ');
        root.style.setProperty(`--color-${key}`, rgb || value);
      } else {
         const cssVarName = `--color-${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`;
         root.style.setProperty(cssVarName, value);
      }
    });

    localStorage.setItem('dhabits-theme', themeName);
  }, [themeName]);

  const setTheme = (name: string) => {
    setThemeName(name);
  };

  const theme = useMemo(() => themes.find(t => t.name === themeName) || themes[0], [themeName]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
