export type DataMode = 'demo' | 'earth-engine';

export type AccessibilityClass = 'Excellent' | 'Good' | 'Moderate' | 'Poor';

export type PriorityClass = 'Low' | 'Medium' | 'High' | 'Critical';

export interface GeoJsonGeometry {
  type: 'Polygon' | 'MultiPolygon' | 'Point';
  coordinates: number[][][] | number[][][][] | number[];
}

export interface GeoJsonFeature<P = Record<string, unknown>> {
  type: 'Feature';
  id?: string | number;
  properties: P;
  geometry: GeoJsonGeometry;
}

export interface GreenPatch {
  id: string;
  name: string;
  areaM2: number;
  centroid: [number, number]; // [lat, lng]
  ndvi: number;
  source: 'satellite-derived';
  publicAccessVerified: boolean;
  geometry: GeoJsonFeature<{
    id: string;
    name: string;
    areaM2: number;
    ndvi: number;
  }>;
}

export interface AnalysisZone {
  id: string;
  name: string;
  geometry: GeoJsonFeature<{
    id: string;
    name: string;
    priorityClass: PriorityClass;
    accessibilityClass: AccessibilityClass;
  }>;
  ndvi: number;
  greenCoveragePercent: number;
  greenAreaM2: number;
  nearestGreenDistanceM: number;
  builtUpDensityPercent: number;
  localGreenDensity: number;
  distanceScore: number;
  greenCoverageScore: number;
  greenDensityScore: number;
  greenAccessibilityIndex: number;
  accessibilityClass: AccessibilityClass;
  accessibilityDeficit: number;
  vegetationDeficit: number;
  distanceFactor: number;
  priorityScore: number;
  priorityClass: PriorityClass;
  recommendation: string;
  reasons: string[];
}

export interface DashboardStatistics {
  totalGreenAreaM2: number;
  greenPatchCount: number;
  averagePatchAreaM2: number;
  largestPatchAreaM2: number;
  greenCoveragePercent: number;
  poorAccessAreaM2: number;
  averageAccessibilityIndex: number;
  priorityZoneCount: number;
  studyAreaTotalM2: number;
}
