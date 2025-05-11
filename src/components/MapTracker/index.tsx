import { useCallback, useState } from 'react';
import { GoogleMap } from '@react-google-maps/api';
import LoadingSpinner from '../LoadingSpinner';
import { useGoogleMaps } from '../../hooks/map/useGoogleMaps';
import { useMapMarkers } from '../../hooks/map/useMapMarkers';
import { VehicleInfoWindow } from '../VehicleInfoWindow';
import { MAP_CONFIG } from '../../constants/map';
import { ColorScheme } from '../../types/map';
import type { MapTrackerProps } from '../../types/map';

const MapTracker: React.FC<MapTrackerProps> = ({ vehicles }) => {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const { isLoaded, loadError } = useGoogleMaps();
  const { selectedVehicle, setSelectedVehicle } = useMapMarkers(map, vehicles);

  const onLoad = useCallback((map: google.maps.Map) => {
    setMap(map);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  if (loadError) {
    return (
      <div className="w-full h-[400px] rounded-[20px] overflow-hidden mb-8 bg-[#222] flex items-center justify-center">
        <span className="text-white">Erro ao carregar o mapa: {loadError.message}</span>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="w-full h-[400px] rounded-[20px] overflow-hidden mb-8 bg-[#222] relative">
        <LoadingSpinner message="Carregando mapa..." />
      </div>
    );
  }

  return (
    <div className="relative map-container" data-testid="map-container">
      <GoogleMap
        mapContainerStyle={MAP_CONFIG.containerStyle}
        center={MAP_CONFIG.defaultCenter}
        zoom={4}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={{
          mapId: import.meta.env.VITE_GOOGLE_MAPS_MAP_ID,
          mapTypeId: 'roadmap',
          backgroundColor: '#192734',
          minZoom: 3,
          maxZoom: 18,
          colorScheme: ColorScheme.DARK,
          restriction: {
            latLngBounds: MAP_CONFIG.brazilBounds,
            strictBounds: false
          },
          disableDefaultUI: true,
          zoomControl: true
        }}
      >
        {selectedVehicle && (
          <VehicleInfoWindow
            vehicle={selectedVehicle}
            onClose={() => setSelectedVehicle(null)}
          />
        )}
      </GoogleMap>
    </div>
  );
};

export default MapTracker; 