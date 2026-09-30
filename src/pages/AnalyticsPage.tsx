import React from 'react';
import { useDashboardData } from '../hooks/useDashboardData';
import { SectionHeader } from '../components/common/SectionHeader';
import { DisclaimerBanner } from '../components/common/DisclaimerBanner';
import { AccessibilityDistributionChart } from '../components/charts/AccessibilityDistributionChart';
import { PriorityDistributionChart } from '../components/charts/PriorityDistributionChart';
import { NdviDistributionChart } from '../components/charts/NdviDistributionChart';
import { GreenCoverageChart } from '../components/charts/GreenCoverageChart';
import { PatchSizeChart } from '../components/charts/PatchSizeChart';
import { GaiVsBuiltupChart } from '../components/charts/GaiVsBuiltupChart';
import { Info } from 'lucide-react';

export const AnalyticsPage: React.FC = () => {
  const { zones, greenPatches } = useDashboardData();

  return (
    <div className="space-y-6">
      <DisclaimerBanner compact={true} />

      <SectionHeader
        title="Comprehensive Geospatial Analytics & Indicators"
        subtitle="Multi-dimensional statistical breakdowns across spectral reflectance, walking accessibility tiers, urban density correlations, and candidate priority categorizations."
      />

      {/* Grid of 6 Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AccessibilityDistributionChart zones={zones} />
        <PriorityDistributionChart zones={zones} />
        <NdviDistributionChart zones={zones} patches={greenPatches} />
        <GreenCoverageChart zones={zones} />
        <PatchSizeChart patches={greenPatches} />
        <GaiVsBuiltupChart zones={zones} />
      </div>

      {/* Analytical Footnote */}
      <div className="p-4 rounded-xl bg-slate-900 text-slate-300 text-xs flex items-center justify-between gap-4 border border-slate-800">
        <div className="flex items-center gap-2">
          <Info className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          <span>
            All visualizations reflect deterministic spatial models derived from Sentinel-2 MSI surface reflectance and Dynamic World land cover context.
          </span>
        </div>
        <span className="font-mono text-emerald-400 font-bold whitespace-nowrap">
          18 Zones Evaluated
        </span>
      </div>
    </div>
  );
};
