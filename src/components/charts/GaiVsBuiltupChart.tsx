import React from 'react';
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { AnalysisZone } from '../../types/analysis';
import { colorPalette } from '../../config/thresholds';

interface GaiVsBuiltupChartProps {
  zones: AnalysisZone[];
}

export const GaiVsBuiltupChart: React.FC<GaiVsBuiltupChartProps> = ({ zones }) => {
  const data = zones.map((z) => ({
    id: z.id,
    name: z.name,
    gai: z.greenAccessibilityIndex,
    builtUp: z.builtUpDensityPercent,
    priority: z.priorityClass,
    color: colorPalette.priority[z.priorityClass],
  }));

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between h-80">
      <div>
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
            GAI vs. Built-up Density Correlation
          </h3>
          <span className="text-[11px] text-slate-500 font-mono">18 Zones</span>
        </div>
        <p className="text-xs text-slate-500 mt-1">
          High built-up density coupled with low GAI indicates acute urban park deficits.
        </p>
      </div>

      <div className="flex-1 w-full min-h-[190px] pt-3">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 10, right: 20, bottom: 10, left: -15 }}>
            <XAxis
              type="number"
              dataKey="builtUp"
              name="Built-up Density"
              unit="%"
              domain={[50, 100]}
              tick={{ fontSize: 10, fill: '#64748B' }}
            />
            <YAxis
              type="number"
              dataKey="gai"
              name="GAI"
              domain={[0, 100]}
              tick={{ fontSize: 10, fill: '#64748B' }}
            />
            <ZAxis range={[70, 70]} />
            <Tooltip
              cursor={{ strokeDasharray: '3 3' }}
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const d = payload[0].payload;
                  return (
                    <div className="bg-slate-900 text-white text-xs p-2.5 rounded-lg shadow-lg border border-slate-800 space-y-1">
                      <div className="font-semibold text-emerald-300">
                        {d.id}: {d.name}
                      </div>
                      <div>Built-up Density: <span className="font-mono text-blue-300">{d.builtUp}%</span></div>
                      <div>Green Accessibility (GAI): <span className="font-mono text-amber-300">{d.gai} / 100</span></div>
                      <div className="text-[10px] text-slate-400 pt-1 border-t border-slate-800">
                        Priority Level: {d.priority}
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Scatter name="Zones" data={data}>
              {data.map((entry, index) => (
                <Cell key={`cell-scatter-${index}`} fill={entry.color} />
              ))}
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
      </div>

      <div className="text-[10px] text-slate-400 pt-2 border-t border-slate-100 flex items-center justify-between">
        <span>X: Built-up Density (%) | Y: Green Accessibility Index (0–100)</span>
        <span>Colored by Priority Class</span>
      </div>
    </div>
  );
};
