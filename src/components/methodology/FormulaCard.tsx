import React from 'react';
import { defaultGaiWeights, defaultPriorityWeights } from '../../config/modelWeights';

export const FormulaCard: React.FC = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 select-none">
      {/* NDVI Card */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Formula 01
            </span>
            <span className="text-[10px] font-mono bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded border border-emerald-200">
              Spectral Radiance
            </span>
          </div>
          <h3 className="font-bold text-base text-slate-900">
            Normalized Difference Vegetation Index (NDVI)
          </h3>
          <p className="text-xs text-slate-600 mt-1 leading-relaxed">
            Quantifies relative chlorophyll absorption and near-infrared canopy scattering.
          </p>

          <div className="my-4 bg-slate-900 text-emerald-400 p-3.5 rounded-xl font-mono text-center text-sm shadow-inner">
            NDVI = (NIR - RED) / (NIR + RED)
          </div>

          <div className="text-xs text-slate-600 space-y-1">
            <div>• <strong>NIR:</strong> Sentinel-2 Band 8 (842 nm, 10m res)</div>
            <div>• <strong>RED:</strong> Sentinel-2 Band 4 (665 nm, 10m res)</div>
            <div>• <strong>Threshold:</strong> &ge; 0.35 flags meaningful vegetation signal</div>
          </div>
        </div>

        <div className="mt-4 pt-2.5 border-t border-slate-100 text-[11px] text-slate-400">
          * Note: NDVI indicates vegetative vigor, not legal public accessibility.
        </div>
      </div>

      {/* GAI Card */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Formula 02
            </span>
            <span className="text-[10px] font-mono bg-teal-50 text-teal-700 px-2 py-0.5 rounded border border-teal-200">
              Accessibility Index
            </span>
          </div>
          <h3 className="font-bold text-base text-slate-900">
            Green Accessibility Index (GAI)
          </h3>
          <p className="text-xs text-slate-600 mt-1 leading-relaxed">
            Composite index synthesizing proximity buffers, local canopy proportion, and green density.
          </p>

          <div className="my-4 bg-slate-900 text-teal-300 p-3.5 rounded-xl font-mono text-center text-xs leading-relaxed shadow-inner">
            GAI = {defaultGaiWeights.distance} × S_dist + {defaultGaiWeights.greenCoverage} × S_cov + {defaultGaiWeights.localGreenDensity} × S_den
          </div>

          <div className="text-xs text-slate-600 space-y-1">
            <div>• <strong>Distance Score (S_dist, {defaultGaiWeights.distance * 100}%):</strong> 0-250m: 100, 250-500m: 75, 500-1km: 45, &gt;1km: 10</div>
            <div>• <strong>Coverage Score (S_cov, {defaultGaiWeights.greenCoverage * 100}%):</strong> Scaled against 30% urban benchmark</div>
            <div>• <strong>Density Score (S_den, {defaultGaiWeights.localGreenDensity * 100}%):</strong> Local zone vegetation density</div>
          </div>
        </div>

        <div className="mt-4 pt-2.5 border-t border-slate-100 text-[11px] text-slate-400">
          Range: 0–100 (0–30: Poor, 31–60: Moderate, 61–100: Good)
        </div>
      </div>

      {/* Priority Score Card */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Formula 03
            </span>
            <span className="text-[10px] font-mono bg-amber-50 text-amber-800 px-2 py-0.5 rounded border border-amber-200">
              Decision Model
            </span>
          </div>
          <h3 className="font-bold text-base text-slate-900">
            Intervention Priority Score
          </h3>
          <p className="text-xs text-slate-600 mt-1 leading-relaxed">
            Identifies candidate neighborhoods combining acute accessibility deficit, high density, and scarce foliage.
          </p>

          <div className="my-4 bg-slate-900 text-amber-300 p-3.5 rounded-xl font-mono text-center text-xs leading-relaxed shadow-inner">
            Priority = {defaultPriorityWeights.accessibilityDeficit} × D_acc + {defaultPriorityWeights.builtUpDensity} × D_built + {defaultPriorityWeights.vegetationDeficit} × D_veg + {defaultPriorityWeights.distanceFactor} × F_dist
          </div>

          <div className="text-xs text-slate-600 space-y-1">
            <div>• <strong>Access Deficit (D_acc, {defaultPriorityWeights.accessibilityDeficit * 100}%):</strong> 100 - GAI</div>
            <div>• <strong>Built Density (D_built, {defaultPriorityWeights.builtUpDensity * 100}%):</strong> Dynamic World built probability</div>
            <div>• <strong>Vegetation Deficit (D_veg, {defaultPriorityWeights.vegetationDeficit * 100}%):</strong> Canopy scarcity index</div>
            <div>• <strong>Distance Factor (F_dist, {defaultPriorityWeights.distanceFactor * 100}%):</strong> Normalized distance to park</div>
          </div>
        </div>

        <div className="mt-4 pt-2.5 border-t border-slate-100 text-[11px] text-slate-400">
          Classification: 0–30 Low, 31–60 Medium, 61–80 High, 81–100 Critical
        </div>
      </div>
    </div>
  );
};
