
import { Habit, WeeklyChartData } from '../types';

const getDayDifference = (d1: Date, d2: Date): number => {
    const MS_PER_DAY = 1000 * 60 * 60 * 24;
    const utc1 = Date.UTC(d1.getFullYear(), d1.getMonth(), d1.getDate());
    const utc2 = Date.UTC(d2.getFullYear(), d2.getMonth(), d2.getDate());
    return Math.floor((utc2 - utc1) / MS_PER_DAY);
};

export const calculateCurrentStreak = (completions: string[]): number => {
    if (completions.length === 0) {
        return 0;
    }

    const sortedDates = completions.map(d => new Date(d)).sort((a, b) => b.getTime() - a.getTime());
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    
    const todayStr = today.toISOString().split('T')[0];
    const yesterdayStr = yesterday.toISOString().split('T')[0];
    const lastCompletionStr = sortedDates[0].toISOString().split('T')[0];

    if (lastCompletionStr !== todayStr && lastCompletionStr !== yesterdayStr) {
        return 0;
    }

    let streak = 0;
    let currentDate = sortedDates[0];

    for (let i = 0; i < sortedDates.length; i++) {
        const d = sortedDates[i];
        if (i === 0) {
            streak = 1;
        } else {
            const diff = getDayDifference(d, currentDate);
            if (diff === 1) {
                streak++;
            } else {
                break;
            }
        }
        currentDate = d;
    }

    return streak;
};

export const getCompletionsInLastNDays = (habits: Habit[], days: number): WeeklyChartData[] => {
    const data: WeeklyChartData[] = [];
    const today = new Date();
    
    for (let i = days - 1; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(today.getDate() - i);
        const dateString = date.toISOString().split('T')[0];
        
        const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });

        const completionsOnDay = habits.reduce((count, habit) => {
            if (habit.completions.includes(dateString)) {
                return count + 1;
            }
            return count;
        }, 0);

        data.push({
            name: dayName,
            date: dateString,
            completions: completionsOnDay
        });
    }
    return data;
};
