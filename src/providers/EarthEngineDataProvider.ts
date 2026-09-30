import { GeospatialDataProvider, ProcessingMetadata, RasterLayerConfig } from '../types/data';
import { AnalysisZone, DashboardStatistics, GreenPatch } from '../types/analysis';
import { DemoDataProvider } from './DemoDataProvider';

export class EarthEngineDataProvider implements GeospatialDataProvider {
  private fallbackProvider: DemoDataProvider;
  private apiBaseUrl: string;

  constructor(apiBaseUrl?: string) {
    this.fallbackProvider = new DemoDataProvider();
    this.apiBaseUrl = apiBaseUrl || import.meta.env.VITE_EE_API_URL || '/api';
  }

  async getDashboardStatistics(): Promise<DashboardStatistics> {
    try {
      const response = await fetch(`${this.apiBaseUrl}/analysis/statistics`, {
        signal: AbortSignal.timeout(3000),
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return await response.json();
    } catch {
      // Graceful fallback to demo provider without crashing
      return this.fallbackProvider.getDashboardStatistics();
    }
  }

  async getGreenPatches(): Promise<GreenPatch[]> {
    try {
      const response = await fetch(`${this.apiBaseUrl}/analysis/green-patches`, {
        signal: AbortSignal.timeout(3000),
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return await response.json();
    } catch {
      return this.fallbackProvider.getGreenPatches();
    }
  }

  async getAnalysisZones(): Promise<AnalysisZone[]> {
    try {
      const response = await fetch(`${this.apiBaseUrl}/analysis/zones`, {
        signal: AbortSignal.timeout(3000),
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return await response.json();
    } catch {
      return this.fallbackProvider.getAnalysisZones();
    }
  }

  async getRasterLayerConfig(layer: string): Promise<RasterLayerConfig> {
    try {
      const response = await fetch(`${this.apiBaseUrl}/analysis/layers/${layer}`, {
        signal: AbortSignal.timeout(3000),
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return await response.json();
    } catch {
      return this.fallbackProvider.getRasterLayerConfig(layer);
    }
  }

  async getProcessingMetadata(): Promise<ProcessingMetadata> {
    try {
      const response = await fetch(`${this.apiBaseUrl}/analysis/metadata`, {
        signal: AbortSignal.timeout(3000),
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return await response.json();
    } catch {
      const demoMeta = await this.fallbackProvider.getProcessingMetadata();
      return {
        ...demoMeta,
        isFallback: true,
        provenanceNote: 'Earth Engine API offline or unconfigured. Safely operating in Demo Fallback Mode with synthetic baseline.',
      };
    }
  }
}
