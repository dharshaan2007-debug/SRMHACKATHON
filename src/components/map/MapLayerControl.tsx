import React from 'react';
import { MapLayerState, BaseMapType } from '../../types/map';
import { Eye, EyeOff, Layers, Map as MapIcon, Sliders } from 'lucide-react';

interface MapLayerControlProps {
  layerState: MapLayerState;
  onToggleLayer: (layer: keyof MapLayerState) => void;
  baseMap: BaseMapType;
  onSelectBaseMap: (base: BaseMapType) => void;
  onResetView?: () => void;
  onFilterPriorityOnly?: () => void;
}

export const MapLayerControl: React.FC<MapLayerControlProps> = ({
  layerState,
  onToggleLayer,
  baseMap,
  onSelectBaseMap,
  onResetView,
}) => {
  return (
    <div className="bg-white/95 backdrop-blur-xs rounded-xl border border-slate-200 p-3.5 shadow-md text-xs space-y-3.5 w-64 select-none">
      {/* Header */}
      <div className="font-bold text-slate-800 uppercase tracking-wider text-[11px] border-b border-slate-100 pb-1.5 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <Layers className="w-3.5 h-3.5 text-slate-600" />
          <span>Layer Management</span>
        </div>
        {onResetView && (
          <button
            onClick={onResetView}
            className="text-[10px] text-emerald-600 hover:text-emerald-700 font-semibold hover:underline"
          >
            Reset
          </button>
        )}
      </div>

      {/* Basemap Switcher */}
      <div className="space-y-1.5">
        <span className="text-[10px] font-semibold uppercase text-slate-400">
          Base Imagery
        </span>
        <div className="grid grid-cols-2 gap-1.5 p-1 bg-slate-100 rounded-lg">
          <button
            type="button"
            onClick={() => onSelectBaseMap('osm')}
            className={`py-1 px-2 rounded-md font-medium text-center transition-all ${
              baseMap === 'osm'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Carto / OSM
          </button>
          <button
            type="button"
            onClick={() => onSelectBaseMap('satellite')}
            className={`py-1 px-2 rounded-md font-medium text-center transition-all ${
              baseMap === 'satellite'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Satellite ESRI
          </button>
        </div>
      </div>

      {/* Layer Toggles */}
      <div className="space-y-2 pt-1 border-t border-slate-100">
        <span className="text-[10px] font-semibold uppercase text-slate-400">
          Geospatial Overlays
        </span>

        {/* Priority Zones */}
        <label className="flex items-center justify-between cursor-pointer hover:bg-slate-50 p-1 rounded-md">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-orange-500" />
            <span className="font-medium text-slate-700">Priority Zones</span>
          </div>
          <input
            type="checkbox"
            checked={layerState.priorityZones}
            onChange={() => onToggleLayer('priorityZones')}
            className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 cursor-pointer"
          />
        </label>

        {/* Green Accessibility Bands */}
        <label className="flex items-center justify-between cursor-pointer hover:bg-slate-50 p-1 rounded-md">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <span className="font-medium text-slate-700">Accessibility (GAI)</span>
          </div>
          <input
            type="checkbox"
            checked={layerState.accessibility}
            onChange={() => onToggleLayer('accessibility')}
            className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 cursor-pointer"
          />
        </label>

        {/* Green Spaces */}
        <label className="flex items-center justify-between cursor-pointer hover:bg-slate-50 p-1 rounded-md">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-700" />
            <span className="font-medium text-slate-700">Green Spaces (&ge;2500m²)</span>
          </div>
          <input
            type="checkbox"
            checked={layerState.greenSpaces}
            onChange={() => onToggleLayer('greenSpaces')}
            className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 cursor-pointer"
          />
        </label>

        {/* NDVI Overlay */}
        <label className="flex items-center justify-between cursor-pointer hover:bg-slate-50 p-1 rounded-md">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-lime-600" />
            <span className="font-medium text-slate-700">NDVI Layer</span>
          </div>
          <input
            type="checkbox"
            checked={layerState.ndvi}
            onChange={() => onToggleLayer('ndvi')}
            className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 cursor-pointer"
          />
        </label>

        {/* Built-up Context */}
        <label className="flex items-center justify-between cursor-pointer hover:bg-slate-50 p-1 rounded-md">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
            <span className="font-medium text-slate-700">Built-up Context</span>
          </div>
          <input
            type="checkbox"
            checked={layerState.builtUp}
            onChange={() => onToggleLayer('builtUp')}
            className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 cursor-pointer"
          />
        </label>

        {/* Boundary */}
        <label className="flex items-center justify-between cursor-pointer hover:bg-slate-50 p-1 rounded-md">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-600" />
            <span className="font-medium text-slate-700">Study Area Boundary</span>
          </div>
          <input
            type="checkbox"
            checked={layerState.boundary}
            onChange={() => onToggleLayer('boundary')}
            className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 cursor-pointer"
          />
        </label>
      </div>
    </div>
  );
};
