import React, { useState, useEffect, useRef } from 'react';
import { HabitWithStats } from '../types';
import { FireIcon, TrashIcon, CrownIcon } from './Icons';

interface HabitItemProps {
  habit: HabitWithStats;
  onToggle: () => void;
  onDelete: () => void;
  index: number;
}

const HabitItem: React.FC<HabitItemProps> = ({ habit, onToggle, onDelete, index }) => {
  const isCompleted = habit.isCompletedToday;
  
  const [isJustCompleted, setIsJustCompleted] = useState(false);
  const prevIsCompletedRef = useRef<boolean | undefined>(undefined);

  useEffect(() => {
    // Check if the habit was just marked as complete (transitioned from false to true)
    if (prevIsCompletedRef.current === false && isCompleted) {
      setIsJustCompleted(true);
      // Reset the animation state after the animation finishes
      const timer = setTimeout(() => setIsJustCompleted(false), 600); // Must match animation duration in CSS
      return () => clearTimeout(timer);
    }
    // Update the ref with the current completion status for the next render
    prevIsCompletedRef.current = isCompleted;
  }, [isCompleted]);

  const completedClasses = 'bg-gradient-to-r from-[var(--color-completed-from)] to-[var(--color-completed-to)] ring-1 ring-[var(--color-completed-ring)]';
  const incompleteClasses = 'bg-slate-100/50 hover:bg-slate-200/50';

  return (
    <div 
        className={`
            flex items-center justify-between p-4 rounded-lg transition-all duration-300 animate-fade-in group
            hover:-translate-y-1
            ${isCompleted ? completedClasses : incompleteClasses}
        `}
        style={{ animationDelay: `${index * 50}ms`, opacity: 0, animationFillMode: 'forwards' }}
    >
      <div className="flex items-center gap-4">
        <button
          onClick={onToggle}
          aria-label={`Mark ${habit.name} as ${isCompleted ? 'incomplete' : 'complete'}`}
          className={`
            w-8 h-8 rounded-full border-2 flex items-center justify-center cursor-pointer transition-all duration-300 transform group-hover:scale-110
            ${isCompleted 
              ? 'bg-[var(--color-accent)] border-[var(--color-accent-dark)]' 
              : 'bg-transparent border-slate-300 group-hover:border-[rgb(var(--color-primary))]'
            }
            ${isJustCompleted ? 'animate-pulse-ring' : ''}
          `}
        >
          {isCompleted && (
            <svg className="w-5 h-5 text-white animate-pop-in" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          )}
        </button>
        <span className={`font-medium transition-colors ${isCompleted ? 'text-slate-400 line-through' : 'text-slate-700'}`}>
          {habit.name}
        </span>
      </div>
      <div className="flex items-center gap-4">
        <div 
            title={`${habit.streak} day streak`} 
            className={`flex items-center gap-1.5 font-bold ${habit.streak > 0 ? 'text-orange-500' : 'text-slate-400'} ${isJustCompleted ? 'animate-jump' : ''}`}
        >
          {habit.isLongestStreak && <CrownIcon className="w-5 h-5 text-yellow-500" />}
          <FireIcon className={`w-5 h-5 ${habit.isLongestStreak ? 'text-yellow-500' : ''}`} />
          <span className={habit.isLongestStreak ? 'text-yellow-600' : ''}>{habit.streak}</span>
        </div>
         <button onClick={onDelete} aria-label={`Delete habit: ${habit.name}`} className="text-slate-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100">
            <TrashIcon />
        </button>
      </div>
    </div>
  );
};

export default HabitItem;