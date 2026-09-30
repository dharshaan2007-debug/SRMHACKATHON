import React from 'react';
import { Database, ExternalLink } from 'lucide-react';

export const DatasetTable: React.FC = () => {
  const datasets = [
    {
      name: 'Sentinel-2 MSI Level-2A',
      provider: 'European Space Agency (ESA) / Copernicus',
      assetId: 'COPERNICUS/S2_SR_HARMONIZED',
      resolution: '10 meters (B2, B3, B4, B8)',
      frequency: '5-day constellation revisit',
      purpose: 'Surface reflectance, QA60 cloud bitmasking, NDVI calculation, and annual median composite generation.',
      processingNotes: 'Cloud filtering < 20%, median reduction over 2024 calendar stack, NDVI threshold >= 0.35.',
    },
    {
      name: 'Dynamic World V1',
      provider: 'World Resources Institute (WRI) & Google',
      assetId: 'GOOGLE/DYNAMICWORLD/V1',
      resolution: '10 meters near real-time',
      frequency: 'Synchronized with Sentinel-2 L2A',
      purpose: 'Near real-time 9-class land use and land cover probabilities (built, trees, grass, crops, water, bare).',
      processingNotes: 'Built-up probability extraction used for neighborhood building density index.',
    },
    {
      name: 'OpenStreetMap (OSM)',
      provider: 'OpenStreetMap Community Contributors',
      assetId: 'Planet OSM / Overpass API',
      resolution: 'Vector geometries (Points / Polylines)',
      frequency: 'Continuous community updates',
      purpose: 'Contextual road networks, administrative boundaries, and cartographic baseline reference.',
      processingNotes: 'Used for study area boundary delineation and contextual cartographic tile overlay.',
    },
  ];

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
      <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Database className="w-4 h-4 text-emerald-600" />
          <h3 className="font-bold text-sm text-slate-900 uppercase tracking-wider">
            Satellite & Earth Observation Data Provenance
          </h3>
        </div>
        <span className="text-xs text-slate-500 font-mono">3 Core Feeds</span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 text-slate-600 uppercase text-[10px] font-bold border-b border-slate-200">
            <tr>
              <th className="py-3 px-4">Dataset Product</th>
              <th className="py-3 px-4">Provider / Asset</th>
              <th className="py-3 px-4">Resolution</th>
              <th className="py-3 px-4">Operational Purpose</th>
              <th className="py-3 px-4">Preprocessing Pipeline</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700">
            {datasets.map((d) => (
              <tr key={d.name} className="hover:bg-slate-50/70 transition">
                <td className="py-3.5 px-4 font-bold text-slate-900 whitespace-nowrap">
                  {d.name}
                </td>
                <td className="py-3.5 px-4">
                  <div className="font-medium text-slate-800">{d.provider}</div>
                  <div className="font-mono text-[10px] text-slate-400 mt-0.5">{d.assetId}</div>
                </td>
                <td className="py-3.5 px-4 font-mono text-[11px] whitespace-nowrap text-slate-600">
                  {d.resolution}
                </td>
                <td className="py-3.5 px-4 leading-relaxed max-w-xs">
                  {d.purpose}
                </td>
                <td className="py-3.5 px-4 leading-relaxed text-slate-600 max-w-xs">
                  {d.processingNotes}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
