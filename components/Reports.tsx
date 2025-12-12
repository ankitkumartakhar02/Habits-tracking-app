import React, { useMemo, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { Habit, HeatmapData } from '../types';
import { useCountUp } from '../hooks/useCountUp';
import { calculateLongestStreak, calculateCompletionRate, getHeatmapData, getCompletionsInLastNDays, getMonthlyData, calculateWeeklyCompletionRate } from '../utils/habitUtils';

type ReportView = 'weekly' | 'monthly' | 'all-time';

interface ReportsProps {
  habits: Habit[];
}

const StatCard: React.FC<{ label: string; value: number | string; unit?: string }> = ({ label, value, unit }) => {
    const isNumeric = typeof value === 'number';
    const count = isNumeric ? useCountUp(value) : 0;

    return (
        <div className="bg-slate-100/50 p-4 rounded-lg border border-slate-200/80 text-center">
            <p className="text-3xl font-bold text-[rgb(var(--color-primary))]">
                {isNumeric ? count : value}{unit}
            </p>
            <p className="text-sm text-slate-500">{label}</p>
        </div>
    );
};

const YearlyHeatmap: React.FC<{ data: HeatmapData[] }> = ({ data }) => {
    // ... (existing yearly heatmap implementation)
    const year = new Date().getFullYear();
    const startDate = new Date(year, 0, 1);
    const dayCount = Math.floor((new Date(year, 11, 31).getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;

    const days = Array.from({ length: dayCount }, (_, i) => new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + i));
    
    const maxCount = Math.max(...data.map(d => d.count), 1);
    const dataMap = useMemo(() => new Map(data.map(d => [d.date, d.count])), [data]);
    const firstDayOfWeek = startDate.getDay();

    return (
        <div className="grid grid-cols-7 gap-1.5">
            {Array.from({ length: firstDayOfWeek }).map((_, i) => <div key={`empty-${i}`} />)}
            {days.map(day => {
                const dateString = day.toISOString().split('T')[0];
                const count = dataMap.get(dateString) || 0;
                const opacity = count === 0 ? 0.1 : 0.2 + (count / maxCount) * 0.8;
                return (
                    <div 
                        key={dateString} 
                        className="w-full aspect-square rounded-full transition-transform hover:scale-125"
                        style={{ backgroundColor: `rgb(var(--color-primary))`, opacity }}
                        title={`${dateString}: ${count} completions`}
                    />
                );
            })}
        </div>
    )
}

const MonthlyCalendar: React.FC<{data: ReturnType<typeof getMonthlyData>}> = ({ data }) => {
    const { completionMap, month, year, numDays, firstDayOffset } = data;
    const days = Array.from({ length: numDays }, (_, i) => i + 1);
    // FIX: Using spread syntax `[...]` to convert the iterator to an array.
    // This can help with type inference in some TypeScript environments.
    const maxCount = Math.max(...[...completionMap.values()], 1);

    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    return (
        <div>
            <div className="grid grid-cols-7 gap-2 text-center text-xs text-slate-500 mb-2">
                {dayNames.map(d => <div key={d}>{d}</div>)}
            </div>
            <div className="grid grid-cols-7 gap-1.5">
                {Array.from({ length: firstDayOffset }).map((_, i) => <div key={`empty-${i}`} />)}
                {days.map(day => {
                    const dateString = new Date(year, month, day).toISOString().split('T')[0];
                    const count = completionMap.get(dateString) || 0;
                    const opacity = count === 0 ? 0.1 : 0.2 + (count / maxCount) * 0.8;
                    return (
                        <div key={day} className="relative aspect-square">
                            <div
                                className="absolute inset-0.5 rounded-lg transition-colors"
                                style={{ backgroundColor: `rgb(var(--color-primary))`, opacity }}
                                title={`${dateString}: ${count} completions`}
                            />
                            <div className="relative text-xs text-slate-600 font-medium">{day}</div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

const Reports: React.FC<ReportsProps> = ({ habits }) => {
    const [view, setView] = useState<ReportView>('weekly');
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

    const allTimeData = useMemo(() => ({
        longestStreak: calculateLongestStreak(habits.flatMap(h => h.completions)),
        completionRate: calculateCompletionRate(habits),
        totalCompletions: habits.reduce((sum, h) => sum + h.completions.length, 0),
        heatmapData: getHeatmapData(habits),
    }), [habits]);
    
    const weeklyData = useMemo(() => {
        const data = getCompletionsInLastNDays(habits, 7);
        const totalCompletions = data.reduce((sum, day) => sum + day.completions, 0);
        const mostProductiveDay = data.length > 0 ? data.reduce((max, day) => day.completions > max.completions ? day : max) : {name: 'N/A'};
        const completionRate = calculateWeeklyCompletionRate(habits);
        return { data, totalCompletions, mostProductiveDay: mostProductiveDay.name, completionRate };
    }, [habits]);

    const monthlyData = useMemo(() => getMonthlyData(habits, currentYear, currentMonth), [habits, currentYear, currentMonth]);

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-lg animate-fade-in" style={{ animationDelay: '300ms' }}>
      <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-6">
        <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[var(--color-gradient-from)] via-[var(--color-gradient-via)] to-[var(--color-gradient-to)] tracking-tight">
            Reports & Analysis
        </h2>
        <div className="flex-shrink-0 mt-4 sm:mt-0 bg-slate-100 p-1 rounded-lg flex gap-1">
            {(['weekly', 'monthly', 'all-time'] as ReportView[]).map(v => (
                <button key={v} onClick={() => setView(v)} className={`px-3 py-1 text-sm font-semibold rounded-md transition-colors ${view === v ? 'bg-white text-[rgb(var(--color-primary))] shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>
                    {v.charAt(0).toUpperCase() + v.slice(1)}
                </button>
            ))}
        </div>
      </div>
      
      <div>
        {view === 'weekly' && (
             <div className="space-y-8 animate-fade-in">
                 <div>
                     <h3 className="text-lg font-semibold text-slate-600 mb-4 tracking-tight">Weekly Stats</h3>
                     <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        <StatCard label="Total Completions" value={weeklyData.totalCompletions} />
                        <StatCard label="Completion Rate" value={weeklyData.completionRate} unit="%" />
                        <StatCard label="Busiest Day" value={weeklyData.mostProductiveDay} />
                     </div>
                 </div>
                 <div>
                    <h3 className="text-lg font-semibold text-slate-600 mb-4 tracking-tight">Last 7 Days</h3>
                    <ResponsiveContainer width="100%" height={200}>
                        <BarChart data={weeklyData.data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis dataKey="name" stroke="#64748b" fontSize={12} />
                        <YAxis allowDecimals={false} stroke="#64748b" fontSize={12}/>
                        <Tooltip contentStyle={{ backgroundColor: 'white', borderColor: '#e2e8f0', borderRadius: '0.5rem' }} cursor={{ fill: '#f1f5f9' }}/>
                        <Bar dataKey="completions" fill="var(--color-accent)" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                 </div>
            </div>
        )}
        {view === 'monthly' && (
            <div className="space-y-8 animate-fade-in">
                <div>
                     <h3 className="text-lg font-semibold text-slate-600 mb-4 tracking-tight">Monthly Stats</h3>
                     <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        <StatCard label="Total Completions" value={monthlyData.totalCompletions} />
                        <StatCard label="Completion Rate" value={monthlyData.completionRate} unit="%" />
                        <StatCard label="Best Streak" value={monthlyData.bestStreak} unit=" days" />
                     </div>
                </div>
                <div>
                    <h3 className="text-lg font-semibold text-slate-600 mb-4 tracking-tight">
                        {new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long', year: 'numeric' })}
                    </h3>
                    <MonthlyCalendar data={monthlyData}/>
                </div>
            </div>
        )}
        {view === 'all-time' && (
            <div className="space-y-8 animate-fade-in">
                <div>
                    <h3 className="text-lg font-semibold text-slate-600 mb-4 tracking-tight">Lifetime Stats</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        <StatCard label="Best Streak" value={allTimeData.longestStreak} unit=" days" />
                        <StatCard label="Completion Rate" value={allTimeData.completionRate} unit="%" />
                        <StatCard label="Total Completions" value={allTimeData.totalCompletions} />
                    </div>
                </div>
                <div>
                    <h3 className="text-lg font-semibold text-slate-600 mb-4 tracking-tight">Consistency ({new Date().getFullYear()})</h3>
                    <YearlyHeatmap data={allTimeData.heatmapData} />
                </div>
            </div>
        )}
      </div>
    </div>
  );
};

export default Reports;