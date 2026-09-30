import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Map,
  Trees,
  Navigation,
  Target,
  BarChart3,
  GitFork,
  ShieldCheck,
  Info,
} from 'lucide-react';
import { useDashboardData } from '../../hooks/useDashboardData';

const navItems = [
  {
    to: '/',
    label: 'Overview',
    icon: LayoutDashboard,
    badge: 'Hub',
  },
  {
    to: '/map',
    label: 'Interactive Map',
    icon: Map,
    badge: 'GIS',
  },
  {
    to: '/vegetation',
    label: 'Vegetation Analysis',
    icon: Trees,
  },
  {
    to: '/accessibility',
    label: 'Accessibility Analysis',
    icon: Navigation,
  },
  {
    to: '/priority-zones',
    label: 'Priority Zones',
    icon: Target,
    highlight: true,
  },
  {
    to: '/analytics',
    label: 'Analytics',
    icon: BarChart3,
  },
  {
    to: '/methodology',
    label: 'Methodology',
    icon: GitFork,
  },
];

export const Sidebar: React.FC<{ onCloseMobile?: () => void }> = ({ onCloseMobile }) => {
  const { dataMode } = useDashboardData();

  return (
    <aside className="w-64 bg-[#071522] text-slate-300 border-r border-slate-800 flex flex-col justify-between h-[calc(100vh-4rem)] sticky top-16 select-none">
      {/* Top Nav links */}
      <div className="p-4 space-y-1 overflow-y-auto">
        <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
          Decision Support Modules
        </div>

        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={onCloseMobile}
              className={({ isActive }) =>
                `flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all group ${
                  isActive
                    ? 'bg-emerald-600/20 text-emerald-300 border border-emerald-500/30 shadow-xs'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`
              }
            >
              <div className="flex items-center gap-3">
                <Icon className="w-4 h-4 text-slate-400 group-hover:text-emerald-400 transition-colors" />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 font-mono">
                  {item.badge}
                </span>
              )}
              {item.highlight && (
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              )}
            </NavLink>
          );
        })}
      </div>

      {/* Sidebar Footer Information */}
      <div className="p-4 border-t border-slate-800 bg-[#06111C]/80 space-y-3 text-[11px]">
        <div className="rounded-lg bg-slate-900/90 border border-slate-800 p-2.5 space-y-1">
          <div className="flex items-center gap-1.5 text-slate-300 font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Data Integrity Notice</span>
          </div>
          <p className="text-[10px] text-slate-400 leading-relaxed">
            {dataMode === 'demo'
              ? 'Operating with synthetic demonstration baseline. Not live satellite measurements.'
              : 'Connected to Earth Engine analysis pipeline.'}
          </p>
        </div>

        <div className="flex items-center justify-between text-slate-400 text-[10px] pt-1">
          <span className="flex items-center gap-1 font-mono">
            <Info className="w-3 h-3 text-slate-400" /> v1.2.0-prototype
          </span>
          <span className="font-medium text-slate-300">Decision-Support</span>
        </div>
      </div>
    </aside>
  );
};
