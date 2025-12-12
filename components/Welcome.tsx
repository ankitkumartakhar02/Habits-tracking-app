
import React from 'react';
import { PlusCircleIcon } from './Icons';

interface WelcomeProps {
    userName: string;
    onAddHabitClick: () => void;
    isAdding: boolean;
}

const Welcome: React.FC<WelcomeProps> = ({ userName, onAddHabitClick, isAdding }) => {
    return (
        <div className="flex justify-between items-center animate-fade-in">
            <div>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                    Welcome back, {userName.split(' ')[0]}
                </h1>
                <p className="text-slate-500 mt-1">Ready to build some discipline today?</p>
            </div>
            <button 
                onClick={onAddHabitClick}
                className="flex-shrink-0 flex items-center gap-2 px-4 py-2 bg-[var(--color-accent)] hover:bg-[var(--color-accent-dark)] rounded-lg text-white font-semibold transition-colors duration-300 shadow-lg shadow-[var(--color-accent)]/20"
            >
                <PlusCircleIcon />
                <span className="hidden sm:inline">{isAdding ? 'Cancel' : 'Add Habit'}</span>
            </button>
        </div>
    );
};

export default Welcome;
