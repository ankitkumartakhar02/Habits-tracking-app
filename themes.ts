
import { Theme } from './types';

export const themes: Theme[] = [
  {
    name: 'Fresh Mint',
    colors: {
      primary: '16a34a', // green-600
      gradientFrom: '#34d399', // emerald-400
      gradientVia: '#22c55e', // green-500
      gradientTo: '#10b981', // emerald-500
      accent: '#16a34a', // green-600
      accentDark: '#15803d', // green-700
      completedFrom: 'rgba(52, 211, 153, 0.2)',
      completedTo: 'rgba(16, 185, 129, 0.2)',
      completedRing: 'rgba(22, 163, 74, 0.5)',
    },
  },
  {
    name: 'Sunny Citrus',
    colors: {
      primary: 'f59e0b', // amber-500
      gradientFrom: '#fde047', // yellow-300
      gradientVia: '#fbbf24', // amber-400
      gradientTo: '#f97316', // orange-500
      accent: '#f59e0b',
      accentDark: '#d97706',
      completedFrom: 'rgba(251, 191, 36, 0.2)',
      completedTo: 'rgba(249, 115, 22, 0.2)',
      completedRing: 'rgba(245, 158, 11, 0.5)',
    },
  },
  {
    name: 'Royal Indigo',
    colors: {
      primary: '6366f1', // indigo-500
      gradientFrom: '#a78bfa', // violet-400
      gradientVia: '#818cf8', // indigo-400
      gradientTo: '#60a5fa', // blue-400
      accent: '#6366f1',
      accentDark: '#4f46e5',
      completedFrom: 'rgba(129, 140, 248, 0.2)',
      completedTo: 'rgba(96, 165, 250, 0.2)',
      completedRing: 'rgba(99, 102, 241, 0.5)',
    },
  },
   {
    name: 'Crimson Night',
    colors: {
      primary: 'f43f5e', // rose-500
      gradientFrom: '#f9a8d4',
      gradientVia: '#be185d',
      gradientTo: '#7e22ce',
      accent: '#f43f5e',
      accentDark: '#be185d',
      completedFrom: 'rgba(244, 63, 94, 0.15)',
      completedTo: 'rgba(190, 24, 93, 0.15)',
      completedRing: 'rgba(251, 113, 133, 0.5)',
    },
  },
  {
    name: 'Cyberpunk Cyan',
    colors: {
      primary: '06b6d4', // cyan-600
      gradientFrom: '#f472b6', // pink-400
      gradientVia: '#38bdf8', // cyan-400
      gradientTo: '#a78bfa', // violet-400
      accent: '#0891b2',
      accentDark: '#0e7490',
      completedFrom: 'rgba(56, 189, 248, 0.2)',
      completedTo: 'rgba(167, 139, 250, 0.2)',
      completedRing: 'rgba(6, 182, 212, 0.5)',
    },
  },
];
