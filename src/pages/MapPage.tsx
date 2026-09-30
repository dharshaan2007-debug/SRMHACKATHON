import React from 'react';
import { GreenAccessMap } from '../components/map/GreenAccessMap';
import { useDashboardData } from '../hooks/useDashboardData';
import { studyArea } from '../config/studyArea';
import { DisclaimerBanner } from '../components/common/DisclaimerBanner';
import { Trees } from 'lucide-react';

export const MapPage: React.FC = () => {
  const { zones, greenPatches, layerState, toggleLayer } = useDashboardData();

  const criticalCount = zones.filter((z) => z.priorityClass === 'Critical').length;
  const highCount = zones.filter((z) => z.priorityClass === 'High').length;
  const poorAccessCount = zones.filter((z) => z.accessibilityClass === 'Poor').length;

  return (
    <div className="space-y-4">
      {/* Top Banner Disclaimer */}
      <DisclaimerBanner compact={true} />

      {/* Map Control Toolbar & Status Strip */}
      <div className="bg-white rounded-xl border border-slate-200 p-3 sm:p-4 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#0B1F33] text-emerald-300 flex items-center justify-center font-bold text-xs">
            GIS
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-900 leading-tight">
              Interactive Geospatial Map Explorer
            </h2>
            <p className="text-[11px] text-slate-500">
              {studyArea.name} • 18 Analysis Zones • {greenPatches.length} Meaningful Patches
            </p>
          </div>
        </div>

        {/* Quick Filter / Indicator Pills */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <button
            onClick={() => toggleLayer('priorityZones')}
            className={`px-3 py-1.5 rounded-lg border font-medium flex items-center gap-1.5 transition ${
              layerState.priorityZones
                ? 'bg-rose-50 text-rose-800 border-rose-300 shadow-xs'
                : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-rose-600" />
            <span>Priority: {criticalCount + highCount} Candidate Zones</span>
          </button>

          <button
            onClick={() => toggleLayer('accessibility')}
            className={`px-3 py-1.5 rounded-lg border font-medium flex items-center gap-1.5 transition ${
              layerState.accessibility
                ? 'bg-emerald-50 text-emerald-800 border-emerald-300 shadow-xs'
                : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-600" />
            <span>Access Deficit: {poorAccessCount} Zones</span>
          </button>

          <button
            onClick={() => toggleLayer('greenSpaces')}
            className={`px-3 py-1.5 rounded-lg border font-medium flex items-center gap-1.5 transition ${
              layerState.greenSpaces
                ? 'bg-teal-50 text-teal-800 border-teal-300 shadow-xs'
                : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <Trees className="w-3.5 h-3.5 text-teal-600" />
            <span>{greenPatches.length} Green Spaces</span>
          </button>
        </div>
      </div>

      {/* Main Full-Height Interactive Map */}
      <div className="w-full h-[calc(100vh-14rem)] min-h-[580px] rounded-2xl overflow-hidden border border-slate-200 shadow-sm relative">
        <GreenAccessMap className="h-full w-full" showControls={true} />
      </div>
    </div>
  );
};
