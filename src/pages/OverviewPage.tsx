import React from 'react';
import { useDashboardData } from '../hooks/useDashboardData';
import { studyArea } from '../config/studyArea';
import { StatCard } from '../components/common/StatCard';
import { SectionHeader } from '../components/common/SectionHeader';
import { DisclaimerBanner } from '../components/common/DisclaimerBanner';
import { LoadingSkeleton, CardSkeleton } from '../components/common/LoadingSkeleton';
import { GreenAccessMap } from '../components/map/GreenAccessMap';
import { AccessibilityDistributionChart } from '../components/charts/AccessibilityDistributionChart';
import { PriorityDistributionChart } from '../components/charts/PriorityDistributionChart';
import { formatArea, formatPercent } from '../lib/formatting';
import {
  Trees,
  Layers,
  AlertTriangle,
  Compass,
  ArrowRight,
  Sparkles,
  Target,
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const OverviewPage: React.FC = () => {
  const { statistics, zones, loading, dataMode } = useDashboardData();

  if (loading && !statistics) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
        <LoadingSkeleton rows={3} height="h-64" />
      </div>
    );
  }

  const stats = statistics || {
    totalGreenAreaM2: 8900000,
    greenPatchCount: 10,
    averagePatchAreaM2: 890000,
    largestPatchAreaM2: 2400000,
    greenCoveragePercent: 15.6,
    poorAccessAreaM2: 18200000,
    averageAccessibilityIndex: 51,
    priorityZoneCount: 7,
    studyAreaTotalM2: 741000000,
  };

  const provenanceNote =
    dataMode === 'demo'
      ? 'Demo Mode • Synthetic Baseline'
      : 'Earth Engine • Processed Layer';

  return (
    <div className="space-y-6">
      {/* Top Banner Disclaimer */}
      <DisclaimerBanner />

      {/* Page Title & Context Header */}
      <SectionHeader
        title="Urban Green Space Intelligence Overview"
        subtitle={`Decision-support command hub evaluating vegetation coverage, proximity deficits, and candidate park intervention zones across ${studyArea.name}.`}
        action={
          <Link
            to="/map"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0B1F33] text-emerald-300 font-semibold text-xs hover:bg-slate-800 transition shadow-sm"
          >
            Launch Full GIS Map
            <ArrowRight className="w-4 h-4" />
          </Link>
        }
      />

      {/* Top 6 Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3.5">
        <StatCard
          title="Total Green Area"
          value={formatArea(stats.totalGreenAreaM2)}
          icon={<Trees className="w-5 h-5 text-emerald-600" />}
          description="Contiguous vegetation above 2,500 m² threshold"
          provenance={provenanceNote}
          highlightColor="green"
        />

        <StatCard
          title="Green Patches"
          value={stats.greenPatchCount}
          unit="patches"
          icon={<Layers className="w-5 h-5 text-teal-600" />}
          description="Meaningful candidate spatial clusters"
          provenance={provenanceNote}
          highlightColor="green"
        />

        <StatCard
          title="Green Coverage"
          value={formatPercent(stats.greenCoveragePercent)}
          icon={<Sparkles className="w-5 h-5 text-lime-600" />}
          description="Study area aggregate vegetation ratio"
          provenance={provenanceNote}
          highlightColor="blue"
        />

        <StatCard
          title="Poor-Access Area"
          value={formatArea(stats.poorAccessAreaM2)}
          icon={<AlertTriangle className="w-5 h-5 text-rose-500" />}
          description="Zones with GAI &le; 30 or &gt;1km from park"
          provenance={provenanceNote}
          highlightColor="rose"
        />

        <StatCard
          title="Average GAI"
          value={stats.averageAccessibilityIndex}
          unit="/ 100"
          icon={<Compass className="w-5 h-5 text-indigo-600" />}
          description="Citywide mean Green Accessibility Index"
          provenance={provenanceNote}
          highlightColor="amber"
        />

        <StatCard
          title="Priority Zones"
          value={stats.priorityZoneCount}
          unit="zones"
          icon={<Target className="w-5 h-5 text-amber-500" />}
          description="High & Critical candidate zones"
          provenance={provenanceNote}
          highlightColor="amber"
        />
      </div>

      {/* Main Map Preview & Command Center */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
              <h3 className="font-bold text-base text-slate-900">
                Spatial Decision-Support Interface Preview
              </h3>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Interactive choropleth of priority zones, green patches, and accessibility buffers. Click any polygon to inspect zone factors.
            </p>
          </div>
          <Link
            to="/map"
            className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 inline-flex items-center gap-1 hover:underline"
          >
            Open Fullscreen GIS Explorer &rarr;
          </Link>
        </div>

        {/* Map Container */}
        <div className="w-full h-[520px] rounded-xl overflow-hidden border border-slate-200">
          <GreenAccessMap className="h-full" showControls={true} />
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AccessibilityDistributionChart zones={zones} />
        <PriorityDistributionChart zones={zones} />
      </div>

      {/* Quick Access to Deep Dive Modules */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Link
          to="/vegetation"
          className="p-4 rounded-xl bg-white border border-slate-200 hover:border-emerald-400 hover:shadow-xs transition group"
        >
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-emerald-50 text-emerald-700 group-hover:bg-emerald-600 group-hover:text-white transition">
              <Trees className="w-4 h-4" />
            </div>
            <h4 className="font-bold text-sm text-slate-900">
              Vegetation & NDVI Analysis
            </h4>
          </div>
          <p className="text-xs text-slate-500 mt-2">
            Inspect Sentinel-2 reflectance composites, NDVI spectral distribution, and patch scale filters.
          </p>
        </Link>

        <Link
          to="/accessibility"
          className="p-4 rounded-xl bg-white border border-slate-200 hover:border-blue-400 hover:shadow-xs transition group"
        >
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-blue-50 text-blue-700 group-hover:bg-blue-600 group-hover:text-white transition">
              <Compass className="w-4 h-4" />
            </div>
            <h4 className="font-bold text-sm text-slate-900">
              Accessibility (GAI) Model
            </h4>
          </div>
          <p className="text-xs text-slate-500 mt-2">
            Analyze distance bands (250m, 500m, 1km) and multi-criteria GAI formula weight distributions.
          </p>
        </Link>

        <Link
          to="/priority-zones"
          className="p-4 rounded-xl bg-white border border-slate-200 hover:border-amber-400 hover:shadow-xs transition group"
        >
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-amber-50 text-amber-800 group-hover:bg-amber-600 group-hover:text-white transition">
              <Target className="w-4 h-4" />
            </div>
            <h4 className="font-bold text-sm text-slate-900">
              Priority Ranking Table
            </h4>
          </div>
          <p className="text-xs text-slate-500 mt-2">
            Sort and filter 18 neighborhood zones, export CSV data, and review explainable recommendations.
          </p>
        </Link>
      </div>
    </div>
  );
};
