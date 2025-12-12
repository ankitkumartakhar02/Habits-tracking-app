
export interface Habit {
  id: string;
  name: string;
  createdAt: string;
  completions: string[]; // Dates stored as 'YYYY-MM-DD'
}

export interface HabitWithStats extends Habit {
  isCompletedToday: boolean;
  streak: number;
}

export interface WeeklyChartData {
  name: string; // e.g., 'Mon', 'Tue'
  date: string; // 'YYYY-MM-DD'
  completions: number;
}

export interface User {
  id: string;
  name: string;
  avatarUrl: string;
}

export interface Theme {
  name: string;
  colors: {
    primary: string;
    gradientFrom: string;
    gradientVia: string;
    gradientTo: string;
    accent: string;
    accentDark: string;
    completedFrom: string;
    completedTo: string;
    completedRing: string;
  };
}
