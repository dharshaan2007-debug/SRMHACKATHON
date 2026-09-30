import React from 'react';

export const LoadingSkeleton: React.FC<{ rows?: number; height?: string }> = ({
  rows = 4,
  height = 'h-16',
}) => {
  return (
    <div className="space-y-3 animate-pulse">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className={`bg-slate-200/70 rounded-xl ${height} w-full`} />
      ))}
    </div>
  );
};

export const CardSkeleton: React.FC = () => {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs animate-pulse space-y-4">
      <div className="flex justify-between items-center">
        <div className="h-4 bg-slate-200 rounded w-1/3" />
        <div className="w-8 h-8 bg-slate-200 rounded-lg" />
      </div>
      <div className="h-8 bg-slate-200 rounded w-1/2" />
      <div className="h-3 bg-slate-200 rounded w-3/4" />
      <div className="h-3 bg-slate-100 rounded w-1/4 pt-2" />
    </div>
  );
};
