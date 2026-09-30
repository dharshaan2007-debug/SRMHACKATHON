import { GeospatialDataProvider, ProcessingMetadata, RasterLayerConfig } from '../types/data';
import { AnalysisZone, DashboardStatistics, GreenPatch } from '../types/analysis';
import {
  DEMO_ANALYSIS_ZONES,
  DEMO_GREEN_PATCHES,
  DEMO_PROCESSING_METADATA,
  getDemoStatistics,
} from '../data/demoData';

export class DemoDataProvider implements GeospatialDataProvider {
  async getDashboardStatistics(): Promise<DashboardStatistics> {
    // Deterministic simulation
    return getDemoStatistics();
  }

  async getGreenPatches(): Promise<GreenPatch[]> {
    return DEMO_GREEN_PATCHES;
  }

  async getAnalysisZones(): Promise<AnalysisZone[]> {
    return DEMO_ANALYSIS_ZONES;
  }

  async getRasterLayerConfig(layer: string): Promise<RasterLayerConfig> {
    const configs: Record<string, RasterLayerConfig> = {
      ndvi: {
        id: 'ndvi',
        name: 'NDVI (Normalized Difference Vegetation Index)',
        opacity: 0.65,
        visible: true,
        legendType: 'continuous-ndvi',
        attribution: 'Sentinel-2 MSI Synthetic Baseline | Demo Mode',
      },
      builtUp: {
        id: 'builtUp',
        name: 'Built-up Context (Dynamic World)',
        opacity: 0.55,
        visible: true,
        legendType: 'density-builtup',
        attribution: 'Dynamic World V1 Synthetic Context | Demo Mode',
      },
      accessibility: {
        id: 'accessibility',
        name: 'Distance to Meaningful Green Space',
        opacity: 0.6,
        visible: true,
        legendType: 'discrete-accessibility',
        attribution: 'GreenAccess Distance Buffer Model',
      },
      priorityZones: {
        id: 'priorityZones',
        name: 'Candidate Intervention Priority Zones',
        opacity: 0.7,
        visible: true,
        legendType: 'discrete-priority',
        attribution: 'GreenAccess Decision Support Model',
      },
    };

    return configs[layer] || {
      id: layer,
      name: layer,
      opacity: 0.5,
      visible: true,
      legendType: 'default',
      attribution: 'GreenAccess AI Demo Dataset',
    };
  }

  async getProcessingMetadata(): Promise<ProcessingMetadata> {
    return DEMO_PROCESSING_METADATA;
  }
}
