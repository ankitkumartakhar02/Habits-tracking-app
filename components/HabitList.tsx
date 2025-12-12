
import React from 'react';
import { HabitWithStats } from '../types';
import HabitItem from './HabitItem';

interface HabitListProps {
  habits: HabitWithStats[];
  onToggleHabit: (habitId: string, date: string) => void;
  onDeleteHabit: (habitId: string) => void;
  today: string;
}

const HabitList: React.FC<HabitListProps> = ({ habits, onToggleHabit, onDeleteHabit, today }) => {
  return (
    <div className="space-y-3">
      {habits.map((habit, index) => (
        <HabitItem 
          key={habit.id} 
          habit={habit} 
          onToggle={() => onToggleHabit(habit.id, today)}
          onDelete={() => onDeleteHabit(habit.id)}
          index={index}
        />
      ))}
    </div>
  );
};

export default HabitList;
