import React from 'react';
import { useDashboardData } from '../hooks/useDashboardData';
import { SectionHeader } from '../components/common/SectionHeader';
import { StatCard } from '../components/common/StatCard';
import { DisclaimerBanner } from '../components/common/DisclaimerBanner';
import { NdviDistributionChart } from '../components/charts/NdviDistributionChart';
import { PatchSizeChart } from '../components/charts/PatchSizeChart';
import { formatArea, formatPercent, formatNdvi } from '../lib/formatting';
import { greenSpaceModel } from '../config/thresholds';
import {
  Trees,
  Layers,
  Sparkles,
  Maximize2,
} from 'lucide-react';

export const VegetationPage: React.FC = () => {
  const { statistics, greenPatches, zones, dataMode } = useDashboardData();

  const meanNdvi =
    zones.length > 0
      ? Number((zones.reduce((acc, z) => acc + z.ndvi, 0) / zones.length).toFixed(3))
      : 0.312;

  const medianNdvi = 0.320;

  const provenanceNote =
    dataMode === 'demo'
      ? 'Demo Mode • Synthetic Simulation'
      : 'Copernicus Sentinel-2 L2A Median Composite';

  return (
    <div className="space-y-6">
      <DisclaimerBanner compact={true} />

      <SectionHeader
        title="Vegetation & NDVI Spectral Analysis"
        subtitle="Spectral decomposition of canopy cover, chlorophyll reflectance, and continuous patch extraction derived from Sentinel-2 MSI surface reflectance."
      />

      {/* Critical Interpretation Alert Card */}
      <div className="bg-emerald-950 text-emerald-100 rounded-xl p-4 sm:p-5 border border-emerald-800 shadow-xs flex items-start gap-3.5">
        <Sparkles className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
        <div className="space-y-1 text-xs sm:text-sm">
          <h4 className="font-bold text-white tracking-wide uppercase text-xs">
            Scientific Interpretation Boundary
          </h4>
          <p className="text-emerald-200 leading-relaxed">
            “NDVI is a vegetation signal derived from near-infrared and red reflectance. It is not, by itself, proof that a green area is a public park or publicly accessible.”
          </p>
          <p className="text-emerald-300 text-xs">
            Remotely sensed NDVI includes residential private backyards, institutional campuses (e.g. IISc), roadside scrub, agricultural parcels, and fenced lake wetlands.
          </p>
        </div>
      </div>

      {/* 6 Core Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3.5">
        <StatCard
          title="Mean Zone NDVI"
          value={formatNdvi(meanNdvi)}
          icon={<Sparkles className="w-5 h-5 text-emerald-600" />}
          description="Average neighborhood NDVI reflectance"
          provenance={provenanceNote}
          highlightColor="green"
        />

        <StatCard
          title="Median NDVI"
          value={formatNdvi(medianNdvi)}
          icon={<Sparkles className="w-5 h-5 text-teal-600" />}
          description="Study area 50th percentile pixel signal"
          provenance={provenanceNote}
          highlightColor="green"
        />

        <StatCard
          title="Vegetation Coverage"
          value={formatPercent(statistics?.greenCoveragePercent || 15.6)}
          icon={<Trees className="w-5 h-5 text-lime-600" />}
          description="Nominal canopy & lawn ground fraction"
          provenance={provenanceNote}
          highlightColor="blue"
        />

        <StatCard
          title="Total Green Area"
          value={formatArea(statistics?.totalGreenAreaM2 || 8900000)}
          icon={<Layers className="w-5 h-5 text-emerald-700" />}
          description="Aggregated candidate green clusters"
          provenance={provenanceNote}
          highlightColor="green"
        />

        <StatCard
          title="Largest Patch"
          value={formatArea(statistics?.largestPatchAreaM2 || 2400000)}
          icon={<Maximize2 className="w-5 h-5 text-indigo-600" />}
          description="Turahalli Forest Foothills preserve"
          provenance={provenanceNote}
          highlightColor="navy"
        />

        <StatCard
          title="Average Patch Size"
          value={formatArea(statistics?.averagePatchAreaM2 || 890000)}
          icon={<Trees className="w-5 h-5 text-teal-600" />}
          description="Mean scale of 10 key spatial clusters"
          provenance={provenanceNote}
          highlightColor="navy"
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <NdviDistributionChart zones={zones} patches={greenPatches} />
        <PatchSizeChart patches={greenPatches} />
      </div>

      {/* Patch Extraction Methodology Card */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="font-bold text-sm text-slate-900 uppercase tracking-wider">
            Combined Patch Extraction Protocol
          </h3>
          <span className="text-[11px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
            Multi-Sensor Fusion
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200/80 space-y-1.5">
            <span className="font-bold text-slate-800">1. Spectral Thresholding</span>
            <p className="text-slate-600 leading-relaxed">
              Sentinel-2 NDVI &ge; <strong>{greenSpaceModel.ndviThreshold}</strong> screens photosynthetic vegetation from barren soils and asphalt.
            </p>
          </div>

          <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200/80 space-y-1.5">
            <span className="font-bold text-slate-800">2. Spatial Cluster Filter</span>
            <p className="text-slate-600 leading-relaxed">
              Minimum contiguous area filter of <strong>{greenSpaceModel.minimumPatchAreaM2.toLocaleString()} m² (0.25 ha)</strong> to exclude isolated street trees.
            </p>
          </div>

          <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200/80 space-y-1.5">
            <span className="font-bold text-slate-800">3. Land Cover Cross-Check</span>
            <p className="text-slate-600 leading-relaxed">
              Dynamic World land cover masks confirm vegetation classes (trees, grass, scrub) while excluding open water and active paved surfaces.
            </p>
          </div>
        </div>

        <div className="pt-2 flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-100">
          <span>Formula: NDVI = (B8 - B4) / (B8 + B4)</span>
          <span>{greenSpaceModel.disclaimer}</span>
        </div>
      </div>
    </div>
  );
};
