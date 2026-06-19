import React, { useMemo } from 'react';
import { Activity } from '../types';
import { DAILY_BUDGET_KG } from '../data';
import { Card } from './Card';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Earth, ArrowDownRight, ArrowUpRight } from 'lucide-react';

interface OverviewProps {
  activities: Activity[];
}

const COLORS = {
  Transport: '#0ea5e9', // sky-500
  Food: '#f59e0b', // amber-500
  Energy: '#8b5cf6', // violet-500
  Shopping: '#ef4444', // red-500
};

export const Overview: React.FC<OverviewProps> = ({ activities }) => {
  const totalCo2 = useMemo(() => {
    return activities.reduce((sum, act) => sum + act.co2e, 0);
  }, [activities]);

  const percentage = Math.min((totalCo2 / DAILY_BUDGET_KG) * 100, 100);
  const isOverBudget = totalCo2 > DAILY_BUDGET_KG;

  const chartData = useMemo(() => {
    const grouped = activities.reduce((acc, act) => {
      acc[act.category] = (acc[act.category] || 0) + act.co2e;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(grouped)
      .map(([name, value]) => ({ name, value: value as number }))
      .filter(d => d.value > 0);
  }, [activities]);

  return (
    <Card className="flex flex-col p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-display font-semibold text-slate-800">Today's Footprint</h2>
          <p className="text-sm font-sans text-slate-500">Your daily carbon emissions</p>
        </div>
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-emerald-100 text-emerald-600">
          <Earth size={24} />
        </div>
      </div>

      <div className="flex flex-col items-center justify-center">
        <div className="relative flex items-center justify-center w-48 h-48">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke="currentColor"
              strokeWidth="8"
              fill="transparent"
              className="text-slate-100"
            />
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke="currentColor"
              strokeWidth="8"
              fill="transparent"
              strokeDasharray="251.2"
              strokeDashoffset={251.2 - (251.2 * percentage) / 100}
              className={isOverBudget ? "text-rose-500 transition-all duration-1000 ease-out" : "text-emerald-500 transition-all duration-1000 ease-out"}
            />
          </svg>
          <div className="absolute flex flex-col items-center justify-center text-center">
            <span className="text-4xl font-display font-bold text-slate-800">
              {totalCo2.toFixed(1)}
            </span>
            <span className="text-xs font-sans font-medium text-slate-500 mt-1 uppercase tracking-wider">
              KG CO₂e
            </span>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-2">
          {isOverBudget ? (
            <span className="flex items-center px-2.5 py-1 rounded-full bg-rose-100 text-rose-700 text-xs font-medium">
              <ArrowUpRight size={14} className="mr-1" />
              Over specific budget ({DAILY_BUDGET_KG}kg)
            </span>
          ) : (
            <span className="flex items-center px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-medium">
              <ArrowDownRight size={14} className="mr-1" />
              Below budget ({DAILY_BUDGET_KG}kg)
            </span>
          )}
        </div>
      </div>

      {chartData.length > 0 && (
        <div className="pt-6 border-t border-slate-100">
          <h3 className="text-sm font-semibold text-slate-700 mb-4">Emissions by Category</h3>
          <div className="h-44">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  innerRadius={40}
                  outerRadius={70}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[entry.name as keyof typeof COLORS]} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value: number) => [`${value.toFixed(1)} kg`, 'CO₂e']}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4 mt-2">
            {chartData.map((entry) => (
              <div key={entry.name} className="flex items-center gap-1.5 text-xs text-slate-600">
                <span 
                  className="w-2.5 h-2.5 rounded-full" 
                  style={{ backgroundColor: COLORS[entry.name as keyof typeof COLORS] }}
                />
                {entry.name}
              </div>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
};
