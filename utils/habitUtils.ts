import { Habit, WeeklyChartData, HeatmapData } from '../types';

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
    today.setHours(0,0,0,0);
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    const lastCompletionDate = new Date(sortedDates[0]);
    lastCompletionDate.setHours(0,0,0,0);

    if (lastCompletionDate.getTime() !== today.getTime() && lastCompletionDate.getTime() !== yesterday.getTime()) {
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
            } else if (diff > 1) {
                break;
            }
        }
        currentDate = d;
    }

    return streak;
};

export const calculateLongestStreak = (completions: string[]): number => {
    if (completions.length < 2) {
        return completions.length;
    }

    const sortedDates = completions.map(d => new Date(d)).sort((a, b) => a.getTime() - b.getTime());

    let longestStreak = 1;
    let currentStreak = 1;

    for (let i = 1; i < sortedDates.length; i++) {
        const diff = getDayDifference(sortedDates[i-1], sortedDates[i]);
        if (diff === 1) {
            currentStreak++;
        } else if (diff > 1) {
            currentStreak = 1;
        }
        if (currentStreak > longestStreak) {
            // FIX: Corrected typo from "current Streak" to "currentStreak"
            longestStreak = currentStreak;
        }
    }

    return longestStreak;
}

export const calculateCompletionRate = (habits: Habit[]): number => {
    if (habits.length === 0) return 0;
    
    let totalPossibleDays = 0;
    let totalCompletions = 0;
    
    const today = new Date();

    habits.forEach(habit => {
        const createdAt = new Date(habit.createdAt);
        const daysSinceCreation = getDayDifference(createdAt, today) + 1;
        totalPossibleDays += daysSinceCreation;
        totalCompletions += habit.completions.length;
    });

    if (totalPossibleDays === 0) return 0;
    return Math.round((totalCompletions / totalPossibleDays) * 100);
}

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

export const getHeatmapData = (habits: Habit[]): HeatmapData[] => {
    const completionCounts: { [date: string]: number } = {};
    
    habits.forEach(habit => {
        habit.completions.forEach(dateStr => {
            completionCounts[dateStr] = (completionCounts[dateStr] || 0) + 1;
        });
    });

    return Object.entries(completionCounts).map(([date, count]) => ({
        date,
        count
    }));
};

export const getMonthlyData = (habits: Habit[], year: number, month: number) => {
    const startDate = new Date(year, month, 1);
    const endDate = new Date(year, month + 1, 0);
    const numDays = endDate.getDate();

    const monthlyCompletions: string[] = [];
    const completionMap = new Map<string, number>();

    habits.forEach(habit => {
        habit.completions.forEach(dateStr => {
            const date = new Date(dateStr);
            if (date.getFullYear() === year && date.getMonth() === month) {
                monthlyCompletions.push(dateStr);
                completionMap.set(dateStr, (completionMap.get(dateStr) || 0) + 1);
            }
        });
    });
    
    let totalPossibleCompletions = 0;
    habits.forEach(habit => {
        const createdAt = new Date(habit.createdAt);
        const start = createdAt > startDate ? createdAt : startDate;
        // +1 to include the end date
        const daysInMonthForHabit = getDayDifference(start, endDate) + 1;
        if (daysInMonthForHabit > 0) {
            totalPossibleCompletions += daysInMonthForHabit;
        }
    });

    const completionRate = totalPossibleCompletions > 0 
        ? Math.round((monthlyCompletions.length / totalPossibleCompletions) * 100) 
        : 0;

    return {
        totalCompletions: monthlyCompletions.length,
        completionRate,
        bestStreak: calculateLongestStreak(monthlyCompletions),
        completionMap,
        month,
        year,
        numDays,
        firstDayOffset: startDate.getDay()
    };
};

export const calculateWeeklyCompletionRate = (habits: Habit[]): number => {
    const today = new Date();
    let totalPossibleCompletions = 0;
    let totalActualCompletions = 0;

    for (let i = 0; i < 7; i++) {
        const day = new Date(today);
        day.setDate(today.getDate() - i);
        day.setHours(0, 0, 0, 0);
        const dayString = day.toISOString().split('T')[0];

        habits.forEach(habit => {
            const createdAt = new Date(habit.createdAt);
            createdAt.setHours(0, 0, 0, 0);

            // If the habit was created on or before this day, it was possible to complete it.
            if (createdAt.getTime() <= day.getTime()) {
                totalPossibleCompletions++;
            }

            // If the habit was completed on this day.
            if (habit.completions.includes(dayString)) {
                totalActualCompletions++;
            }
        });
    }

    if (totalPossibleCompletions === 0) {
        return 0;
    }

    return Math.round((totalActualCompletions / totalPossibleCompletions) * 100);
};
