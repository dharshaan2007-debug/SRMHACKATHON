import React from 'react';
import { SectionHeader } from '../components/common/SectionHeader';
import { DisclaimerBanner } from '../components/common/DisclaimerBanner';
import { PipelineDiagram } from '../components/methodology/PipelineDiagram';
import { FormulaCard } from '../components/methodology/FormulaCard';
import { DatasetTable } from '../components/methodology/DatasetTable';
import {
  AlertTriangle,
  GitFork,
  Sliders,
  Database,
} from 'lucide-react';

export const MethodologyPage: React.FC = () => {
  return (
    <div className="space-y-8 select-none">
      <DisclaimerBanner />

      <SectionHeader
        title="Scientific Methodology & Geospatial Architecture"
        subtitle="End-to-end documentation of satellite image preprocessing, spectral vegetation indices, distance buffer heuristics, and multi-criteria priority scoring algorithms."
      />

      {/* Section 1: Geospatial Processing Pipeline */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
          <GitFork className="w-5 h-5 text-emerald-600" />
          <h3 className="font-bold text-base text-slate-900 uppercase tracking-wider">
            1. Decision-Support Workflow Pipeline
          </h3>
        </div>
        <p className="text-xs text-slate-600 max-w-3xl">
          Visual progression from raw Sentinel-2 constellation radiance to transparent, explainable urban planning decision recommendations.
        </p>
        <PipelineDiagram />
      </div>

      {/* Section 2: Mathematical Formulations */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
          <Sliders className="w-5 h-5 text-teal-600" />
          <h3 className="font-bold text-base text-slate-900 uppercase tracking-wider">
            2. Mathematical Formulations & Indicator Weights
          </h3>
        </div>
        <p className="text-xs text-slate-600 max-w-3xl">
          Reproducible GIS scoring equations normalized to standard 0–100 integer bounds with strict division-by-zero bounds checking.
        </p>
        <FormulaCard />
      </div>

      {/* Section 3: Satellite Data Provenance */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
          <Database className="w-5 h-5 text-indigo-600" />
          <h3 className="font-bold text-base text-slate-900 uppercase tracking-wider">
            3. Satellite Constellations & Earth Observation Catalogs
          </h3>
        </div>
        <DatasetTable />
      </div>

      {/* Section 4: Analytical Assumptions & Limitations */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
          <AlertTriangle className="w-5 h-5 text-amber-600" />
          <h3 className="font-bold text-base text-slate-900 uppercase tracking-wider">
            4. Analytical Assumptions, Limitations & Ground-Truthing Requirements
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="bg-white rounded-xl border border-slate-200 p-4 space-y-2 shadow-xs">
            <span className="font-bold text-slate-900 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              Vegetation Signal vs. Public Accessibility
            </span>
            <p className="text-slate-600 leading-relaxed">
              NDVI measures photosynthetic chlorophyll vigor across electromagnetic wavelengths. It cannot remotely verify physical gates, private property rights, military or academic enclosures, or entry fees.
            </p>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-4 space-y-2 shadow-xs">
            <span className="font-bold text-slate-900 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              Euclidean Proximity vs. Pedestrian Walkways
            </span>
            <p className="text-slate-600 leading-relaxed">
              Straight-line centroid distances serve as preliminary screening proxies. They do not simulate cul-de-sacs, physical railway severances, multi-lane expressways without crossings, or steep topographic slopes.
            </p>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-4 space-y-2 shadow-xs">
            <span className="font-bold text-slate-900 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              Dynamic World Land-Cover Uncertainty
            </span>
            <p className="text-slate-600 leading-relaxed">
              While Dynamic World provides 10m near-real-time deep learning land cover inferences, informal dense settlements, corrugated metal roofs, and unpaved roads can induce class confusion between bare ground and built-up surfaces.
            </p>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-4 space-y-2 shadow-xs">
            <span className="font-bold text-slate-900 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              Decision-Support Role & Multidisciplinary Verification
            </span>
            <p className="text-slate-600 leading-relaxed">
              The priority model ranks candidate zones to assist city planners in prioritizing site visits. It does not replace statutory zoning regulations, legal land acquisition due diligence, or community co-design consultations.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
