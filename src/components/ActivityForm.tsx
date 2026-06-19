import React, { useState } from 'react';
import { EMISSION_FACTORS } from '../data';
import { Activity, Category } from '../types';
import { Card } from './Card';
import { Plus } from 'lucide-react';

interface ActivityFormProps {
  onAdd: (activity: Omit<Activity, 'id' | 'date'>) => void;
}

export const ActivityForm: React.FC<ActivityFormProps> = ({ onAdd }) => {
  const [selectedCategory, setSelectedCategory] = useState<Category>('Transport');
  const [selectedFactorId, setSelectedFactorId] = useState<string>(EMISSION_FACTORS['Transport'][0].id);
  const [quantity, setQuantity] = useState<string>('1');

  const selectedFactorGroup = EMISSION_FACTORS[selectedCategory];
  const selectedFactor = selectedFactorGroup.find(f => f.id === selectedFactorId) || selectedFactorGroup[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const qty = parseFloat(quantity);
    if (isNaN(qty) || qty <= 0) return;

    onAdd({
      title: selectedFactor.title,
      category: selectedCategory,
      co2e: qty * selectedFactor.factor,
    });
    setQuantity('1');
  };

  return (
    <Card className="p-6">
      <div className="mb-6">
        <h2 className="text-xl font-display font-semibold text-slate-800">Log Activity</h2>
        <p className="text-sm font-sans text-slate-500">Record a new emission source</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">Category</label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {(Object.keys(EMISSION_FACTORS) as Category[]).map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => {
                  setSelectedCategory(cat);
                  setSelectedFactorId(EMISSION_FACTORS[cat][0].id);
                }}
                className={`py-2 px-3 text-sm font-medium rounded-xl border transition-colors ${
                  selectedCategory === cat
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">Activity Type</label>
          <select
            value={selectedFactorId}
            onChange={(e) => setSelectedFactorId(e.target.value)}
            className="w-full rounded-xl border border-slate-200 py-2.5 px-3 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          >
            {selectedFactorGroup.map((factor) => (
              <option key={factor.id} value={factor.id}>
                {factor.title} ({factor.factor} kg / {factor.unit})
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">
            Quantity ({selectedFactor.unit})
          </label>
          <input
            type="number"
            min="0"
            step="0.1"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
            className="w-full rounded-xl border border-slate-200 py-2.5 px-3 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            placeholder={`Enter ${selectedFactor.unit}`}
          />
        </div>

        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium rounded-xl transition-colors"
        >
          <Plus size={18} />
          Add to Footprint
        </button>
      </form>
    </Card>
  );
};
