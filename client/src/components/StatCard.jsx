import React from 'react';

const StatCard = ({ title, value, icon: Icon }) => {
  return (
    <div className="bg-white p-5 rounded-lg border border-zinc-200 shadow-xs flex items-center justify-between">
      <div>
        <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider">{title}</p>
        <p className="text-2xl font-bold text-zinc-900 mt-1">{value}</p>
      </div>
      {Icon && (
        <div className="p-2.5 rounded-lg bg-zinc-100 text-zinc-800 border border-zinc-200">
          <Icon className="w-5 h-5" />
        </div>
      )}
    </div>
  );
};

export default StatCard;
