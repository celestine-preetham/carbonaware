/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Activity } from './types';
import { Overview } from './components/Overview';
import { ActivityForm } from './components/ActivityForm';
import { ActivityList } from './components/ActivityList';
import { TipsWidget } from './components/TipsWidget';
import { Leaf } from 'lucide-react';

export default function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from local storage
  useEffect(() => {
    const saved = localStorage.getItem('carbon_activities');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Only load today's activities to keep the "daily tracker" simple
        const todayStr = new Date().toDateString();
        const todaysActs = parsed.filter((a: Activity) => new Date(a.date).toDateString() === todayStr);
        setActivities(todaysActs);
      } catch (e) {
        console.error('Failed to parse activities', e);
      }
    }
    setIsLoaded(true);
  }, []);

  // Save to local storage
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('carbon_activities', JSON.stringify(activities));
    }
  }, [activities, isLoaded]);

  const handleAddActivity = (act: Omit<Activity, 'id' | 'date'>) => {
    const newActivity: Activity = {
      ...act,
      id: crypto.randomUUID(),
      date: new Date().toISOString(),
    };
    setActivities([...activities, newActivity]);
  };

  const handleRemoveActivity = (id: string) => {
    setActivities(activities.filter(a => a.id !== id));
  };

  if (!isLoaded) return null;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-emerald-200">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-500 text-white flex items-center justify-center shadow-sm">
              <Leaf size={18} />
            </div>
            <h1 className="font-display font-bold text-xl tracking-tight text-slate-800">
              Carbon<span className="text-emerald-600">Aware</span>
            </h1>
          </div>
          <div className="text-sm font-medium text-slate-500 bg-slate-100 px-3 py-1.5 rounded-full">
            {new Date().toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          <div className="lg:col-span-4 space-y-6">
            <Overview activities={activities} />
            <TipsWidget />
          </div>

          <div className="lg:col-span-8 space-y-6">
            <ActivityForm onAdd={handleAddActivity} />
            <ActivityList activities={activities} onRemove={handleRemoveActivity} />
          </div>

        </div>
      </main>
    </div>
  );
}
