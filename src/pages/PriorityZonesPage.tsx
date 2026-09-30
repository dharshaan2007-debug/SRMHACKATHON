import React, { useState, useMemo } from 'react';
import { useDashboardData } from '../hooks/useDashboardData';
import { AnalysisZone } from '../types/analysis';
import { SectionHeader } from '../components/common/SectionHeader';
import { Badge } from '../components/common/Badge';
import { DisclaimerBanner } from '../components/common/DisclaimerBanner';
import { ZoneDetailPanel } from '../components/map/ZoneDetailPanel';
import { formatDistance, formatPercent } from '../lib/formatting';
import {
  Search,
  Filter,
  Download,
  ArrowUpDown,
} from 'lucide-react';

export const PriorityZonesPage: React.FC = () => {
  const { zones, selectedZone, setSelectedZone } = useDashboardData();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClass, setSelectedClass] = useState<string>('All');
  const [sortAscending, setSortAscending] = useState(false);

  // Counts by priority class
  const counts = useMemo(() => {
    return {
      Critical: zones.filter((z: AnalysisZone) => z.priorityClass === 'Critical').length,
      High: zones.filter((z: AnalysisZone) => z.priorityClass === 'High').length,
      Medium: zones.filter((z: AnalysisZone) => z.priorityClass === 'Medium').length,
      Low: zones.filter((z: AnalysisZone) => z.priorityClass === 'Low').length,
    };
  }, [zones]);

  // Filtered and sorted zones
  const processedZones = useMemo(() => {
    return zones
      .filter((zone: AnalysisZone) => {
        const matchesClass =
          selectedClass === 'All' || zone.priorityClass === selectedClass;
        const matchesSearch =
          zone.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          zone.id.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesClass && matchesSearch;
      })
      .sort((a: AnalysisZone, b: AnalysisZone) => {
        return sortAscending
          ? a.priorityScore - b.priorityScore
          : b.priorityScore - a.priorityScore;
      });
  }, [zones, selectedClass, searchTerm, sortAscending]);

  // CSV export handler
  const handleExportCsv = () => {
    const headers = [
      'Rank',
      'Zone ID',
      'Zone Name',
      'Priority Score',
      'Priority Class',
      'GAI',
      'Built-up Density (%)',
      'Green Coverage (%)',
      'Nearest Green Space (m)',
      'Recommendation',
    ];

    const rows = processedZones.map((z: AnalysisZone, idx: number) => [
      idx + 1,
      `"${z.id}"`,
      `"${z.name}"`,
      z.priorityScore,
      `"${z.priorityClass}"`,
      z.greenAccessibilityIndex,
      z.builtUpDensityPercent,
      z.greenCoveragePercent,
      z.nearestGreenDistanceM,
      `"${z.recommendation.replace(/"/g, '""')}"`,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e: (string | number)[]) => e.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `greenaccess_priority_zones_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      <DisclaimerBanner compact={true} />

      <SectionHeader
        title="Candidate Intervention Priority Zones"
        subtitle="Ranked neighborhood evaluation identifying candidate areas combining severe green accessibility deficits, elevated built-up density, and canopy scarcity."
        action={
          <button
            onClick={handleExportCsv}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-50 transition shadow-2xs cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            Export CSV
          </button>
        }
      />

      {/* Priority Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        <div
          onClick={() => setSelectedClass(selectedClass === 'Critical' ? 'All' : 'Critical')}
          className={`p-4 rounded-xl border cursor-pointer transition select-none ${
            selectedClass === 'Critical'
              ? 'bg-rose-50 border-rose-400 ring-2 ring-rose-500'
              : 'bg-white border-slate-200 hover:border-rose-300'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-700">
              Critical Priority
            </span>
            <span className="w-2.5 h-2.5 rounded-full bg-rose-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-slate-900 mt-2">
            {counts.Critical}
          </div>
          <span className="text-[11px] text-slate-500 mt-0.5 block">
            Score 81–100 (Immediate evaluation)
          </span>
        </div>

        <div
          onClick={() => setSelectedClass(selectedClass === 'High' ? 'All' : 'High')}
          className={`p-4 rounded-xl border cursor-pointer transition select-none ${
            selectedClass === 'High'
              ? 'bg-amber-50 border-amber-400 ring-2 ring-amber-500'
              : 'bg-white border-slate-200 hover:border-amber-300'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700">
              High Priority
            </span>
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-slate-900 mt-2">
            {counts.High}
          </div>
          <span className="text-[11px] text-slate-500 mt-0.5 block">
            Score 61–80 (Secondary candidate)
          </span>
        </div>

        <div
          onClick={() => setSelectedClass(selectedClass === 'Medium' ? 'All' : 'Medium')}
          className={`p-4 rounded-xl border cursor-pointer transition select-none ${
            selectedClass === 'Medium'
              ? 'bg-yellow-50 border-yellow-400 ring-2 ring-yellow-500'
              : 'bg-white border-slate-200 hover:border-yellow-300'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-yellow-800">
              Medium Priority
            </span>
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-slate-900 mt-2">
            {counts.Medium}
          </div>
          <span className="text-[11px] text-slate-500 mt-0.5 block">
            Score 31–60 (Monitor corridors)
          </span>
        </div>

        <div
          onClick={() => setSelectedClass(selectedClass === 'Low' ? 'All' : 'Low')}
          className={`p-4 rounded-xl border cursor-pointer transition select-none ${
            selectedClass === 'Low'
              ? 'bg-emerald-50 border-emerald-400 ring-2 ring-emerald-500'
              : 'bg-white border-slate-200 hover:border-emerald-300'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
              Low Priority
            </span>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-slate-900 mt-2">
            {counts.Low}
          </div>
          <span className="text-[11px] text-slate-500 mt-0.5 block">
            Score 0–30 (Relatively accessible)
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-xl border border-slate-200 p-3 sm:p-4 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by zone ID or neighborhood name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <Filter className="w-3.5 h-3.5" />
            <span>Class:</span>
          </div>
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="rounded-lg border border-slate-300 text-xs py-1.5 px-2 bg-white text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
          >
            <option value="All">All Priority Classes ({zones.length})</option>
            <option value="Critical">Critical Only ({counts.Critical})</option>
            <option value="High">High Only ({counts.High})</option>
            <option value="Medium">Medium Only ({counts.Medium})</option>
            <option value="Low">Low Only ({counts.Low})</option>
          </select>

          <button
            onClick={() => setSortAscending(!sortAscending)}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-300 text-xs text-slate-700 hover:bg-slate-50 transition cursor-pointer"
            title="Toggle sort direction"
          >
            <ArrowUpDown className="w-3.5 h-3.5" />
            <span>{sortAscending ? 'Lowest Score' : 'Highest Score'}</span>
          </button>
        </div>
      </div>

      {/* Main Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#0B1F33] text-white uppercase text-[10px] font-bold tracking-wider">
              <tr>
                <th className="py-3 px-3 text-center">Rank</th>
                <th className="py-3 px-3">Zone ID</th>
                <th className="py-3 px-4">Neighborhood Zone</th>
                <th className="py-3 px-3 text-center">Priority</th>
                <th className="py-3 px-3 text-center">Score</th>
                <th className="py-3 px-3 text-center">GAI</th>
                <th className="py-3 px-3 text-center">Built-up</th>
                <th className="py-3 px-3 text-center">Green Cov</th>
                <th className="py-3 px-3 text-center">Nearest Park</th>
                <th className="py-3 px-4">Decision Recommendation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {processedZones.length > 0 ? (
                processedZones.map((zone: AnalysisZone, idx: number) => {
                  const priorityVariant = {
                    Critical: 'danger',
                    High: 'warning',
                    Medium: 'warning',
                    Low: 'success',
                  }[zone.priorityClass] as 'danger' | 'warning' | 'success';

                  const isSelected = selectedZone?.id === zone.id;

                  return (
                    <tr
                      key={zone.id}
                      onClick={() => setSelectedZone(zone)}
                      className={`cursor-pointer transition-colors ${
                        isSelected
                          ? 'bg-emerald-50/70 border-l-4 border-l-emerald-600'
                          : 'hover:bg-slate-50'
                      }`}
                    >
                      <td className="py-3 px-3 text-center font-mono font-bold text-slate-400">
                        {idx + 1}
                      </td>
                      <td className="py-3 px-3 font-mono font-bold text-slate-900 whitespace-nowrap">
                        {zone.id}
                      </td>
                      <td className="py-3 px-4 font-semibold text-slate-900 whitespace-nowrap">
                        {zone.name}
                      </td>
                      <td className="py-3 px-3 text-center">
                        <Badge variant={priorityVariant} size="sm">
                          {zone.priorityClass}
                        </Badge>
                      </td>
                      <td className="py-3 px-3 text-center font-mono font-bold text-slate-900">
                        {zone.priorityScore}
                      </td>
                      <td className="py-3 px-3 text-center font-mono font-semibold text-slate-700">
                        {zone.greenAccessibilityIndex}
                      </td>
                      <td className="py-3 px-3 text-center font-mono text-slate-600">
                        {formatPercent(zone.builtUpDensityPercent)}
                      </td>
                      <td className="py-3 px-3 text-center font-mono text-slate-600">
                        {formatPercent(zone.greenCoveragePercent)}
                      </td>
                      <td className="py-3 px-3 text-center font-mono text-slate-600 whitespace-nowrap">
                        {formatDistance(zone.nearestGreenDistanceM)}
                      </td>
                      <td className="py-3 px-4 max-w-sm truncate text-slate-600">
                        {zone.recommendation}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={10} className="py-8 text-center text-slate-400">
                    No neighborhood zones match the selected criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Selected Zone Slideout / Modal Inspector */}
      {selectedZone && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div className="relative w-full max-w-md">
            <ZoneDetailPanel
              zone={selectedZone}
              onClose={() => setSelectedZone(null)}
            />
          </div>
        </div>
      )}
    </div>
  );
};
