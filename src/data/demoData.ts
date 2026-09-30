import { AnalysisZone, GreenPatch, DashboardStatistics } from '../types/analysis';
import { ProcessingMetadata } from '../types/data';
import { RAW_DEMO_PATCHES, RAW_DEMO_ZONES } from './demoGeoJson';
import {
  calculateDistanceScore,
  calculateGreenCoverageScore,
  calculateGreenDensityScore,
  calculateGreenAccessibilityIndex,
  classifyAccessibility,
  calculateAccessibilityDeficit,
  calculateVegetationDeficit,
  calculateDistanceFactor,
  calculatePriorityScore,
  classifyPriority,
} from '../lib/calculations';
import { generateRecommendation } from '../lib/recommendations';

/**
 * Haversine formula to compute great-circle distance between two [lat, lng] coordinates in meters
 */
export function calculateHaversineDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371000; // Earth radius in meters
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c);
}

// Convert RAW_DEMO_PATCHES to GreenPatch objects
export const DEMO_GREEN_PATCHES: GreenPatch[] = RAW_DEMO_PATCHES.map((patch) => ({
  id: patch.id,
  name: patch.name,
  areaM2: patch.areaM2,
  centroid: patch.centroid,
  ndvi: patch.ndvi,
  source: 'satellite-derived' as const,
  publicAccessVerified: patch.publicAccessVerified,
  geometry: {
    type: 'Feature',
    id: patch.id,
    properties: {
      id: patch.id,
      name: patch.name,
      areaM2: patch.areaM2,
      ndvi: patch.ndvi,
    },
    geometry: {
      type: 'Polygon',
      coordinates: patch.coordinates,
    },
  },
}));

// Process RAW_DEMO_ZONES using reproducible GIS formulas
export const DEMO_ANALYSIS_ZONES: AnalysisZone[] = RAW_DEMO_ZONES.map((zone) => {
  // Find nearest green patch (only considering public verified or candidate patches)
  let minDistance = Infinity;
  for (const patch of DEMO_GREEN_PATCHES) {
    const dist = calculateHaversineDistance(
      zone.centroid[0],
      zone.centroid[1],
      patch.centroid[0],
      patch.centroid[1]
    );
    if (dist < minDistance) {
      minDistance = dist;
    }
  }

  const nearestGreenDistanceM = minDistance;
  const localGreenDensity = zone.greenCoveragePercent / 100;
  const greenAreaM2 = Math.round((zone.areaKm2 * 1000000) * (zone.greenCoveragePercent / 100));

  // Step 1: Distance & component scores
  const distanceScore = calculateDistanceScore(nearestGreenDistanceM);
  const greenCoverageScore = calculateGreenCoverageScore(zone.greenCoveragePercent);
  const greenDensityScore = calculateGreenDensityScore(localGreenDensity);

  // Step 2: Green Accessibility Index
  const greenAccessibilityIndex = calculateGreenAccessibilityIndex(
    distanceScore,
    greenCoverageScore,
    greenDensityScore
  );
  const accessibilityClass = classifyAccessibility(greenAccessibilityIndex, nearestGreenDistanceM);

  // Step 3: Deficits and Priority Model
  const accessibilityDeficit = calculateAccessibilityDeficit(greenAccessibilityIndex);
  const vegetationDeficit = calculateVegetationDeficit(zone.greenCoveragePercent);
  const distanceFactor = calculateDistanceFactor(nearestGreenDistanceM);

  const priorityScore = calculatePriorityScore(
    accessibilityDeficit,
    zone.builtUpDensityPercent,
    vegetationDeficit,
    distanceFactor
  );
  const priorityClass = classifyPriority(priorityScore);

  // Step 4: Explainable recommendation
  const { recommendation, reasons } = generateRecommendation(
    zone.id,
    zone.name,
    priorityClass,
    greenAccessibilityIndex,
    zone.builtUpDensityPercent,
    zone.greenCoveragePercent,
    nearestGreenDistanceM
  );

  return {
    id: zone.id,
    name: zone.name,
    geometry: {
      type: 'Feature',
      id: zone.id,
      properties: {
        id: zone.id,
        name: zone.name,
        priorityClass,
        accessibilityClass,
      },
      geometry: {
        type: 'Polygon',
        coordinates: zone.coordinates,
      },
    },
    ndvi: zone.ndvi,
    greenCoveragePercent: zone.greenCoveragePercent,
    greenAreaM2,
    nearestGreenDistanceM,
    builtUpDensityPercent: zone.builtUpDensityPercent,
    localGreenDensity,
    distanceScore,
    greenCoverageScore,
    greenDensityScore,
    greenAccessibilityIndex,
    accessibilityClass,
    accessibilityDeficit,
    vegetationDeficit,
    distanceFactor,
    priorityScore,
    priorityClass,
    recommendation,
    reasons,
  };
});

// Compute aggregate dashboard statistics
export function getDemoStatistics(): DashboardStatistics {
  const totalGreenAreaM2 = DEMO_GREEN_PATCHES.reduce((acc, p) => acc + p.areaM2, 0);
  const greenPatchCount = DEMO_GREEN_PATCHES.length;
  const largestPatchAreaM2 = Math.max(...DEMO_GREEN_PATCHES.map((p) => p.areaM2));
  const averagePatchAreaM2 = Math.round(totalGreenAreaM2 / greenPatchCount);

  const totalStudyAreaKm2 = RAW_DEMO_ZONES.reduce((acc, z) => acc + z.areaKm2, 0);
  const totalStudyAreaM2 = totalStudyAreaKm2 * 1000000;
  const totalZoneGreenM2 = DEMO_ANALYSIS_ZONES.reduce((acc, z) => acc + z.greenAreaM2, 0);
  const greenCoveragePercent = Number(((totalZoneGreenM2 / totalStudyAreaM2) * 100).toFixed(1));

  // Poor access area = sum of area of zones with Poor accessibility class
  const poorAccessZones = DEMO_ANALYSIS_ZONES.filter((z) => z.accessibilityClass === 'Poor');
  const poorAccessAreaM2 = poorAccessZones.reduce((acc, z) => {
    const raw = RAW_DEMO_ZONES.find((r) => r.id === z.id);
    return acc + (raw ? raw.areaKm2 * 1000000 : 0);
  }, 0);

  const avgGai = Math.round(
    DEMO_ANALYSIS_ZONES.reduce((acc, z) => acc + z.greenAccessibilityIndex, 0) /
      DEMO_ANALYSIS_ZONES.length
  );

  const priorityZoneCount = DEMO_ANALYSIS_ZONES.filter(
    (z) => z.priorityClass === 'High' || z.priorityClass === 'Critical'
  ).length;

  return {
    totalGreenAreaM2,
    greenPatchCount,
    averagePatchAreaM2,
    largestPatchAreaM2,
    greenCoveragePercent,
    poorAccessAreaM2,
    averageAccessibilityIndex: avgGai,
    priorityZoneCount,
    studyAreaTotalM2: totalStudyAreaM2,
  };
}

export const DEMO_PROCESSING_METADATA: ProcessingMetadata = {
  dataMode: 'demo',
  sourceDataset: 'Synthetic Demonstration Dataset (Pre-computed Bengaluru Spatial Baseline)',
  satelliteSensor: 'Sentinel-2 MSI (Synthetic simulation)',
  landCoverProduct: 'Dynamic World V1 Built Probability Context (Synthetic simulation)',
  dateRange: {
    start: '2024-01-01',
    end: '2024-12-31',
  },
  cloudFilterPercent: 20,
  spatialResolutionM: 10,
  processedTimestamp: '2025-01-15T08:30:00Z',
  modelVersion: 'v1.2.0-prototype',
  studyAreaId: 'bengaluru-urban',
  isFallback: false,
  provenanceNote: 'DEMO MODE — Illustrative sample data, not live satellite measurements.',
};
