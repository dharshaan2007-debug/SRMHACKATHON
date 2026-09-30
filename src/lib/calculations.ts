import { AccessibilityClass, PriorityClass } from '../types/analysis';
import { GaiWeights, PriorityWeights, defaultGaiWeights, defaultPriorityWeights } from '../config/modelWeights';

/**
 * Clamps a number to [min, max] range
 */
export function clamp(val: number, min: number = 0, max: number = 100): number {
  if (isNaN(val)) return min;
  return Math.max(min, Math.min(max, val));
}

/**
 * Normalizes any value to 0–100 scale given expected bounds
 */
export function normalizeTo100(val: number, min: number, max: number): number {
  if (max === min) return 0;
  const ratio = (val - min) / (max - min);
  return clamp(Math.round(ratio * 100));
}

/**
 * Distance Score calculation
 * Thresholds:
 * - 0–250 m = 100 (Excellent)
 * - 250–500 m = 75 (Good)
 * - 500–1000 m = 45 (Moderate)
 * - >1000 m = 10 (Poor)
 */
export function calculateDistanceScore(nearestDistanceM: number): number {
  if (nearestDistanceM <= 250) return 100;
  if (nearestDistanceM <= 500) return 75;
  if (nearestDistanceM <= 1000) return 45;
  return 10;
}

/**
 * Green Coverage Score (0-100)
 * Evaluates local coverage percentage relative to an urban benchmark of 30%
 */
export function calculateGreenCoverageScore(greenCoveragePercent: number): number {
  // 30% coverage or higher gets full 100
  return clamp(Math.round((greenCoveragePercent / 30) * 100));
}

/**
 * Local Green Density Score (0-100)
 * Evaluates vegetation density within the zone boundary
 */
export function calculateGreenDensityScore(localGreenDensity: number): number {
  // localGreenDensity is typically a density ratio 0-1
  return clamp(Math.round(localGreenDensity * 100));
}

/**
 * Green Accessibility Index (GAI)
 * Formula:
 * GAI = W_dist * Distance Score + W_cov * Green Coverage Score + W_den * Local Green Density Score
 */
export function calculateGreenAccessibilityIndex(
  distanceScore: number,
  greenCoverageScore: number,
  greenDensityScore: number,
  weights: GaiWeights = defaultGaiWeights
): number {
  const score =
    weights.distance * distanceScore +
    weights.greenCoverage * greenCoverageScore +
    weights.localGreenDensity * greenDensityScore;
  return clamp(Math.round(score));
}

/**
 * Accessibility Class categorization
 * 0–30 = Poor
 * 31–60 = Moderate
 * 61–100 = Good (with 80+ representing Excellent distance & density)
 */
export function classifyAccessibility(gai: number, nearestDistanceM?: number): AccessibilityClass {
  if (nearestDistanceM !== undefined && nearestDistanceM <= 250 && gai >= 75) {
    return 'Excellent';
  }
  if (gai >= 61) return 'Good';
  if (gai >= 31) return 'Moderate';
  return 'Poor';
}

/**
 * Accessibility Deficit
 * Defined as: 100 - GAI
 */
export function calculateAccessibilityDeficit(gai: number): number {
  return clamp(100 - gai);
}

/**
 * Vegetation Deficit
 * Inverse normalized local green coverage score
 */
export function calculateVegetationDeficit(greenCoveragePercent: number): number {
  const coverageScore = calculateGreenCoverageScore(greenCoveragePercent);
  return clamp(100 - coverageScore);
}

/**
 * Distance Factor
 * Higher value when nearest green space is farther away
 * Max distance cap: 2000m
 */
export function calculateDistanceFactor(nearestDistanceM: number): number {
  const factor = (nearestDistanceM / 2000) * 100;
  return clamp(Math.round(factor));
}

/**
 * Zone Priority Score
 * Formula:
 * Priority = W_acc * Accessibility Deficit + W_built * Built-up Density + W_veg * Vegetation Deficit + W_dist * Distance Factor
 */
export function calculatePriorityScore(
  accessibilityDeficit: number,
  builtUpDensityPercent: number,
  vegetationDeficit: number,
  distanceFactor: number,
  weights: PriorityWeights = defaultPriorityWeights
): number {
  const score =
    weights.accessibilityDeficit * accessibilityDeficit +
    weights.builtUpDensity * builtUpDensityPercent +
    weights.vegetationDeficit * vegetationDeficit +
    weights.distanceFactor * distanceFactor;
  return clamp(Math.round(score));
}

/**
 * Priority Class categorization:
 * 0–30 = Low
 * 31–60 = Medium
 * 61–80 = High
 * 81–100 = Critical
 */
export function classifyPriority(priorityScore: number): PriorityClass {
  if (priorityScore >= 81) return 'Critical';
  if (priorityScore >= 61) return 'High';
  if (priorityScore >= 31) return 'Medium';
  return 'Low';
}
