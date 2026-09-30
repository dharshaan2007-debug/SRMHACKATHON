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

interface GreenCoverageChartProps {
  zones: AnalysisZone[];
}

export const GreenCoverageChart: React.FC<GreenCoverageChartProps> = ({ zones }) => {
  // Sort zones ascending by green coverage to highlight deficient zones first
  const sorted = [...zones]
    .sort((a, b) => a.greenCoveragePercent - b.greenCoveragePercent)
    .slice(0, 10)
    .map((z) => ({
      name: z.name.split('/')[0].trim(),
      coverage: z.greenCoveragePercent,
      builtUp: z.builtUpDensityPercent,
      id: z.id,
      priority: z.priorityClass,
    }));

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between h-80">
      <div>
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
            Lowest Green Coverage Zones
          </h3>
          <span className="text-[11px] text-rose-600 font-semibold font-mono">
            Deficit Ranking (Bottom 10)
          </span>
        </div>
        <p className="text-xs text-slate-500 mt-1">
          Zones exhibiting the lowest proportion of canopy and vegetative cover.
        </p>
      </div>

      <div className="flex-1 w-full min-h-[190px] pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={sorted}
            layout="vertical"
            margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
          >
            <XAxis
              type="number"
              domain={[0, 30]}
              tick={{ fontSize: 10, fill: '#64748B' }}
              tickFormatter={(v) => `${v}%`}
            />
            <YAxis
              type="category"
              dataKey="name"
              width={90}
              tickLine={false}
              tick={{ fontSize: 10, fill: '#334155' }}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const d = payload[0].payload;
                  return (
                    <div className="bg-slate-900 text-white text-xs p-2.5 rounded-lg shadow-lg border border-slate-800 space-y-1">
                      <div className="font-semibold text-emerald-300">
                        {d.id}: {d.name}
                      </div>
                      <div>Green Coverage: <span className="font-mono font-bold text-amber-400">{d.coverage}%</span></div>
                      <div>Built-up Density: <span className="font-mono text-blue-300">{d.builtUp}%</span></div>
                      <div className="text-[10px] text-slate-400 pt-1 border-t border-slate-800">
                        Priority Level: {d.priority}
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Bar dataKey="coverage" radius={[0, 4, 4, 0]}>
              {sorted.map((entry, index) => (
                <Cell
                  key={`cell-bar-${index}`}
                  fill={entry.coverage < 8 ? '#DC2626' : entry.coverage < 15 ? '#F97316' : '#10B981'}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="text-[10px] text-slate-400 pt-2 border-t border-slate-100 flex items-center justify-between">
        <span>Red: &lt;8% | Orange: 8–15% | Green: &gt;15%</span>
        <span>Benchmarked against 30% target</span>
      </div>
    </div>
  );
};
