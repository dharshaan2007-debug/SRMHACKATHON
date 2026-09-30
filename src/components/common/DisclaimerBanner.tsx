import React from 'react';
import { AlertTriangle, Info } from 'lucide-react';
import { useDashboardData } from '../../hooks/useDashboardData';

export const DisclaimerBanner: React.FC<{ compact?: boolean }> = ({ compact = false }) => {
  const { dataMode } = useDashboardData();
  const isDemo = dataMode === 'demo';

  if (compact) {
    return (
      <div className="bg-amber-500/10 border border-amber-500/30 px-3 py-2 rounded-lg text-xs text-amber-900 flex items-center gap-2">
        <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0" />
        <span className="leading-snug">
          <strong>Notice:</strong> This is a prototype decision-support model, not an official planning standard and not a legally approved park-selection system.
        </span>
      </div>
    );
  }

  return (
    <div className="bg-slate-900 text-slate-200 border-l-4 border-l-amber-500 rounded-r-xl p-4 sm:p-5 shadow-xs mb-6">
      <div className="flex items-start gap-3.5">
        <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
        <div className="space-y-1.5 text-xs sm:text-sm">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-bold text-white tracking-wide uppercase text-[11px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40">
              Prototype Advisory & Disclaimer
            </span>
            {isDemo && (
              <span className="font-mono text-[11px] text-amber-400">
                [DEMO MODE ACTIVE: Illustrative synthetic baseline dataset]
              </span>
            )}
          </div>
          <p className="text-slate-300 leading-relaxed">
            “This is a prototype decision-support model, not an official planning standard and not a legally approved park-selection system.”
          </p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-slate-400 text-xs pt-1">
            <span className="flex items-center gap-1">
              <Info className="w-3.5 h-3.5 text-slate-400" />
              NDVI indicates vegetative spectral signal; public accessibility is not verified automatically.
            </span>
            <span>•</span>
            <span>Distance buffers represent prototype analytical assumptions.</span>
            <span>•</span>
            <span>Priorities highlight candidate zones for further multidisciplinary field appraisal.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
