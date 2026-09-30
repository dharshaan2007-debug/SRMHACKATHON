/**
 * Green Space Extraction & Spatial Filtering Module
 */

export interface GreenSpaceExtractionParams {
  ndviThreshold: number;
  minPatchAreaM2: number;
  excludedClasses: string[];
}

export function extractGreenPatches(params: GreenSpaceExtractionParams) {
  return {
    ndviThreshold: params.ndviThreshold || 0.35,
    minAreaM2: params.minPatchAreaM2 || 2500,
    connectedPixelConnectivity: 8,
    disclaimer: 'Satellite-derived green patch — public accessibility not verified.',
  };
}
