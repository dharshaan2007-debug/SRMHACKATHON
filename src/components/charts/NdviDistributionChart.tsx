import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { AnalysisZone, GreenPatch } from '../../types/analysis';

interface NdviDistributionChartProps {
  zones: AnalysisZone[];
  patches: GreenPatch[];
}

export const NdviDistributionChart: React.FC<NdviDistributionChartProps> = ({
  zones,
  patches,
}) => {
  // Aggregate NDVI samples across zones & green space patches
  const bins = [
    { label: '< 0.20', description: 'Built / Bare / Minimal Vegetation', count: 0, color: '#DC2626' },
    { label: '0.20–0.35', description: 'Sparse Urban Greenery', count: 0, color: '#F97316' },
    { label: '0.35–0.50', description: 'Moderate Canopy / Lawns', count: 0, color: '#F4C95D' },
    { label: '0.50–0.65', description: 'Healthy Urban Woodland / Parks', count: 0, color: '#34D399' },
    { label: '> 0.65', description: 'Dense Botanical / Forest Core', count: 0, color: '#065F46' },
  ];

  zones.forEach((z) => {
    if (z.ndvi < 0.20) bins[0].count++;
    else if (z.ndvi < 0.35) bins[1].count++;
    else if (z.ndvi < 0.50) bins[2].count++;
    else if (z.ndvi < 0.65) bins[3].count++;
    else bins[4].count++;
  });

  patches.forEach((p) => {
    if (p.ndvi >= 0.65) bins[4].count++;
    else if (p.ndvi >= 0.50) bins[3].count++;
    else bins[2].count++;
  });

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between h-80">
      <div>
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
            NDVI Spectral Distribution
          </h3>
          <span className="text-[11px] text-slate-500 font-mono">Sentinel-2 MSI</span>
        </div>
        <p className="text-xs text-slate-500 mt-1">
          Frequency of zones & green patches across near-infrared/red reflectance bins.
        </p>
      </div>

      <div className="flex-1 w-full min-h-[190px] pt-3">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={bins} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <XAxis
              dataKey="label"
              tickLine={false}
              tick={{ fontSize: 10, fill: '#64748B' }}
            />
            <YAxis
              allowDecimals={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: '#64748B' }}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const d = payload[0].payload;
                  return (
                    <div className="bg-slate-900 text-white text-xs p-2.5 rounded-lg shadow-lg border border-slate-800 space-y-1">
                      <div className="font-semibold">NDVI Range: {d.label}</div>
                      <div className="text-emerald-400 font-mono font-bold">
                        {d.count} Sample Features
                      </div>
                      <div className="text-[10px] text-slate-400 border-t border-slate-800 pt-1">
                        Signal: {d.description}
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Bar dataKey="count" radius={[6, 6, 0, 0]}>
              {bins.map((entry, index) => (
                <Cell key={`ndvi-bin-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="text-[10px] text-slate-400 pt-2 border-t border-slate-100 flex items-center justify-between">
        <span>Formula: (B8 - B4) / (B8 + B4)</span>
        <span>Vegetation Signal Only</span>
      </div>
    </div>
  );
};
