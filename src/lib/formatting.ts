/**
 * Formats square meters into readable hectares or sq km
 */
export function formatArea(m2: number): string {
  if (m2 >= 1000000) {
    return `${(m2 / 1000000).toFixed(2)} km²`;
  }
  if (m2 >= 10000) {
    return `${(m2 / 10000).toFixed(1)} ha`;
  }
  return `${Math.round(m2).toLocaleString()} m²`;
}

/**
 * Formats distance in meters or kilometers
 */
export function formatDistance(meters: number): string {
  if (meters >= 1000) {
    return `${(meters / 1000).toFixed(2)} km`;
  }
  return `${Math.round(meters)} m`;
}

/**
 * Formats percentages with customizable decimals
 */
export function formatPercent(val: number, decimals: number = 1): string {
  return `${val.toFixed(decimals)}%`;
}

/**
 * Formats NDVI values with 3 decimal precision
 */
export function formatNdvi(val: number): string {
  return val.toFixed(3);
}

/**
 * Formats numbers with localized thousands separators
 */
export function formatNumber(val: number): string {
  return Math.round(val).toLocaleString();
}
