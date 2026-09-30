/**
 * Sentinel-2 Preprocessing & NDVI Processing Module
 * COPERNICUS/S2_SR_HARMONIZED
 * 
 * Formulas:
 * NDVI = (NIR - RED) / (NIR + RED)
 * NIR = B8 (842 nm)
 * RED = B4 (665 nm)
 */

export interface SentinelProcessingParams {
  geometry: {
    minLng: number;
    minLat: number;
    maxLng: number;
    maxLat: number;
  };
  startDate: string;
  endDate: string;
  cloudThreshold: number;
}

export interface NdviStats {
  mean: number;
  min: number;
  max: number;
  vegetationPixelPercent: number;
}

/**
 * Filters Sentinel-2 collection by date, geometry, and cloud fraction
 */
export function getSentinelCollection(params: SentinelProcessingParams) {
  // Collection identifier: COPERNICUS/S2_SR_HARMONIZED
  return {
    collection: 'COPERNICUS/S2_SR_HARMONIZED',
    geometry: params.geometry,
    dateRange: [params.startDate, params.endDate],
    cloudFilter: `CLOUDY_PIXEL_PERCENTAGE < ${params.cloudThreshold}`,
  };
}

/**
 * Cloud masking function using QA60 bitmask band
 * Bit 10: Opaque clouds
 * Bit 11: Cirrus clouds
 */
export function maskSentinelClouds(imageMetadata: any) {
  const QA60_OPAQUE_MASK = 1 << 10;
  const QA60_CIRRUS_MASK = 1 << 11;
  return {
    appliedMasks: [QA60_OPAQUE_MASK, QA60_CIRRUS_MASK],
    description: 'Masks pixels where QA60 bit 10 or bit 11 is set to 1.',
  };
}

/**
 * Computes temporal median composite across cloud-masked images
 */
export function createSentinelComposite(collection: any) {
  return {
    reducer: 'median',
    bands: ['B2', 'B3', 'B4', 'B8', 'QA60'],
    spatialResolutionM: 10,
  };
}

/**
 * Calculates Normalized Difference Vegetation Index
 * Formula: (B8 - B4) / (B8 + B4)
 */
export function calculateNDVI(b8Reflectance: number, b4Reflectance: number): number {
  if (b8Reflectance + b4Reflectance === 0) return 0;
  return (b8Reflectance - b4Reflectance) / (b8Reflectance + b4Reflectance);
}

/**
 * Returns color palette mapping for NDVI map tile visualization
 */
export function getNDVIVisualization() {
  return {
    min: 0.0,
    max: 0.8,
    palette: [
      '#7F1D1D', // Very Low / Bare
      '#F97316', // Low
      '#F4C95D', // Moderate
      '#34D399', // Healthy
      '#065F46', // Dense
    ],
  };
}
