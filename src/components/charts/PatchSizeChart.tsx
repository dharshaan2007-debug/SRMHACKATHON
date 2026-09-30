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
import { GreenPatch } from '../../types/analysis';

interface PatchSizeChartProps {
  patches: GreenPatch[];
}

export const PatchSizeChart: React.FC<PatchSizeChartProps> = ({ patches }) => {
  // Sort patches descending by area in hectares
  const data = [...patches]
    .sort((a, b) => b.areaM2 - a.areaM2)
    .map((p) => ({
      name: p.name.split(' ')[0],
      fullName: p.name,
      areaHa: Number((p.areaM2 / 10000).toFixed(1)),
      ndvi: p.ndvi,
      verified: p.publicAccessVerified,
    }));

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between h-80">
      <div>
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
            Green Space Patch Scale
          </h3>
          <span className="text-[11px] text-slate-500 font-mono">10 Key Patches</span>
        </div>
        <p className="text-xs text-slate-500 mt-1">
          Hectares of contiguous vegetation identified above the 2,500 m² analytical filter.
        </p>
      </div>

      <div className="flex-1 w-full min-h-[190px] pt-3">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 25 }}>
            <XAxis
              dataKey="name"
              interval={0}
              angle={-25}
              textAnchor="end"
              tick={{ fontSize: 9, fill: '#64748B' }}
            />
            <YAxis
              unit=" ha"
              tickLine={false}
              tick={{ fontSize: 10, fill: '#64748B' }}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const d = payload[0].payload;
                  return (
                    <div className="bg-slate-900 text-white text-xs p-2.5 rounded-lg shadow-lg border border-slate-800 space-y-1">
                      <div className="font-semibold text-emerald-300">{d.fullName}</div>
                      <div>Area: <span className="font-mono font-bold text-white">{d.areaHa} hectares</span></div>
                      <div>NDVI: <span className="font-mono text-emerald-400">{d.ndvi}</span></div>
                      <div className="text-[10px] text-slate-400 pt-1 border-t border-slate-800">
                        {d.verified ? 'Verified Public Space' : 'Unverified Public Access'}
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Bar dataKey="areaHa" radius={[6, 6, 0, 0]}>
              {data.map((_, index) => (
                <Cell key={`patch-cell-${index}`} fill="#059669" />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="text-[10px] text-slate-400 pt-2 border-t border-slate-100 flex items-center justify-between">
        <span>Minimum Filter: 2,500 m² (0.25 ha)</span>
        <span>Satellite-Derived Extraction</span>
      </div>
    </div>
  );
};
