import { useCallback, useState, useEffect } from 'react';
import type { LocationVehicle } from '../../types/vehicle';
import { MAP_CONFIG } from '../../constants/map';
import { createCustomMarkerElement } from '../../utils/map/markerUtils';

export const useMapMarkers = (map: google.maps.Map | null, vehicles: LocationVehicle[]) => {
  const [markerElements, setMarkerElements] = useState<google.maps.marker.AdvancedMarkerElement[]>([]);
  const [selectedVehicle, setSelectedVehicle] = useState<LocationVehicle | null>(null);

  const handleMarkerClick = useCallback((vehicle: LocationVehicle) => {
    setSelectedVehicle(vehicle);
  }, []);

  const centerMapOnBrazil = useCallback(() => {
    if (!map) return;
    
    const bounds = new google.maps.LatLngBounds(
      { lat: MAP_CONFIG.brazilBounds.south, lng: MAP_CONFIG.brazilBounds.west },
      { lat: MAP_CONFIG.brazilBounds.north, lng: MAP_CONFIG.brazilBounds.east }
    );
    
    map.fitBounds(bounds);
    map.setZoom(4);
  }, [map]);

  const adjustMapBounds = useCallback(() => {
    if (!map || !vehicles.length) return;

    const bounds = new google.maps.LatLngBounds();
    vehicles.forEach(vehicle => {
      bounds.extend({ lat: vehicle.lat, lng: vehicle.lng });
    });

    map.fitBounds(bounds);
    if (vehicles.length === 1) {
      map.setZoom(15);
    }
  }, [map, vehicles]);

  const createMarkers = useCallback(() => {
    if (!map || !google.maps.marker) return;

    markerElements.forEach(marker => {
      marker.map = null;
    });
    
    const newMarkers = vehicles.map((vehicle) => {
      const markerElement = createCustomMarkerElement(vehicle);
      
      const marker = new google.maps.marker.AdvancedMarkerElement({
        position: {
          lat: vehicle.lat,
          lng: vehicle.lng
        },
        map: map,
        title: `${vehicle.name} - ${vehicle.plate}`,
        content: markerElement,
        gmpClickable: true
      });
      
      marker.addEventListener('gmp-click', () => handleMarkerClick(vehicle));
      return marker;
    });
    
    if (vehicles.length === 0) {
      centerMapOnBrazil();
    }
    
    setMarkerElements(newMarkers);
    if (vehicles.length > 0) {
      adjustMapBounds();
    }
  }, [map, vehicles, adjustMapBounds, centerMapOnBrazil, handleMarkerClick]);

  useEffect(() => {
    if (map) {
      createMarkers();
    }
  }, [map, createMarkers]);

  return {
    markerElements,
    selectedVehicle,
    setSelectedVehicle
  };
}; 