import { DataMode } from '../types/analysis';
import { GeospatialDataProvider } from '../types/data';
import { DemoDataProvider } from './DemoDataProvider';
import { EarthEngineDataProvider } from './EarthEngineDataProvider';

let currentDemoProvider: DemoDataProvider | null = null;
let currentEEProvider: EarthEngineDataProvider | null = null;

export function getDataProvider(mode: DataMode = 'demo'): GeospatialDataProvider {
  if (mode === 'earth-engine') {
    if (!currentEEProvider) {
      currentEEProvider = new EarthEngineDataProvider();
    }
    return currentEEProvider;
  }

  if (!currentDemoProvider) {
    currentDemoProvider = new DemoDataProvider();
  }
  return currentDemoProvider;
}
