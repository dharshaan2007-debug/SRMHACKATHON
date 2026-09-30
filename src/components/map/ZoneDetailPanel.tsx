import React from 'react';
import { AnalysisZone } from '../../types/analysis';
import { Badge } from '../common/Badge';
import {
  AlertTriangle,
  Building2,
  Compass,
  FileText,
  MapPin,
  Maximize2,
  Trees,
  X,
  Sparkles,
} from 'lucide-react';
import { formatDistance, formatPercent, formatNdvi } from '../../lib/formatting';

interface ZoneDetailPanelProps {
  zone: AnalysisZone;
  onClose: () => void;
  onZoomTo?: () => void;
}

export const ZoneDetailPanel: React.FC<ZoneDetailPanelProps> = ({
  zone,
  onClose,
  onZoomTo,
}) => {
  const priorityVariant = {
    Critical: 'danger',
    High: 'warning',
    Medium: 'warning',
    Low: 'success',
  }[zone.priorityClass] as 'danger' | 'warning' | 'success';

  const accessibilityVariant = {
    Excellent: 'success',
    Good: 'success',
    Moderate: 'warning',
    Poor: 'danger',
  }[zone.accessibilityClass] as 'danger' | 'warning' | 'success';

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xl overflow-hidden flex flex-col max-h-[82vh] w-full max-w-sm sm:max-w-md select-none">
      {/* Header */}
      <div className="bg-[#0B1F33] text-white p-4 flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs px-2 py-0.5 rounded bg-slate-800 text-emerald-300 font-bold border border-slate-700">
              {zone.id}
            </span>
            <Badge variant={priorityVariant} size="sm">
              {zone.priorityClass} Priority
            </Badge>
          </div>
          <h3 className="font-bold text-base sm:text-lg text-white mt-1 leading-snug">
            {zone.name}
          </h3>
        </div>
        <button
          onClick={onClose}
          className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          aria-label="Close panel"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Scrollable Body */}
      <div className="p-4 sm:p-5 overflow-y-auto space-y-4 text-xs">
        {/* Core Scores Grid */}
        <div className="grid grid-cols-2 gap-2.5">
          <div className="bg-slate-50 border border-slate-200/80 p-3 rounded-xl">
            <span className="text-[10px] uppercase font-semibold text-slate-500">
              Green Accessibility (GAI)
            </span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="text-2xl font-bold text-slate-900">
                {zone.greenAccessibilityIndex}
              </span>
              <span className="text-slate-400 text-xs">/ 100</span>
            </div>
            <div className="mt-1">
              <Badge variant={accessibilityVariant} size="sm">
                {zone.accessibilityClass} Access
              </Badge>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200/80 p-3 rounded-xl">
            <span className="text-[10px] uppercase font-semibold text-slate-500">
              Intervention Priority Score
            </span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="text-2xl font-bold text-slate-900">
                {zone.priorityScore}
              </span>
              <span className="text-slate-400 text-xs">/ 100</span>
            </div>
            <span className="text-[10px] text-slate-500 mt-1 block">
              Deficit weight model output
            </span>
          </div>
        </div>

        {/* Spatial Metrics Table */}
        <div className="space-y-1.5 border border-slate-100 rounded-xl p-3 bg-slate-50/50">
          <div className="flex items-center justify-between py-1 border-b border-slate-100">
            <span className="text-slate-500 flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-slate-400" /> Nearest Green Space:
            </span>
            <span className="font-semibold text-slate-800 font-mono">
              {formatDistance(zone.nearestGreenDistanceM)}
            </span>
          </div>
          <div className="flex items-center justify-between py-1 border-b border-slate-100">
            <span className="text-slate-500 flex items-center gap-1.5">
              <Trees className="w-3.5 h-3.5 text-emerald-500" /> Green Coverage:
            </span>
            <span className="font-semibold text-slate-800 font-mono">
              {formatPercent(zone.greenCoveragePercent)}
            </span>
          </div>
          <div className="flex items-center justify-between py-1 border-b border-slate-100">
            <span className="text-slate-500 flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-blue-500" /> Built-up Density:
            </span>
            <span className="font-semibold text-slate-800 font-mono">
              {formatPercent(zone.builtUpDensityPercent)}
            </span>
          </div>
          <div className="flex items-center justify-between py-1">
            <span className="text-slate-500 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-teal-500" /> Mean Sentinel-2 NDVI:
            </span>
            <span className="font-semibold text-slate-800 font-mono">
              {formatNdvi(zone.ndvi)}
            </span>
          </div>
        </div>

        {/* Why this matters (Reasons Chips) */}
        <div className="space-y-1.5">
          <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block">
            Contributing Deficiency Factors
          </span>
          <div className="flex flex-wrap gap-1.5">
            {zone.reasons.length > 0 ? (
              zone.reasons.map((r) => (
                <span
                  key={r}
                  className="px-2.5 py-1 rounded-md bg-amber-50 text-amber-900 border border-amber-200/80 text-[11px] font-medium"
                >
                  {r}
                </span>
              ))
            ) : (
              <span className="text-xs text-slate-500">
                Favorable green accessibility profile.
              </span>
            )}
          </div>
        </div>

        {/* Explainable Decision-Support Recommendation */}
        <div className="p-3 rounded-xl bg-slate-900 text-slate-200 space-y-1.5 border-l-4 border-l-emerald-500">
          <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400 uppercase tracking-wide">
            <FileText className="w-3.5 h-3.5" />
            Decision-Support Recommendation
          </div>
          <p className="text-xs leading-relaxed text-slate-300">
            {zone.recommendation}
          </p>
        </div>

        {/* Prototype Disclaimer */}
        <div className="flex items-start gap-2 text-[10px] text-slate-400 bg-slate-50 p-2.5 rounded-lg border border-slate-200/60 leading-normal">
          <AlertTriangle className="w-3.5 h-3.5 text-amber-500 flex-shrink-0 mt-0.5" />
          <span>
            Prototype model output. Not an official planning designation or legally approved park site. Field survey required.
          </span>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="p-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-2">
        <button
          onClick={onClose}
          className="px-3 py-1.5 rounded-lg border border-slate-300 text-slate-700 text-xs font-medium hover:bg-slate-100 transition"
        >
          Close
        </button>
        {onZoomTo && (
          <button
            onClick={onZoomTo}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0B1F33] text-emerald-300 text-xs font-semibold hover:bg-slate-800 transition"
          >
            <Maximize2 className="w-3.5 h-3.5" />
            Focus on Zone
          </button>
        )}
      </div>
    </div>
  );
};
