import React from 'react';
import {
  Satellite,
  Filter,
  CloudOff,
  Layers,
  Sparkles,
  TreeDeciduous,
  Building,
  Maximize2,
  Compass,
  Sliders,
  AlertCircle,
  FileCheck2,
  ArrowRight,
} from 'lucide-react';

interface Step {
  id: number;
  title: string;
  category: 'Data Acquisition' | 'Image Processing' | 'Spatial Modeling' | 'Decision Support';
  description: string;
  input: string;
  output: string;
  limitation: string;
  icon: React.ReactNode;
}

const steps: Step[] = [
  {
    id: 1,
    title: 'Sentinel-2 Image Collection',
    category: 'Data Acquisition',
    description: 'Query COPERNICUS/S2_SR_HARMONIZED Level-2A surface reflectance tiles covering study coordinates.',
    input: 'Copernicus Hub / GEE',
    output: 'Raw 10m/20m spectral bands (B2, B3, B4, B8)',
    limitation: '5-day revisit cycle; affected by persistent monsoonal cloud occlusion.',
    icon: <Satellite className="w-5 h-5 text-blue-500" />,
  },
  {
    id: 2,
    title: 'Study Area & Date Filtering',
    category: 'Data Acquisition',
    description: 'Filter collection to Bengaluru Urban Region bounding box across the 2024 calendar year.',
    input: 'GeoJSON Bounding Polygon',
    output: 'Clipped image collection',
    limitation: 'Fixed administrative boundary may omit cross-border green accessibility.',
    icon: <Filter className="w-5 h-5 text-indigo-500" />,
  },
  {
    id: 3,
    title: 'QA60 Cloud & Shadow Masking',
    category: 'Image Processing',
    description: 'Mask cloudy and cirrus pixels using Sentinel-2 QA60 bitmask flags (threshold < 20%).',
    input: 'QA60 Bitmask',
    output: 'Cloud-free pixel masked collection',
    limitation: 'Sub-pixel thin haze or building shadow can cause residual reflectance artifacts.',
    icon: <CloudOff className="w-5 h-5 text-slate-500" />,
  },
  {
    id: 4,
    title: 'Representative Median Composite',
    category: 'Image Processing',
    description: 'Apply median reducer across the temporal stack to synthesize a single representative reflectance scene.',
    input: 'Multi-temporal masked stack',
    output: '10m median surface reflectance mosaic',
    limitation: 'Temporal median averages seasonal vegetation phenology variations.',
    icon: <Layers className="w-5 h-5 text-cyan-600" />,
  },
  {
    id: 5,
    title: 'NDVI Spectral Calculation',
    category: 'Image Processing',
    description: 'Compute Normalized Difference Vegetation Index using Near-Infrared (B8) and Red (B4) channels.',
    input: 'B8 (NIR), B4 (RED)',
    output: 'Continuous NDVI raster (-1.0 to +1.0)',
    limitation: 'NDVI indicates photosynthetic signal; cannot differentiate public parks from private gardens.',
    icon: <Sparkles className="w-5 h-5 text-emerald-500" />,
  },
  {
    id: 6,
    title: 'Dynamic World Context',
    category: 'Spatial Modeling',
    description: 'Extract near real-time land cover class probabilities from Google Dynamic World V1.',
    input: 'Dynamic World V1 Probability Bands',
    output: 'Built-up probability & land use mask',
    limitation: 'AI land-cover classification model contains inherent sensor noise in dense informal settlements.',
    icon: <Building className="w-5 h-5 text-amber-600" />,
  },
  {
    id: 7,
    title: 'Green-Space Patch Extraction',
    category: 'Spatial Modeling',
    description: 'Extract contiguous vegetation clusters with NDVI >= 0.35 and minimum patch area threshold of 2,500 m².',
    input: 'NDVI + Land Cover Filter',
    output: 'Meaningful green patch polygons',
    limitation: 'Linear roadside trees or very small pocket gardens under 0.25 ha are excluded by threshold.',
    icon: <TreeDeciduous className="w-5 h-5 text-emerald-600" />,
  },
  {
    id: 8,
    title: 'Distance Buffer Accessibility',
    category: 'Spatial Modeling',
    description: 'Calculate Euclidean and centroid proximity from urban neighborhoods to the nearest meaningful green space.',
    input: 'Zone centroids + Green Patches',
    output: 'Nearest distance in meters (0–250, 250–500, 500–1000, >1000m)',
    limitation: 'Euclidean distance does not account for pedestrian street networks, gates, or physical severance.',
    icon: <Compass className="w-5 h-5 text-blue-600" />,
  },
  {
    id: 9,
    title: 'Green Accessibility Index (GAI)',
    category: 'Spatial Modeling',
    description: 'Synthesize Distance Score (50%), Green Coverage (30%), and Local Canopy Density (20%) on a 0–100 scale.',
    input: 'Multi-criteria spatial scores',
    output: 'Composite GAI score & classification',
    limitation: 'Relative weights are prototype assumptions requiring localized municipal tuning.',
    icon: <Sliders className="w-5 h-5 text-teal-600" />,
  },
  {
    id: 10,
    title: 'Priority Zone Model',
    category: 'Decision Support',
    description: 'Evaluate Intervention Priority based on Accessibility Deficit, Built-up Density, and Vegetation Scarcity.',
    input: 'GAI Deficit + Built-up % + Canopy Deficit',
    output: 'Priority Score (Low, Medium, High, Critical)',
    limitation: 'Ranks candidate areas for investigation; does not account for land ownership or legal zoning.',
    icon: <AlertCircle className="w-5 h-5 text-rose-500" />,
  },
  {
    id: 11,
    title: 'Explainable Decision Support',
    category: 'Decision Support',
    description: 'Generate transparent justification tags and policy recommendations grounded in zone-specific metrics.',
    input: 'Zone attribute vectors',
    output: 'Actionable policy briefings & reason chips',
    limitation: 'Provides guidance only. Ground truthing and community consultation are mandatory before implementation.',
    icon: <FileCheck2 className="w-5 h-5 text-emerald-700" />,
  },
];

export const PipelineDiagram: React.FC = () => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {steps.map((step, idx) => (
          <div
            key={step.id}
            className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs hover:border-slate-300 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="p-2 rounded-lg bg-slate-50 border border-slate-100 flex-shrink-0">
                  {step.icon}
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-mono font-bold text-slate-400">
                    STEP 0{step.id}
                  </span>
                  <span className="block text-[10px] uppercase font-semibold text-emerald-600">
                    {step.category}
                  </span>
                </div>
              </div>

              <h4 className="font-bold text-sm text-slate-900 leading-snug">
                {step.title}
              </h4>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                {step.description}
              </p>
            </div>

            <div className="mt-3 pt-2.5 border-t border-slate-100 space-y-1.5 text-[11px]">
              <div className="flex items-center justify-between text-slate-500">
                <span className="font-medium text-slate-400">Input:</span>
                <span className="font-mono text-slate-700 text-right truncate max-w-[170px]">
                  {step.input}
                </span>
              </div>
              <div className="flex items-center justify-between text-slate-500">
                <span className="font-medium text-slate-400">Output:</span>
                <span className="font-mono text-emerald-700 text-right truncate max-w-[170px]">
                  {step.output}
                </span>
              </div>
              <div className="bg-amber-500/10 rounded-md p-1.5 text-[10px] text-amber-900 border border-amber-500/20 leading-tight">
                <strong>Limitation:</strong> {step.limitation}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
