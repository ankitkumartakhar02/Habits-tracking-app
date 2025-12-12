
import React, { useState } from 'react';

interface AddHabitFormProps {
  onAddHabit: (name: string) => void;
  onCancel: () => void;
}

const SUGGESTED_HABITS = [
    "💧 Drink 2L Water",
    "🏃 30m Exercise", 
    "📚 Read 10 Pages", 
    "🧘 10m Meditation", 
    "😴 Sleep 8 Hours", 
    "📝 Daily Journal",
    "🥗 Eat Healthy",
    "📵 No Screen Time"
];

const AddHabitForm: React.FC<AddHabitFormProps> = ({ onAddHabit, onCancel }) => {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onAddHabit(name.trim());
      setName('');
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 border border-slate-200/80 shadow-lg animate-slide-down mb-6">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Create New Habit</h3>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 mb-6">
            <div className="flex-grow relative">
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g., Read for 15 minutes"
                    className="w-full bg-slate-50 text-slate-800 placeholder-slate-400 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:bg-white border border-slate-200 transition-all"
                    autoFocus
                />
            </div>
            <div className="flex gap-2">
                <button 
                type="submit" 
                className="flex-1 sm:flex-none px-6 py-3 bg-[var(--color-accent)] hover:bg-[var(--color-accent-dark)] text-white font-semibold rounded-lg transition-all shadow-md hover:shadow-lg active:scale-95 whitespace-nowrap"
                >
                Create Habit
                </button>
                <button 
                type="button" 
                onClick={onCancel}
                className="flex-1 sm:flex-none px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-600 font-semibold rounded-lg transition-colors"
                >
                Cancel
                </button>
            </div>
        </form>
        
        <div className="space-y-3">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                <span className="w-1 h-1 bg-slate-400 rounded-full"></span>
                Daily Essentials
            </p>
            <div className="flex flex-wrap gap-2">
                {SUGGESTED_HABITS.map(habit => (
                    <button
                        key={habit}
                        type="button"
                        onClick={() => setName(habit)}
                        className="group relative text-sm px-4 py-2 rounded-full bg-slate-50 hover:bg-white border border-slate-200 hover:border-[var(--color-accent)] text-slate-600 hover:text-[var(--color-accent)] transition-all duration-200 shadow-sm hover:shadow-md"
                    >
                        {habit}
                    </button>
                ))}
            </div>
        </div>
    </div>
  );
};

export default AddHabitForm;
