import React from 'react';
import { Card } from './Card';
import { Lightbulb } from 'lucide-react';

const TIPS = [
  "Swapping one meat-based meal for a plant-based one can save 2-3 kg CO₂e.",
  "Consider walking or cycling for short trips under 3km.",
  "Unplug devices when not in use to reduce standby power consumption.",
  "Washing clothes in cold water saves significant energy."
];

export const TipsWidget: React.FC = () => {
  const [tipIndex, setTipIndex] = React.useState(0);

  return (
    <Card className="bg-gradient-to-br from-emerald-500 to-teal-600 border-none text-white p-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 p-4 opacity-10">
        <Lightbulb size={120} />
      </div>
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-3">
          <Lightbulb size={20} className="text-emerald-100" />
          <h3 className="text-sm font-semibold text-emerald-50 uppercase tracking-wider">Daily Tip</h3>
        </div>
        <p className="font-medium text-lg leading-snug mb-4">
          "{TIPS[tipIndex]}"
        </p>
        <button 
          onClick={() => setTipIndex((prev) => (prev + 1) % TIPS.length)}
          className="text-xs font-semibold text-teal-800 bg-emerald-100 py-1.5 px-3 rounded-full hover:bg-white transition-colors"
        >
          Next Tip
        </button>
      </div>
    </Card>
  );
};
