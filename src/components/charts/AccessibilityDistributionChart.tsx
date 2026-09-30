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
import { AnalysisZone } from '../../types/analysis';
import { colorPalette } from '../../config/thresholds';

interface AccessibilityDistributionChartProps {
  zones: AnalysisZone[];
}

export const AccessibilityDistributionChart: React.FC<AccessibilityDistributionChartProps> = ({
  zones,
}) => {
  const counts = {
    Excellent: 0,
    Good: 0,
    Moderate: 0,
    Poor: 0,
  };

  zones.forEach((z) => {
    if (counts[z.accessibilityClass] !== undefined) {
      counts[z.accessibilityClass]++;
    }
  });

  const data = [
    {
      category: 'Excellent',
      count: counts.Excellent,
      color: colorPalette.accessibility.Excellent,
      threshold: '<= 250m & GAI >= 75',
    },
    {
      category: 'Good',
      count: counts.Good,
      color: colorPalette.accessibility.Good,
      threshold: 'GAI 61-100',
    },
    {
      category: 'Moderate',
      count: counts.Moderate,
      color: colorPalette.accessibility.Moderate,
      threshold: 'GAI 31-60',
    },
    {
      category: 'Poor',
      count: counts.Poor,
      color: colorPalette.accessibility.Poor,
      threshold: 'GAI 0-30 or >1km dist',
    },
  ];

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between h-80">
      <div>
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
            Green Accessibility (GAI) Distribution
          </h3>
          <span className="text-[11px] text-slate-500 font-mono">18 Zones</span>
        </div>
        <p className="text-xs text-slate-500 mt-1">
          Zone distribution categorized by the multi-criteria Green Accessibility Index.
        </p>
      </div>

      <div className="flex-1 w-full min-h-[190px] pt-3">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <XAxis
              dataKey="category"
              tickLine={false}
              tick={{ fontSize: 11, fill: '#64748B' }}
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
                      <div className="font-semibold">{d.category} Accessibility</div>
                      <div className="text-emerald-400 font-mono font-bold">
                        {d.count} Zones ({((d.count / zones.length) * 100).toFixed(0)}%)
                      </div>
                      <div className="text-[10px] text-slate-400 border-t border-slate-800 pt-1">
                        Criteria: {d.threshold}
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Bar dataKey="count" radius={[6, 6, 0, 0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="text-[10px] text-slate-400 pt-2 border-t border-slate-100 flex items-center justify-between">
        <span>Model: GAI (Distance 50%, Coverage 30%, Density 20%)</span>
        <span>Prototype Output</span>
      </div>
    </div>
  );
};
