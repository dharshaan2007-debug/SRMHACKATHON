import React from 'react';
import { DataMode } from '../../types/analysis';
import { Database, Satellite } from 'lucide-react';

interface DataModeBadgeProps {
  mode: DataMode;
  onToggle?: (mode: DataMode) => void;
  interactive?: boolean;
}

export const DataModeBadge: React.FC<DataModeBadgeProps> = ({
  mode,
  onToggle,
  interactive = false,
}) => {
  const isDemo = mode === 'demo';

  const handleClick = () => {
    if (interactive && onToggle) {
      onToggle(isDemo ? 'earth-engine' : 'demo');
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-semibold tracking-wide transition-all ${
        interactive ? 'cursor-pointer select-none hover:shadow-sm' : ''
      } ${
        isDemo
          ? 'bg-amber-500/10 text-amber-400 border-amber-500/40 hover:bg-amber-500/20'
          : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/40 hover:bg-emerald-500/20'
      }`}
      title={
        isDemo
          ? 'Operating on synthetic illustrative data. Click to attempt Earth Engine connection.'
          : 'Operating with Earth Engine provider pipeline.'
      }
    >
      {isDemo ? (
        <Database className="w-3.5 h-3.5 text-amber-400" />
      ) : (
        <Satellite className="w-3.5 h-3.5 text-emerald-400" />
      )}
      <span className="uppercase font-mono">
        {isDemo ? 'DEMO MODE' : 'EARTH ENGINE MODE'}
      </span>
      <span className="hidden sm:inline text-[10px] opacity-75 font-normal border-l border-current pl-2">
        {isDemo ? 'Synthetic Baseline' : 'Live / GEE Provider'}
      </span>
    </div>
  );
};
