import React from 'react';
import { useDashboardData } from '../hooks/useDashboardData';
import { SectionHeader } from '../components/common/SectionHeader';
import { StatCard } from '../components/common/StatCard';
import { DisclaimerBanner } from '../components/common/DisclaimerBanner';
import { AccessibilityDistributionChart } from '../components/charts/AccessibilityDistributionChart';
import { GaiVsBuiltupChart } from '../components/charts/GaiVsBuiltupChart';
import { accessibilityThresholds } from '../config/thresholds';
import { defaultGaiWeights } from '../config/modelWeights';
import { formatArea, formatDistance } from '../lib/formatting';
import {
  Compass,
  MapPin,
  AlertTriangle,
  Sliders,
} from 'lucide-react';

export const AccessibilityPage: React.FC = () => {
  const { statistics, zones, dataMode } = useDashboardData();

  const avgDistance =
    zones.length > 0
      ? Math.round(
          zones.reduce((acc, z) => acc + z.nearestGreenDistanceM, 0) / zones.length
        )
      : 840;

  const poorZones = zones.filter((z) => z.accessibilityClass === 'Poor');
  const poorZonesCount = poorZones.length;

  const provenanceNote =
    dataMode === 'demo'
      ? 'Demo Mode • Synthetic Proximity Model'
      : 'Earth Engine & Spatial Distance Buffer Pipeline';

  return (
    <div className="space-y-6">
      <DisclaimerBanner compact={true} />

      <SectionHeader
        title="Green Accessibility (GAI) Analysis"
        subtitle="Distance-buffer proximity modeling, walking-shed accessibility thresholds, and composite multi-factor index evaluation."
      />

      {/* Assumptions and Planning Standards Warning Card */}
      <div className="bg-amber-950 text-amber-100 rounded-xl p-4 sm:p-5 border border-amber-800 shadow-xs flex items-start gap-3.5">
        <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
        <div className="space-y-1 text-xs sm:text-sm">
          <h4 className="font-bold text-white tracking-wide uppercase text-xs">
            Prototype Analytical Assumption Advisory
          </h4>
          <p className="text-amber-200 leading-relaxed">
            “{accessibilityThresholds.disclaimer}”
          </p>
          <p className="text-amber-300 text-xs">
            Euclidean distance bands assume unobstructed planar access and serve as an indicative preliminary screening proxy. Walksheds require validation against local street connectivity, arterial barriers, intersection safety, and physical terrain.
          </p>
        </div>
      </div>

      {/* 4 Summary Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Average Nearest Distance"
          value={formatDistance(avgDistance)}
          icon={<Compass className="w-5 h-5 text-indigo-600" />}
          description="Mean distance from zone centroids to meaningful green spaces"
          provenance={provenanceNote}
          highlightColor="navy"
        />

        <StatCard
          title="Poor-Access Zones"
          value={poorZonesCount}
          unit="zones"
          icon={<AlertTriangle className="w-5 h-5 text-rose-500" />}
          description="Neighborhoods exceeding 1,000m or scoring GAI &le; 30"
          provenance={provenanceNote}
          highlightColor="rose"
        />

        <StatCard
          title="Poor-Access Territory"
          value={formatArea(statistics?.poorAccessAreaM2 || 18200000)}
          icon={<MapPin className="w-5 h-5 text-rose-600" />}
          description="Aggregate area of severely green-deficient zones"
          provenance={provenanceNote}
          highlightColor="rose"
        />

        <StatCard
          title="Citywide Mean GAI"
          value={statistics?.averageAccessibilityIndex || 51}
          unit="/ 100"
          icon={<Sliders className="w-5 h-5 text-emerald-600" />}
          description="Weighted index of proximity, canopy, and density"
          provenance={provenanceNote}
          highlightColor="green"
        />
      </div>

      {/* Prototype Accessibility Distance Bands Card */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
        <h3 className="font-bold text-sm text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-2">
          Prototype Accessibility Tiers & Scoring Logic
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200/80 space-y-1">
            <div className="flex items-center justify-between">
              <span className="font-bold text-emerald-900 text-sm">Excellent</span>
              <span className="font-mono text-emerald-700 font-bold">100 pts</span>
            </div>
            <div className="text-emerald-800 font-medium">0 – 250 meters</div>
            <p className="text-[11px] text-emerald-700 leading-tight">
              3-minute direct walk. Direct residential doorstep access to meaningful urban green.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-teal-50 border border-teal-200/80 space-y-1">
            <div className="flex items-center justify-between">
              <span className="font-bold text-teal-900 text-sm">Good</span>
              <span className="font-mono text-teal-700 font-bold">75 pts</span>
            </div>
            <div className="text-teal-800 font-medium">250 – 500 meters</div>
            <p className="text-[11px] text-teal-700 leading-tight">
              6-minute walk. Generally considered standard neighborhood accessible walking shed.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200/80 space-y-1">
            <div className="flex items-center justify-between">
              <span className="font-bold text-amber-900 text-sm">Moderate</span>
              <span className="font-mono text-amber-700 font-bold">45 pts</span>
            </div>
            <div className="text-amber-800 font-medium">500 – 1000 meters</div>
            <p className="text-[11px] text-amber-700 leading-tight">
              12-minute walk. Marginal walking shed; frequent vehicular reliance for elderly & children.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200/80 space-y-1">
            <div className="flex items-center justify-between">
              <span className="font-bold text-rose-900 text-sm">Poor (Deficit)</span>
              <span className="font-mono text-rose-700 font-bold">10 pts</span>
            </div>
            <div className="text-rose-800 font-medium">&gt; 1000 meters</div>
            <p className="text-[11px] text-rose-700 leading-tight">
              &gt;15-minute walk. Severe spatial deficit; acute candidate for pocket green interventions.
            </p>
          </div>
        </div>

        <div className="pt-2 flex flex-wrap items-center justify-between text-[11px] text-slate-500 border-t border-slate-100 gap-2">
          <span>GAI Formula: {defaultGaiWeights.distance * 100}% Proximity + {defaultGaiWeights.greenCoverage * 100}% Green Coverage + {defaultGaiWeights.localGreenDensity * 100}% Density Ratio</span>
          <span className="font-medium text-slate-700">Prototype analytical model</span>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AccessibilityDistributionChart zones={zones} />
        <GaiVsBuiltupChart zones={zones} />
      </div>
    </div>
  );
};
