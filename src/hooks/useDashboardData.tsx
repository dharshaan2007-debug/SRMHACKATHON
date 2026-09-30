import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { AnalysisZone, DashboardStatistics, DataMode, GreenPatch } from '../types/analysis';
import { MapLayerState } from '../types/map';
import { ProcessingMetadata } from '../types/data';
import { getDataProvider } from '../providers/providerFactory';

interface DashboardContextType {
  dataMode: DataMode;
  setDataMode: (mode: DataMode) => void;
  statistics: DashboardStatistics | null;
  greenPatches: GreenPatch[];
  zones: AnalysisZone[];
  metadata: ProcessingMetadata | null;
  loading: boolean;
  statusMessage: string;
  error: string | null;
  selectedZone: AnalysisZone | null;
  setSelectedZone: (zone: AnalysisZone | null) => void;
  layerState: MapLayerState;
  toggleLayer: (layer: keyof MapLayerState) => void;
  setLayerState: React.Dispatch<React.SetStateAction<MapLayerState>>;
  refreshData: () => Promise<void>;
}

const initialLayerState: MapLayerState = {
  ndvi: false,
  greenSpaces: true,
  builtUp: false,
  accessibility: true,
  priorityZones: true,
  boundary: true,
};

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export const DashboardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [dataMode, setDataMode] = useState<DataMode>('demo');
  const [statistics, setStatistics] = useState<DashboardStatistics | null>(null);
  const [greenPatches, setGreenPatches] = useState<GreenPatch[]>([]);
  const [zones, setZones] = useState<AnalysisZone[]>([]);
  const [metadata, setMetadata] = useState<ProcessingMetadata | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [statusMessage, setStatusMessage] = useState<string>('Initializing data provider');
  const [error, setError] = useState<string | null>(null);
  const [selectedZone, setSelectedZone] = useState<AnalysisZone | null>(null);
  const [layerState, setLayerState] = useState<MapLayerState>(initialLayerState);

  const toggleLayer = useCallback((layer: keyof MapLayerState) => {
    setLayerState((prev) => ({
      ...prev,
      [layer]: !prev[layer],
    }));
  }, []);

  const loadData = useCallback(async (mode: DataMode) => {
    setLoading(true);
    setError(null);
    try {
      setStatusMessage('Initializing data provider...');
      const provider = getDataProvider(mode);

      setStatusMessage('Loading study area and green patches...');
      const patches = await provider.getGreenPatches();
      setGreenPatches(patches);

      setStatusMessage('Loading analysis zones and calculating accessibility metrics...');
      const analysisZones = await provider.getAnalysisZones();
      setZones(analysisZones);

      setStatusMessage('Calculating dashboard statistics...');
      const stats = await provider.getDashboardStatistics();
      setStatistics(stats);

      setStatusMessage('Finalizing metadata & raster configuration...');
      const meta = await provider.getProcessingMetadata();
      setMetadata(meta);

      setStatusMessage('Ready');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Unknown data loading error';
      setError(msg);
      setStatusMessage('Error encountered');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData(dataMode);
  }, [dataMode, loadData]);

  const refreshData = async () => {
    await loadData(dataMode);
  };

  return (
    <DashboardContext.Provider
      value={{
        dataMode,
        setDataMode,
        statistics,
        greenPatches,
        zones,
        metadata,
        loading,
        statusMessage,
        error,
        selectedZone,
        setSelectedZone,
        layerState,
        toggleLayer,
        setLayerState,
        refreshData,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export function useDashboardData(): DashboardContextType {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('useDashboardData must be used within a DashboardProvider');
  }
  return context;
}
