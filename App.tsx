
import React, { useState, useEffect, useMemo } from 'react';
import { Habit } from './types';
import { calculateCurrentStreak, getCompletionsInLastNDays } from './utils/habitUtils';
import Header from './components/Header';
import HabitList from './components/HabitList';
import AddHabitForm from './components/AddHabitForm';
import StatsDashboard from './components/StatsDashboard';
import MotivationalQuote from './components/MotivationalQuote';
import { PlusCircleIcon } from './components/Icons';
import ZenithOrb from './components/ZenithOrb';

const App: React.FC = () => {
  const [habits, setHabits] = useState<Habit[]>(() => {
    const savedHabits = localStorage.getItem('zenith-habits');
    return savedHabits ? JSON.parse(savedHabits) : [];
  });
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    localStorage.setItem('zenith-habits', JSON.stringify(habits));
  }, [habits]);

  const addHabit = (name: string) => {
    const newHabit: Habit = {
      id: crypto.randomUUID(),
      name,
      createdAt: new Date().toISOString(),
      completions: [],
    };
    setHabits([...habits, newHabit]);
    setIsAdding(false);
  };

  const toggleHabitCompletion = (habitId: string, date: string) => {
    setHabits(habits.map(habit => {
      if (habit.id === habitId) {
        const completed = habit.completions.includes(date);
        const newCompletions = completed
          ? habit.completions.filter(d => d !== date)
          : [...habit.completions, date];
        return { ...habit, completions: newCompletions.sort().reverse() };
      }
      return habit;
    }));
  };
  
  const deleteHabit = (habitId: string) => {
    setHabits(habits.filter(habit => habit.id !== habitId));
  }

  const today = new Date().toISOString().split('T')[0];

  const habitsWithStats = useMemo(() => {
    return habits.map(habit => ({
      ...habit,
      isCompletedToday: habit.completions.includes(today),
      streak: calculateCurrentStreak(habit.completions),
    })).sort((a,b) => a.createdAt.localeCompare(b.createdAt));
  }, [habits, today]);

  const weeklyChartData = useMemo(() => {
    return getCompletionsInLastNDays(habits, 7);
  }, [habits]);

  const completedTodayCount = useMemo(() => {
    return habits.filter(h => h.completions.includes(today)).length;
  }, [habits, today]);


  return (
    <div className="min-h-screen bg-slate-900 text-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <Header />
        <main className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-8">
             <div className="bg-slate-800/50 rounded-xl p-6 backdrop-blur-sm border border-slate-700">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold text-cyan-400">Today's Habits</h2>
                    <button 
                        onClick={() => setIsAdding(!isAdding)}
                        className="flex items-center gap-2 px-4 py-2 bg-cyan-500 hover:bg-cyan-600 rounded-lg text-white font-semibold transition-all duration-300"
                    >
                        <PlusCircleIcon />
                        {isAdding ? 'Cancel' : 'Add Habit'}
                    </button>
                </div>

                {isAdding && <AddHabitForm onAddHabit={addHabit} onCancel={() => setIsAdding(false)}/>}

                {habits.length > 0 ? (
                    <HabitList 
                        habits={habitsWithStats} 
                        onToggleHabit={toggleHabitCompletion}
                        onDeleteHabit={deleteHabit}
                        today={today}
                    />
                ) : (
                    <div className="text-center py-10 px-4 border-2 border-dashed border-slate-700 rounded-lg">
                        <p className="text-slate-400">No habits yet. Let's add one!</p>
                        <p className="text-sm text-slate-500 mt-2">Click "Add Habit" to start your journey.</p>
                    </div>
                )}
            </div>
          </div>
          <div className="md:col-span-1 space-y-8">
            <ZenithOrb completedToday={completedTodayCount} totalToday={habits.length} />
            <MotivationalQuote />
            <StatsDashboard weeklyChartData={weeklyChartData} totalHabits={habits.length} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
