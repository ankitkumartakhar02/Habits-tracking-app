
import React, { useState, useEffect, useMemo } from 'react';
import { Habit, User } from './types';
import { calculateCurrentStreak, getCompletionsInLastNDays } from './utils/habitUtils';
import Header from './components/Header';
import HabitList from './components/HabitList';
import AddHabitForm from './components/AddHabitForm';
import StatsDashboard from './components/StatsDashboard';
import MotivationalQuote from './components/MotivationalQuote';
import { PlusCircleIcon } from './components/Icons';
import DisciplineCore from './components/DisciplineCore';
import LoginScreen from './components/LoginScreen';
import { authService } from './services/authService';
import ThemeSwitcher from './components/ThemeSwitcher';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(authService.getCurrentUser());
  const [habits, setHabits] = useState<Habit[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [isThemeSwitcherOpen, setIsThemeSwitcherOpen] = useState(false);

  useEffect(() => {
    if (user) {
      const savedHabits = localStorage.getItem(`dhabits-tracker-${user.id}`);
      setHabits(savedHabits ? JSON.parse(savedHabits) : []);
    } else {
      setHabits([]);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      localStorage.setItem(`dhabits-tracker-${user.id}`, JSON.stringify(habits));
    }
  }, [habits, user]);
  
  const handleLogin = () => {
    const loggedInUser = authService.loginWithGoogle();
    setUser(loggedInUser);
  };

  const handleLogout = () => {
    authService.logout();
    setUser(null);
  };

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

  if (!user) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  return (
    <>
    {/* Animated Aurora Background */}
    <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2">
            <div className="absolute h-full w-full bg-[radial-gradient(closest-side,var(--color-gradient-via),transparent)]" style={{animation: 'move-aurora 15s ease-in-out infinite'}}></div>
            <div className="absolute h-full w-full bg-[radial-gradient(closest-side,var(--color-gradient-from),transparent)]" style={{animation: 'move-aurora 20s ease-in-out infinite reverse', animationDelay: '5s'}}></div>
            <div className="absolute h-full w-full bg-[radial-gradient(closest-side,var(--color-gradient-to),transparent)]" style={{animation: 'move-aurora 25s ease-in-out infinite', animationDelay: '10s'}}></div>
        </div>
    </div>
    <div className="min-h-screen p-4 sm:p-6 lg:p-8 overflow-y-auto">
      <div className="max-w-4xl mx-auto">
        <Header user={user} onLogout={handleLogout} onThemeClick={() => setIsThemeSwitcherOpen(true)} />
        <main className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-8">
             <div className="bg-black/20 backdrop-blur-xl rounded-2xl p-6 border border-white/10 shadow-lg">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[var(--color-gradient-from)] via-[var(--color-gradient-via)] to-[var(--color-gradient-to)]">Today's Habits</h2>
                    <button 
                        onClick={() => setIsAdding(!isAdding)}
                        className="flex items-center gap-2 px-4 py-2 bg-[var(--color-accent)] hover:bg-[var(--color-accent-dark)] rounded-lg text-white font-semibold transition-colors duration-300"
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
                    <div className="text-center py-10 px-4 border-2 border-dashed border-white/20 rounded-lg">
                        <p className="text-slate-400">No habits yet. Let's add one!</p>
                        <p className="text-sm text-slate-500 mt-2">Click "Add Habit" to start your journey.</p>
                    </div>
                )}
            </div>
          </div>
          <div className="md-col-span-1 space-y-8">
            <DisciplineCore completedToday={completedTodayCount} totalToday={habits.length} />
            <MotivationalQuote />
            <StatsDashboard weeklyChartData={weeklyChartData} totalHabits={habits.length} />
          </div>
        </main>
      </div>
      <ThemeSwitcher isOpen={isThemeSwitcherOpen} onClose={() => setIsThemeSwitcherOpen(false)} />
    </div>
    </>
  );
};

export default App;
