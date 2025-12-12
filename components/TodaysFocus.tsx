
import React from 'react';
import { HabitWithStats } from '../types';
import HabitList from './HabitList';

interface TodaysFocusProps {
  habits: HabitWithStats[];
  onToggleHabit: (habitId: string, date: string) => void;
  onDeleteHabit: (habitId: string) => void;
  today: string;
}

const TodaysFocus: React.FC<TodaysFocusProps> = ({ habits, onToggleHabit, onDeleteHabit, today }) => {
  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-lg animate-fade-in" style={{ animationDelay: '100ms' }}>
        <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[var(--color-gradient-from)] via-[var(--color-gradient-via)] to-[var(--color-gradient-to)] mb-4 tracking-tight">
            Today's Focus
        </h2>
        {habits.length > 0 ? (
            <HabitList 
                habits={habits} 
                onToggleHabit={onToggleHabit}
                onDeleteHabit={onDeleteHabit}
                today={today}
            />
        ) : (
             <div className="flex flex-col items-center justify-center py-12 px-4 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50/50 text-center">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-4 border border-slate-100">
                    <svg className="w-8 h-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                </div>
                <h3 className="text-lg font-semibold text-slate-800 mb-2">Your Routine Starts Here</h3>
                <p className="text-slate-500 max-w-xs mx-auto mb-6">
                    Consistency is key. Add essential daily habits above to begin tracking your progress.
                </p>
            </div>
        )}
    </div>
  );
};

export default TodaysFocus;
