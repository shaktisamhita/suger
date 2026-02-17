
import React from 'react';
import { CaneAnalysis, TranslationStrings } from '../types';

interface Props {
  data: CaneAnalysis;
  t: TranslationStrings;
}

export const StatsGrid: React.FC<Props> = ({ data, t }) => {
  const cards = [
    { label: t.quality, value: `${data.qualityScore}%`, icon: '🌟', color: 'text-green-600' },
    { label: t.moisture, value: `${data.moisture}%`, icon: '💧', color: 'text-blue-600' },
    { label: t.brix, value: `${data.brix}°`, icon: '🍯', color: 'text-orange-600' },
    { label: t.price, value: `₹${data.pricePrediction}/kg`, icon: '💰', color: 'text-amber-600' },
    { label: t.biofuel, value: `${data.biofuelPotential}%`, icon: '⚡', color: 'text-purple-600' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4">
      {cards.map((card, idx) => (
        <div key={idx} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="text-2xl mb-2">{card.icon}</div>
          <div className="text-xs text-gray-500 uppercase font-semibold">{card.label}</div>
          <div className={`text-xl font-bold ${card.color}`}>{card.value}</div>
        </div>
      ))}
    </div>
  );
};
