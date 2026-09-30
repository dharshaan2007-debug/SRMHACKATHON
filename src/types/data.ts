import { DashboardStatistics, GreenPatch, AnalysisZone, DataMode } from './analysis';

export interface ProcessingMetadata {
  dataMode: DataMode;
  sourceDataset: string;
  satelliteSensor: string;
  landCoverProduct: string;
  dateRange: {
    start: string;
    end: string;
  };
  cloudFilterPercent: number;
  spatialResolutionM: number;
  processedTimestamp: string;
  modelVersion: string;
  studyAreaId: string;
  isFallback: boolean;
  provenanceNote: string;
}

export interface RasterLayerConfig {
  id: string;
  name: string;
  urlTemplate?: string;
  tileUrl?: string;
  opacity: number;
  visible: boolean;
  legendType: string;
  attribution: string;
}

export interface GeospatialDataProvider {
  getDashboardStatistics(): Promise<DashboardStatistics>;
  getGreenPatches(): Promise<GreenPatch[]>;
  getAnalysisZones(): Promise<AnalysisZone[]>;
  getRasterLayerConfig(layer: string): Promise<RasterLayerConfig>;
  getProcessingMetadata(): Promise<ProcessingMetadata>;
}
