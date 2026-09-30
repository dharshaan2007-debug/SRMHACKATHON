import React from 'react';
import { useDashboardData } from '../../hooks/useDashboardData';
import { studyArea } from '../../config/studyArea';
import { DataModeBadge } from '../common/DataModeBadge';
import { Activity, Calendar, CloudSun, MapPin, Sparkles, Layers } from 'lucide-react';

export const Header: React.FC<{ onMobileMenuToggle?: () => void }> = ({
  onMobileMenuToggle,
}) => {
  const { dataMode, setDataMode, statusMessage, loading } = useDashboardData();

  return (
    <header className="bg-[#0B1F33] text-white border-b border-slate-800 sticky top-0 z-40 select-none shadow-md">
      <div className="px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Left: Brand & Mobile Trigger */}
        <div className="flex items-center gap-3 sm:gap-4">
          <button
            type="button"
            onClick={onMobileMenuToggle}
            className="lg:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            aria-label="Toggle navigation menu"
          >
            <Layers className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center text-white shadow-sm ring-1 ring-emerald-400/40">
              <Sparkles className="w-5 h-5 text-emerald-100" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-extrabold text-base sm:text-lg tracking-tight text-white leading-tight">
                  GreenAccess <span className="text-emerald-400 font-bold">AI</span>
                </h1>
                <span className="hidden md:inline-block px-1.5 py-0.5 text-[10px] uppercase font-mono font-semibold bg-emerald-950/80 text-emerald-300 border border-emerald-500/30 rounded">
                  GIS Platform
                </span>
              </div>
              <p className="hidden sm:block text-[11px] text-slate-400 font-medium tracking-tight truncate max-w-sm">
                Urban Green Space Intelligence & Accessibility Mapping
              </p>
            </div>
          </div>
        </div>

        {/* Center/Right Metadata Badges */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Study Area Label */}
          <div className="hidden xl:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800/80 border border-slate-700/80 text-xs text-slate-300">
            <MapPin className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
            <span className="font-medium text-slate-200">{studyArea.name}</span>
          </div>

          {/* Date Range Label */}
          <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800/80 border border-slate-700/80 text-xs text-slate-300">
            <Calendar className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
            <span>2024 (Annual Composite)</span>
          </div>

          {/* Cloud Threshold */}
          <div className="hidden 2xl:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800/80 border border-slate-700/80 text-xs text-slate-300">
            <CloudSun className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
            <span>Cloud &lt; {studyArea.cloudThreshold}%</span>
          </div>

          {/* Pipeline Status Indicator */}
          <div className="hidden md:flex items-center gap-2 px-2.5 py-1 rounded-lg bg-slate-800/60 border border-slate-700/60 text-xs text-slate-300">
            <Activity
              className={`w-3.5 h-3.5 ${
                loading
                  ? 'text-amber-400 animate-spin'
                  : 'text-emerald-400'
              }`}
            />
            <span className="text-[11px] font-mono text-slate-300 truncate max-w-[130px]">
              {statusMessage}
            </span>
          </div>

          {/* Interactive Data Mode Badge */}
          <DataModeBadge mode={dataMode} onToggle={setDataMode} interactive={true} />
        </div>
      </div>
    </header>
  );
};
