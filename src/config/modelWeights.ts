export interface GaiWeights {
  distance: number;
  greenCoverage: number;
  localGreenDensity: number;
}

export interface PriorityWeights {
  accessibilityDeficit: number;
  builtUpDensity: number;
  vegetationDeficit: number;
  distanceFactor: number;
}

export const defaultGaiWeights: GaiWeights = {
  distance: 0.50,
  greenCoverage: 0.30,
  localGreenDensity: 0.20,
};

export const defaultPriorityWeights: PriorityWeights = {
  accessibilityDeficit: 0.40,
  builtUpDensity: 0.30,
  vegetationDeficit: 0.20,
  distanceFactor: 0.10,
};

export function validateWeights(weights: Record<string, number>, tolerance: number = 0.001): {
  isValid: boolean;
  sum: number;
  error?: string;
} {
  const sum = Object.values(weights).reduce((acc, v) => acc + v, 0);
  const isValid = Math.abs(sum - 1.0) <= tolerance;
  
  for (const [key, val] of Object.entries(weights)) {
    if (val < 0 || val > 1) {
      return {
        isValid: false,
        sum,
        error: `Weight for ${key} (${val}) must be between 0 and 1.`,
      };
    }
  }

  if (!isValid) {
    return {
      isValid: false,
      sum,
      error: `Weights must sum to 1.00 (current sum: ${sum.toFixed(3)}).`,
    };
  }

  return { isValid: true, sum };
}
