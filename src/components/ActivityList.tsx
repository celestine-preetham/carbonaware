import React from 'react';
import { Activity } from '../types';
import { Card } from './Card';
import { Car, Utensils, Zap, ShoppingBag, Trash2 } from 'lucide-react';
import { format } from 'date-fns';

interface ActivityListProps {
  activities: Activity[];
  onRemove: (id: string) => void;
}

const CategoryIcon = ({ category }: { category: Activity['category'] }) => {
  switch (category) {
    case 'Transport': return <Car size={18} className="text-sky-500" />;
    case 'Food': return <Utensils size={18} className="text-amber-500" />;
    case 'Energy': return <Zap size={18} className="text-violet-500" />;
    case 'Shopping': return <ShoppingBag size={18} className="text-red-500" />;
  }
};

export const ActivityList: React.FC<ActivityListProps> = ({ activities, onRemove }) => {
  if (activities.length === 0) {
    return (
      <Card className="p-8 text-center bg-slate-50 border-dashed">
        <p className="text-slate-500 text-sm">No activities logged yet.</p>
        <p className="text-slate-400 text-xs mt-1">Add your first activity to start tracking.</p>
      </Card>
    );
  }

  return (
    <Card className="p-0 overflow-hidden">
      <div className="p-6 border-b border-slate-100 bg-white">
        <h2 className="text-lg font-display font-semibold text-slate-800">Recent Activities</h2>
      </div>
      <div className="divide-y divide-slate-100 max-h-[400px] overflow-y-auto">
        {activities.slice().reverse().map((activity) => (
          <div key={activity.id} className="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors">
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-100">
                <CategoryIcon category={activity.category} />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-800">{activity.title}</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-xs text-slate-500">{activity.category}</span>
                  <span className="w-1 h-1 rounded-full bg-slate-300" />
                  <span className="text-xs text-slate-500">
                    {format(new Date(activity.date), 'h:mm a')}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-semibold text-slate-800">
                  +{activity.co2e.toFixed(1)} <span className="text-xs font-normal text-slate-500">kg CO₂</span>
                </p>
              </div>
              <button
                onClick={() => onRemove(activity.id)}
                className="p-1.5 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-md transition-colors"
                title="Remove Entry"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
