
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Habit, User } from '../types';
import Header from '../components/Header';
import Welcome from '../components/Welcome';
import TodaysFocus from '../components/TodaysFocus';
import Reports from '../components/Reports';
import AddHabitForm from '../components/AddHabitForm';
import { calculateCurrentStreak, calculateLongestStreak } from '../utils/habitUtils';
import ThemeSwitcher from '../components/ThemeSwitcher';
import MotivationalQuote from '../components/MotivationalQuote';
import Toast from '../components/Toast';

interface DashboardScreenProps {
  user: User;
  onLogout: () => void;
}

const DashboardScreen: React.FC<DashboardScreenProps> = ({ user, onLogout }) => {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [isThemeSwitcherOpen, setIsThemeSwitcherOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const toastTimerRef = useRef<number | null>(null);

  useEffect(() => {
    const savedHabits = localStorage.getItem(`dhabits-tracker-${user.id}`);
    setHabits(savedHabits ? JSON.parse(savedHabits) : []);

    return () => {
      if (toastTimerRef.current) {
        clearTimeout(toastTimerRef.current);
      }
    };
  }, [user]);

  useEffect(() => {
    localStorage.setItem(`dhabits-tracker-${user.id}`, JSON.stringify(habits));
  }, [habits]);

  const showToast = (message: string) => {
    if (toastTimerRef.current) {
      clearTimeout(toastTimerRef.current);
    }
    setToastMessage(message);
    toastTimerRef.current = window.setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const addHabit = (name: string) => {
    const newHabit: Habit = {
      id: crypto.randomUUID(),
      name,
      createdAt: new Date().toISOString(),
      completions: [],
    };
    setHabits(prevHabits => [...prevHabits, newHabit]);
    setIsAdding(false);
  };

  const toggleHabitCompletion = (habitId: string, date: string) => {
    const habitToToggle = habits.find(h => h.id === habitId);
    if (!habitToToggle) return;

    const isCompleted = habitToToggle.completions.includes(date);

    setHabits(habits.map(habit => {
      if (habit.id === habitId) {
        const newCompletions = isCompleted
          ? habit.completions.filter(d => d !== date)
          : [...habit.completions, date];
        return { ...habit, completions: newCompletions.sort((a,b) => b.localeCompare(a)) };
      }
      return habit;
    }));
    
    if (!isCompleted) {
      showToast(`'${habitToToggle.name}' completed! Keep it up!`);
    }
  };

  const deleteHabit = (habitId: string) => {
    setHabits(habits.filter(habit => habit.id !== habitId));
  };

  const today = useMemo(() => new Date().toISOString().split('T')[0], []);

  const habitsWithStats = useMemo(() => {
    return habits.map(habit => {
      const currentStreak = calculateCurrentStreak(habit.completions);
      const longestStreak = calculateLongestStreak(habit.completions);
      return {
        ...habit,
        isCompletedToday: habit.completions.includes(today),
        streak: currentStreak,
        isLongestStreak: currentStreak > 0 && currentStreak === longestStreak,
      };
    }).sort((a,b) => a.createdAt.localeCompare(b.createdAt));
  }, [habits, today]);

  return (
    <div className="min-h-screen">
      <Header user={user} onLogout={onLogout} onThemeClick={() => setIsThemeSwitcherOpen(true)} />
      <main className="px-4 sm:px-6 lg:px-8 pb-12">
        <div className="max-w-4xl mx-auto space-y-8 pt-28 sm:pt-32">
          <Welcome userName={user.name} onAddHabitClick={() => setIsAdding(!isAdding)} isAdding={isAdding} />
          {isAdding && <AddHabitForm onAddHabit={addHabit} onCancel={() => setIsAdding(false)} />}
          
          <TodaysFocus
            habits={habitsWithStats}
            onToggleHabit={toggleHabitCompletion}
            onDeleteHabit={deleteHabit}
            today={today}
          />
          
          <MotivationalQuote />

          <Reports habits={habits} />
        </div>
      </main>
      <ThemeSwitcher isOpen={isThemeSwitcherOpen} onClose={() => setIsThemeSwitcherOpen(false)} />
      <Toast message={toastMessage || ''} show={!!toastMessage} />
    </div>
  );
};

export default DashboardScreen;
