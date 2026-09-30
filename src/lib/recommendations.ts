import { PriorityClass } from '../types/analysis';

export interface RecommendationOutput {
  recommendation: string;
  reasons: string[];
}

export function generateRecommendation(
  zoneId: string,
  zoneName: string,
  priorityClass: PriorityClass,
  gai: number,
  builtUpDensityPercent: number,
  greenCoveragePercent: number,
  nearestDistanceM: number
): RecommendationOutput {
  const reasons: string[] = [];

  if (gai <= 40) {
    reasons.push('Poor access');
  }
  if (builtUpDensityPercent >= 65) {
    reasons.push('High built-up density');
  }
  if (greenCoveragePercent <= 10) {
    reasons.push('Low vegetation coverage');
  }
  if (nearestDistanceM > 800) {
    reasons.push('Long distance to green space');
  }
  if (greenCoveragePercent <= 15 && gai <= 50) {
    reasons.push('Limited local green density');
  }

  let recommendation = '';

  if (priorityClass === 'Critical') {
    recommendation = `Critical-priority zone ${zoneId} (${zoneName}): the area combines acutely low green accessibility (GAI: ${gai}), elevated built-up density (${builtUpDensityPercent}%), and scarce local canopy. Consider this location as a prime candidate for further evaluation of an immediate pocket park, micro-forest, or rooftop greening intervention. This output is a prototype analytical recommendation and does not represent legal planning approval.`;
  } else if (priorityClass === 'High') {
    recommendation = `High-priority zone ${zoneId} (${zoneName}): the area combines low green accessibility, elevated built-up density, and limited local vegetation coverage. Consider this location for further evaluation of a new, expanded, or connected green-space intervention. This output is a prototype analytical recommendation and does not represent legal planning approval.`;
  } else if (priorityClass === 'Medium') {
    recommendation = `Medium-priority zone ${zoneId} (${zoneName}): exhibits moderate accessibility deficits alongside emerging urban density. Recommend field verification of existing informal green pockets and pedestrian walkway green corridors to prevent further accessibility decay.`;
  } else {
    recommendation = `Zone ${zoneId} (${zoneName}) currently shows relatively better green-space accessibility under the configured prototype model. Continued monitoring and preservation of existing green assets is recommended.`;
  }

  return { recommendation, reasons };
}
