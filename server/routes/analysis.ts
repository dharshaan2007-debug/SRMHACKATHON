/**
 * Backend Express Analysis API Route Scaffold
 * Exposes endpoints consumed by EarthEngineDataProvider
 * 
 * Endpoints:
 * GET /api/analysis/statistics
 * GET /api/analysis/green-patches
 * GET /api/analysis/zones
 * GET /api/analysis/metadata
 * GET /api/analysis/layers/:layer
 */

export interface AnalysisRouteHandler {
  getStatistics: () => Promise<any>;
  getGreenPatches: () => Promise<any>;
  getZones: () => Promise<any>;
  getMetadata: () => Promise<any>;
}

export const analysisRouteContract = {
  version: '1.0.0',
  endpoints: [
    { method: 'GET', path: '/api/analysis/statistics', description: 'Returns aggregate dashboard statistics' },
    { method: 'GET', path: '/api/analysis/green-patches', description: 'Returns GeoJSON FeatureCollection of green patches' },
    { method: 'GET', path: '/api/analysis/zones', description: 'Returns GeoJSON FeatureCollection of analyzed zones' },
    { method: 'GET', path: '/api/analysis/metadata', description: 'Returns processing metadata and pipeline status' },
    { method: 'GET', path: '/api/analysis/layers/:layer', description: 'Returns tile URL template and layer configurations' },
  ],
};
