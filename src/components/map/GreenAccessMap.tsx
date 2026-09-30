import React, { useState, useEffect, useRef } from 'react';
import {
  MapContainer,
  TileLayer,
  GeoJSON,
  useMap,
  Popup,
} from 'react-leaflet';
import L from 'leaflet';
import { useDashboardData } from '../../hooks/useDashboardData';
import { studyArea } from '../../config/studyArea';
import { AnalysisZone, GreenPatch } from '../../types/analysis';
import { BaseMapType } from '../../types/map';
import { colorPalette } from '../../config/thresholds';
import { MapLegend } from './MapLegend';
import { MapLayerControl } from './MapLayerControl';
import { ZoneDetailPanel } from './ZoneDetailPanel';
import { formatDistance, formatPercent } from '../../lib/formatting';
import { Badge } from '../common/Badge';
import { Maximize2, Sparkles, Trees, Info } from 'lucide-react';

// Fix Leaflet icon issue
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

// Map Controller for zooming and fitting bounds
const MapViewController: React.FC<{
  targetBounds?: L.LatLngBoundsExpression | null;
  selectedZoneCentroid?: [number, number] | null;
}> = ({ targetBounds, selectedZoneCentroid }) => {
  const map = useMap();

  useEffect(() => {
    if (selectedZoneCentroid) {
      map.flyTo(selectedZoneCentroid, 13, { duration: 1.2 });
    } else if (targetBounds) {
      map.fitBounds(targetBounds, { padding: [40, 40] });
    }
  }, [map, targetBounds, selectedZoneCentroid]);

  return null;
};

export const GreenAccessMap: React.FC<{
  className?: string;
  showControls?: boolean;
}> = ({ className = 'h-[620px]', showControls = true }) => {
  const {
    zones,
    greenPatches,
    selectedZone,
    setSelectedZone,
    layerState,
    toggleLayer,
  } = useDashboardData();

  const [baseMap, setBaseMap] = useState<BaseMapType>('osm');
  const [mapFocusCentroid, setMapFocusCentroid] = useState<[number, number] | null>(null);

  // Study Area Boundary GeoJSON Feature
  const boundaryGeoJson: GeoJSON.Feature = {
    type: 'Feature',
    properties: { name: studyArea.name },
    geometry: {
      type: 'Polygon',
      coordinates: [[
        [studyArea.boundingBox.minLng, studyArea.boundingBox.minLat],
        [studyArea.boundingBox.maxLng, studyArea.boundingBox.minLat],
        [studyArea.boundingBox.maxLng, studyArea.boundingBox.maxLat],
        [studyArea.boundingBox.minLng, studyArea.boundingBox.maxLat],
        [studyArea.boundingBox.minLng, studyArea.boundingBox.minLat],
      ]],
    },
  };

  const initialBounds: L.LatLngBoundsExpression = [
    [studyArea.boundingBox.minLat, studyArea.boundingBox.minLng],
    [studyArea.boundingBox.maxLat, studyArea.boundingBox.maxLng],
  ];

  const handleResetView = () => {
    setMapFocusCentroid(null);
    setSelectedZone(null);
  };

  // Zone style calculation
  const getZoneStyle = (feature: any) => {
    const zoneId = feature?.properties?.id;
    const zone = zones.find((z) => z.id === zoneId);
    const isSelected = selectedZone?.id === zoneId;

    if (!zone) {
      return {
        fillColor: '#94A3B8',
        weight: 1,
        opacity: 0.5,
        color: '#64748B',
        fillOpacity: 0.2,
      };
    }

    let fillColor = '#94A3B8';
    let fillOpacity = 0.5;

    if (layerState.priorityZones) {
      fillColor = colorPalette.priority[zone.priorityClass];
      fillOpacity = zone.priorityClass === 'Critical' ? 0.75 : zone.priorityClass === 'High' ? 0.65 : 0.45;
    } else if (layerState.accessibility) {
      fillColor = colorPalette.accessibility[zone.accessibilityClass];
      fillOpacity = 0.6;
    } else if (layerState.builtUp) {
      fillColor = zone.builtUpDensityPercent > 80 ? '#1D4ED8' : zone.builtUpDensityPercent > 70 ? '#3B82F6' : '#93C5FD';
      fillOpacity = 0.65;
    }

    return {
      fillColor,
      weight: isSelected ? 3.5 : 1.5,
      opacity: 0.9,
      color: isSelected ? '#0F172A' : '#FFFFFF',
      dashArray: isSelected ? '' : '2',
      fillOpacity,
    };
  };

  // Green patch style
  const patchStyle = {
    fillColor: '#059669',
    weight: 1.5,
    opacity: 0.9,
    color: '#064E3B',
    fillOpacity: 0.7,
  };

  const onEachZoneFeature = (feature: any, layer: L.Layer) => {
    const zone = zones.find((z) => z.id === feature?.properties?.id);
    if (!zone) return;

    layer.on({
      click: () => {
        setSelectedZone(zone);
      },
      mouseover: (e) => {
        const target = e.target;
        target.setStyle({
          weight: 3,
          color: '#0B1F33',
        });
      },
      mouseout: (e) => {
        const target = e.target;
        if (selectedZone?.id !== zone.id) {
          target.setStyle(getZoneStyle(feature));
        }
      },
    });

    layer.bindTooltip(
      `<strong>${zone.id}: ${zone.name}</strong><br/>Priority: ${zone.priorityClass} | GAI: ${zone.greenAccessibilityIndex}`,
      { direction: 'top', sticky: true, className: 'text-xs' }
    );
  };

  return (
    <div className={`relative w-full rounded-2xl overflow-hidden border border-slate-200 shadow-md ${className}`}>
      <MapContainer
        center={studyArea.center}
        zoom={studyArea.zoom}
        scrollWheelZoom={true}
        className="w-full h-full"
      >
        <MapViewController
          targetBounds={mapFocusCentroid ? null : initialBounds}
          selectedZoneCentroid={mapFocusCentroid}
        />

        {/* Tile Basemap */}
        {baseMap === 'osm' ? (
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        ) : (
          <TileLayer
            attribution='Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          />
        )}

        {/* Study Area Boundary */}
        {layerState.boundary && (
          <GeoJSON
            key="study-area-boundary"
            data={boundaryGeoJson as any}
            style={{
              color: '#0B1F33',
              weight: 2,
              dashArray: '6, 6',
              fillColor: '#000000',
              fillOpacity: 0.02,
            }}
          />
        )}

        {/* Meaningful Green Patches Layer */}
        {layerState.greenSpaces &&
          greenPatches.map((patch) => (
            <GeoJSON
              key={`patch-${patch.id}`}
              data={patch.geometry as any}
              style={patchStyle}
              onEachFeature={(_, layer) => {
                layer.bindTooltip(
                  `<strong>${patch.name}</strong><br/>Area: ${Math.round(patch.areaM2 / 10000)} ha | NDVI: ${patch.ndvi}<br/><i>${
                    patch.publicAccessVerified
                      ? 'Verified public access'
                      : 'Satellite-derived green patch — public access unverified'
                  }</i>`,
                  { direction: 'top', sticky: true }
                );
              }}
            />
          ))}

        {/* Analysis Zones Choropleth */}
        {(layerState.priorityZones || layerState.accessibility || layerState.builtUp) &&
          zones.map((zone) => (
            <GeoJSON
              key={`zone-${zone.id}-${layerState.priorityZones ? 'prio' : 'acc'}-${selectedZone?.id === zone.id}`}
              data={zone.geometry as any}
              style={getZoneStyle}
              onEachFeature={onEachZoneFeature}
            />
          ))}
      </MapContainer>

      {/* Floating Map Controls & Overlays */}
      {showControls && (
        <>
          {/* Top Right: Layer Switcher */}
          <div className="absolute top-4 right-4 z-[400]">
            <MapLayerControl
              layerState={layerState}
              onToggleLayer={toggleLayer}
              baseMap={baseMap}
              onSelectBaseMap={setBaseMap}
              onResetView={handleResetView}
            />
          </div>

          {/* Bottom Left: Dynamic Legend */}
          <div className="absolute bottom-6 left-4 z-[400] hidden sm:block">
            <MapLegend layerState={layerState} />
          </div>

          {/* Bottom Right: Zone Detail Panel when a zone is selected */}
          {selectedZone && (
            <div className="absolute bottom-6 right-4 z-[500]">
              <ZoneDetailPanel
                zone={selectedZone}
                onClose={() => setSelectedZone(null)}
                onZoomTo={() => {
                  const raw = zones.find((z) => z.id === selectedZone.id);
                  if (raw) {
                    const coords = raw.geometry.geometry.coordinates as number[][][];
                    const lng = coords[0][0][0];
                    const lat = coords[0][0][1];
                    setMapFocusCentroid([lat, lng]);
                  }
                }}
              />
            </div>
          )}

          {/* Study Area Title & Disclaimer Pill Top Left */}
          <div className="absolute top-4 left-4 z-[400] flex flex-col gap-1 max-w-xs select-none">
            <div className="bg-white/95 backdrop-blur-xs px-3 py-1.5 rounded-lg border border-slate-200 shadow-sm text-xs flex items-center justify-between">
              <span className="font-bold text-slate-800">{studyArea.name}</span>
              <span className="text-[10px] text-slate-500 font-mono">18 Zones</span>
            </div>
            <div className="bg-slate-900/90 backdrop-blur-xs text-slate-200 text-[10px] px-2.5 py-1 rounded-md shadow-xs flex items-center gap-1.5 border border-slate-800">
              <Info className="w-3 h-3 text-amber-400 flex-shrink-0" />
              <span>Click any zone polygon to evaluate accessibility and priority factors.</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
