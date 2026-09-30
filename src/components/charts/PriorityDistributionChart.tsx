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

interface PriorityDistributionChartProps {
  zones: AnalysisZone[];
}

export const PriorityDistributionChart: React.FC<PriorityDistributionChartProps> = ({
  zones,
}) => {
  const counts = {
    Low: 0,
    Medium: 0,
    High: 0,
    Critical: 0,
  };

  zones.forEach((z) => {
    if (counts[z.priorityClass] !== undefined) {
      counts[z.priorityClass]++;
    }
  });

  const data = [
    {
      category: 'Low',
      count: counts.Low,
      color: colorPalette.priority.Low,
      range: 'Score 0–30',
    },
    {
      category: 'Medium',
      count: counts.Medium,
      color: colorPalette.priority.Medium,
      range: 'Score 31–60',
    },
    {
      category: 'High',
      count: counts.High,
      color: colorPalette.priority.High,
      range: 'Score 61–80',
    },
    {
      category: 'Critical',
      count: counts.Critical,
      color: colorPalette.priority.Critical,
      range: 'Score 81–100',
    },
  ];

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between h-80">
      <div>
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
            Intervention Priority Distribution
          </h3>
          <span className="text-[11px] text-slate-500 font-mono">
            {counts.High + counts.Critical} High/Critical
          </span>
        </div>
        <p className="text-xs text-slate-500 mt-1">
          Candidate zones prioritized by accessibility deficit, urban built density, and tree canopy scarcity.
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
                      <div className="font-semibold">{d.category} Priority Zone</div>
                      <div className="text-amber-400 font-mono font-bold">
                        {d.count} Zones ({((d.count / zones.length) * 100).toFixed(0)}%)
                      </div>
                      <div className="text-[10px] text-slate-400 border-t border-slate-800 pt-1">
                        Range: {d.range}
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
        <span>Deficit weights: Acc 40%, Built 30%, Veg 20%, Dist 10%</span>
        <span>Candidate Zones</span>
      </div>
    </div>
  );
};
