
import { Theme } from './types';

export const themes: Theme[] = [
  {
    name: 'Cyberpunk Cyan',
    colors: {
      primary: '22d3ee', // Tailwind cyan-400 as RGB
      gradientFrom: '#a78bfa',
      gradientVia: '#38bdf8',
      gradientTo: '#4ade80',
      accent: '#22d3ee',
      accentDark: '#06b6d4',
      completedFrom: 'rgba(5, 150, 105, 0.1)',
      completedTo: 'rgba(6, 182, 212, 0.1)',
      completedRing: 'rgba(34, 211, 238, 0.5)',
    },
  },
  {
    name: 'Sunset Orange',
    colors: {
      primary: 'fb923c', // Tailwind orange-400
      gradientFrom: '#f97316',
      gradientVia: '#fde047',
      gradientTo: '#f43f5e',
      accent: '#f97316',
      accentDark: '#ea580c',
      completedFrom: 'rgba(234, 88, 12, 0.1)',
      completedTo: 'rgba(244, 63, 94, 0.1)',
      completedRing: 'rgba(251, 146, 60, 0.5)',
    },
  },
  {
    name: 'Aurora Green',
    colors: {
      primary: '4ade80', // Tailwind green-400
      gradientFrom: '#22c55e',
      gradientVia: '#14b8a6',
      gradientTo: '#3b82f6',
      accent: '#22c55e',
      accentDark: '#16a34a',
      completedFrom: 'rgba(22, 163, 74, 0.1)',
      completedTo: 'rgba(20, 184, 166, 0.1)',
      completedRing: 'rgba(74, 222, 128, 0.5)',
    },
  },
  {
    name: 'Cosmic Purple',
    colors: {
      primary: 'c084fc', // Tailwind purple-400
      gradientFrom: '#d946ef',
      gradientVia: '#a855f7',
      gradientTo: '#6366f1',
      accent: '#c084fc',
      accentDark: '#a855f7',
      completedFrom: 'rgba(168, 85, 247, 0.1)',
      completedTo: 'rgba(99, 102, 241, 0.1)',
      completedRing: 'rgba(192, 132, 252, 0.5)',
    },
  },
];
