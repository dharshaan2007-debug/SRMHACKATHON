export interface StudyAreaConfig {
  id: string;
  name: string;
  state: string;
  country: string;
  center: [number, number]; // [lat, lng]
  zoom: number;
  boundingBox: {
    minLat: number;
    maxLat: number;
    minLng: number;
    maxLng: number;
  };
  dateRange: {
    start: string;
    end: string;
  };
  cloudThreshold: number; // percentage
  nominalAreaKm2: number;
  description: string;
}

export const studyArea: StudyAreaConfig = {
  id: 'bengaluru-urban',
  name: 'Bengaluru Urban Region',
  state: 'Karnataka',
  country: 'India',
  center: [12.9716, 77.5946],
  zoom: 11,
  boundingBox: {
    minLat: 12.8200,
    maxLat: 13.1400,
    minLng: 77.4400,
    maxLng: 77.7800,
  },
  dateRange: {
    start: '2024-01-01',
    end: '2024-12-31',
  },
  cloudThreshold: 20,
  nominalAreaKm2: 741.0,
  description: 'Metropolitan study area encompassing the core municipal corporation (BBMP) and surrounding rapid urban growth corridors.',
};
