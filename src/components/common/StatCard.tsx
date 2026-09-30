import React from 'react';

export interface StatCardProps {
  title: string;
  value: string | number;
  unit?: string;
  icon: React.ReactNode;
  description: string;
  provenance: string;
  trend?: {
    value: string;
    label: string;
    isPositive?: boolean;
  };
  highlightColor?: 'green' | 'amber' | 'blue' | 'rose' | 'navy';
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  unit,
  icon,
  description,
  provenance,
  trend,
  highlightColor = 'navy',
}) => {
  const borderColors = {
    green: 'border-l-4 border-l-emerald-600',
    amber: 'border-l-4 border-l-amber-500',
    blue: 'border-l-4 border-l-blue-600',
    rose: 'border-l-4 border-l-rose-600',
    navy: 'border-l-4 border-l-[#0B1F33]',
  };

  return (
    <div
      className={`bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between transition-all hover:shadow-sm ${borderColors[highlightColor]}`}
    >
      <div className="flex items-start justify-between gap-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
          {title}
        </span>
        <div className="p-2 rounded-lg bg-slate-50 text-slate-700 border border-slate-100 flex-shrink-0">
          {icon}
        </div>
      </div>

      <div className="my-3">
        <div className="flex items-baseline gap-1.5">
          <span className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            {value}
          </span>
          {unit && (
            <span className="text-sm font-semibold text-slate-500">{unit}</span>
          )}
        </div>
        <p className="mt-1 text-xs text-slate-600 line-clamp-2 leading-relaxed">
          {description}
        </p>
      </div>

      <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
        <span className="truncate" title={provenance}>
          {provenance}
        </span>
        {trend && (
          <span
            className={`font-medium ${
              trend.isPositive ? 'text-emerald-600' : 'text-rose-600'
            }`}
          >
            {trend.value} {trend.label}
          </span>
        )}
      </div>
    </div>
  );
};
