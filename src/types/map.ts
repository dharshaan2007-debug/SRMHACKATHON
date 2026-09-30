export type BaseMapType = 'osm' | 'satellite';

export interface MapLayerState {
  ndvi: boolean;
  greenSpaces: boolean;
  builtUp: boolean;
  accessibility: boolean;
  priorityZones: boolean;
  boundary: boolean;
}

export interface LegendItem {
  label: string;
  color: string;
  description?: string;
  range?: string;
}

export interface LayerLegend {
  title: string;
  subtitle?: string;
  unit?: string;
  items: LegendItem[];
}
