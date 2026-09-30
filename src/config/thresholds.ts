export const greenSpaceModel = {
  ndviThreshold: 0.35,
  minimumPatchAreaM2: 2500, // 0.25 hectares minimum meaningful patch
  dynamicWorldVegetationClasses: [
    'trees',
    'grass',
    'shrub_and_scrub',
    'crops',
  ],
  excludeClasses: [
    'water',
    'bare',
    'built',
  ],
  disclaimer: 'Project-defined analytical assumptions.',
};

export const accessibilityThresholds = {
  excellent: 250, // 0-250m
  good: 500,      // 250-500m
  moderate: 1000, // 500-1000m
  // > 1000m = Poor
  disclaimer: 'These distance thresholds are project-defined analytical assumptions for this prototype. They are not universal planning standards.',
};

export const colorPalette = {
  accessibility: {
    Excellent: '#1F9D68', // Green
    Good: '#34D399',      // Bright / Teal Green
    Moderate: '#F4C95D',  // Yellow
    Poor: '#DC2626',      // Red
  },
  priority: {
    Low: '#1F9D68',       // Green
    Medium: '#F4C95D',    // Yellow
    High: '#F97316',      // Orange
    Critical: '#DC2626',  // Red
  },
  ndvi: {
    veryLow: '#7F1D1D',   // Dark Red (< 0.1)
    low: '#F97316',       // Orange (0.1 - 0.25)
    moderate: '#F4C95D',  // Yellow (0.25 - 0.4)
    healthy: '#34D399',   // Light Green (0.4 - 0.6)
    dense: '#065F46',     // Dark Green (> 0.6)
  },
  builtUp: {
    low: '#E0F2FE',       // Low density
    medium: '#93C5FD',    // Medium density
    high: '#3B82F6',      // High density
    extreme: '#1D4ED8',   // Extreme density
  }
};
