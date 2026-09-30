import React from 'react';
import { MapLayerState } from '../../types/map';
import { colorPalette, accessibilityThresholds } from '../../config/thresholds';

interface MapLegendProps {
  layerState: MapLayerState;
}

export const MapLegend: React.FC<MapLegendProps> = ({ layerState }) => {
  return (
    <div className="bg-white/95 backdrop-blur-xs rounded-xl border border-slate-200 p-3.5 shadow-md text-xs space-y-3.5 max-w-[260px] select-none">
      <div className="font-bold text-slate-800 uppercase tracking-wider text-[11px] border-b border-slate-100 pb-1.5 flex items-center justify-between">
        <span>Map Legend</span>
        <span className="text-[10px] text-slate-400 font-normal">Active Layers</span>
      </div>

      {/* Priority Zones Legend */}
      {layerState.priorityZones && (
        <div className="space-y-1.5">
          <div className="font-semibold text-slate-700 text-[11px]">
            Candidate Priority Zone
          </div>
          <div className="grid grid-cols-2 gap-1 text-[11px]">
            <div className="flex items-center gap-1.5">
              <span
                className="w-3 h-3 rounded-xs flex-shrink-0"
                style={{ backgroundColor: colorPalette.priority.Critical }}
              />
              <span className="text-slate-600">Critical (81–100)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span
                className="w-3 h-3 rounded-xs flex-shrink-0"
                style={{ backgroundColor: colorPalette.priority.High }}
              />
              <span className="text-slate-600">High (61–80)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span
                className="w-3 h-3 rounded-xs flex-shrink-0"
                style={{ backgroundColor: colorPalette.priority.Medium }}
              />
              <span className="text-slate-600">Medium (31–60)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span
                className="w-3 h-3 rounded-xs flex-shrink-0"
                style={{ backgroundColor: colorPalette.priority.Low }}
              />
              <span className="text-slate-600">Low (0–30)</span>
            </div>
          </div>
        </div>
      )}

      {/* Accessibility Legend */}
      {layerState.accessibility && (
        <div className="space-y-1.5 pt-1.5 border-t border-slate-100">
          <div className="font-semibold text-slate-700 text-[11px] flex justify-between items-baseline">
            <span>Green Accessibility (GAI)</span>
            <span className="text-[10px] text-slate-400">Nearest Distance</span>
          </div>
          <div className="space-y-1 text-[11px]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span
                  className="w-3 h-3 rounded-full flex-shrink-0"
                  style={{ backgroundColor: colorPalette.accessibility.Excellent }}
                />
                <span className="text-slate-600">Excellent</span>
              </div>
              <span className="text-slate-400 font-mono text-[10px]">&le; 250 m</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span
                  className="w-3 h-3 rounded-full flex-shrink-0"
                  style={{ backgroundColor: colorPalette.accessibility.Good }}
                />
                <span className="text-slate-600">Good</span>
              </div>
              <span className="text-slate-400 font-mono text-[10px]">250–500 m</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span
                  className="w-3 h-3 rounded-full flex-shrink-0"
                  style={{ backgroundColor: colorPalette.accessibility.Moderate }}
                />
                <span className="text-slate-600">Moderate</span>
              </div>
              <span className="text-slate-400 font-mono text-[10px]">500–1000 m</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span
                  className="w-3 h-3 rounded-full flex-shrink-0"
                  style={{ backgroundColor: colorPalette.accessibility.Poor }}
                />
                <span className="text-slate-600">Poor (Deficit)</span>
              </div>
              <span className="text-slate-400 font-mono text-[10px]">&gt; 1000 m</span>
            </div>
          </div>
        </div>
      )}

      {/* Green Space Patches Legend */}
      {layerState.greenSpaces && (
        <div className="space-y-1.5 pt-1.5 border-t border-slate-100">
          <div className="font-semibold text-slate-700 text-[11px]">
            Meaningful Green Spaces
          </div>
          <div className="flex items-center gap-2 text-[11px]">
            <span className="w-3.5 h-3.5 rounded bg-emerald-600 border border-emerald-800" />
            <span className="text-slate-600">Candidate Patch (&ge; 2,500 m²)</span>
          </div>
        </div>
      )}

      {/* NDVI Scale */}
      {layerState.ndvi && (
        <div className="space-y-1.5 pt-1.5 border-t border-slate-100">
          <div className="font-semibold text-slate-700 text-[11px] flex justify-between">
            <span>NDVI Signal</span>
            <span className="text-[10px] text-slate-400">Sentinel-2 SR</span>
          </div>
          <div className="h-2 rounded-full w-full bg-gradient-to-r from-red-700 via-yellow-400 to-emerald-700" />
          <div className="flex justify-between text-[10px] text-slate-400 font-mono">
            <span>0.0 (Sparse/Built)</span>
            <span>0.4</span>
            <span>0.8+ (Dense)</span>
          </div>
        </div>
      )}

      {/* Built-Up Context */}
      {layerState.builtUp && (
        <div className="space-y-1.5 pt-1.5 border-t border-slate-100">
          <div className="font-semibold text-slate-700 text-[11px] flex justify-between">
            <span>Built-up Context</span>
            <span className="text-[10px] text-slate-400">Dynamic World</span>
          </div>
          <div className="flex items-center gap-1.5 text-[11px]">
            <span className="w-3.5 h-3.5 rounded bg-blue-700/60 border border-blue-900" />
            <span className="text-slate-600">High Built-up Density (&gt; 70%)</span>
          </div>
        </div>
      )}
    </div>
  );
};
