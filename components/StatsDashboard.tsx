
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { WeeklyChartData } from '../types';
import { useCountUp } from '../hooks/useCountUp';

interface StatsDashboardProps {
  weeklyChartData: WeeklyChartData[];
  totalHabits: number;
}

const AnimatedNumber: React.FC<{ value: number }> = ({ value }) => {
    const count = useCountUp(value);
    return <p className="text-3xl font-bold text-cyan-400">{count}</p>;
}

const StatsDashboard: React.FC<StatsDashboardProps> = ({ weeklyChartData, totalHabits }) => {

  const totalCompletions = weeklyChartData.reduce((sum, day) => sum + day.completions, 0);

  return (
    <div className="bg-slate-800/50 rounded-xl p-6 backdrop-blur-sm border border-slate-700 space-y-6 animate-fade-in" style={{animationDelay: '400ms'}}>
      <h2 className="text-2xl font-bold text-cyan-400">Your Progress</h2>
      
      <div className="grid grid-cols-2 gap-4 text-center">
        <div className="bg-slate-700/50 p-4 rounded-lg">
          <AnimatedNumber value={totalHabits} />
          <p className="text-sm text-slate-400">Active Habits</p>
        </div>
        <div className="bg-slate-700/50 p-4 rounded-lg">
          <AnimatedNumber value={totalCompletions} />
          <p className="text-sm text-slate-400">Week's Tasks</p>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-4 text-slate-300">Completions (Last 7 Days)</h3>
        {totalHabits > 0 ? (
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={weeklyChartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
              <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} />
              <YAxis allowDecimals={false} stroke="#94a3b8" fontSize={12}/>
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1e293b',
                  borderColor: '#334155',
                  color: '#e2e8f0',
                  borderRadius: '0.5rem'
                }}
                cursor={{ fill: 'rgba(71, 85, 105, 0.5)' }}
              />
              <Bar dataKey="completions" fill="#22d3ee" radius={[4, 4, 0, 0]} animationDuration={800}/>
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="text-center py-10 text-slate-500">
            <p>Start tracking habits to see your stats here.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StatsDashboard;
