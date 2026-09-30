/**
 * Dynamic World Land-Cover & Built-up Probability Processing
 * GOOGLE/DYNAMICWORLD/V1
 */

export interface DynamicWorldConfig {
  assetId: string;
  builtThreshold: number;
}

export const defaultDynamicWorldConfig: DynamicWorldConfig = {
  assetId: 'GOOGLE/DYNAMICWORLD/V1',
  builtThreshold: 0.50,
};

export function getDynamicWorldCollection(params: {
  geometry: any;
  startDate: string;
  endDate: string;
}) {
  return {
    collection: defaultDynamicWorldConfig.assetId,
    geometry: params.geometry,
    dateRange: [params.startDate, params.endDate],
    bands: ['built', 'trees', 'grass', 'crops', 'water', 'bare', 'label'],
  };
}

export function extractBuiltProbability(builtBandValue: number): number {
  return Math.max(0, Math.min(1, builtBandValue));
}
