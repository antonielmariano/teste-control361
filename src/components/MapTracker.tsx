import { useCallback, useState, useEffect } from 'react';
import { GoogleMap, useJsApiLoader, InfoWindow } from '@react-google-maps/api';
import type { LocationVehicle } from '../types/vehicle';
import LoadingSpinner from './LoadingSpinner';

interface MapTrackerProps {
  vehicles: LocationVehicle[];
}

const LIBRARIES: ["marker"] = ["marker"];

const containerStyle = {
  width: '100%',
  height: '400px',
  borderRadius: '20px'
};

const defaultCenter = {
  lat: -15.7801,
  lng: -47.9292 
};

enum ColorScheme {
  DARK = 'DARK',
  LIGHT = 'LIGHT'
}

const createCustomMarkerElement = (vehicle: LocationVehicle) => {
  const isOn = vehicle.ignition === 'Ligado';
  
  const element = document.createElement('div');
  element.className = 'marker-container';
  element.style.position = 'relative';
  element.style.width = '40px';
  element.style.height = '50px';
  element.style.cursor = 'pointer';
  
  const svgNS = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(svgNS, 'svg');
  svg.setAttribute('width', '40');
  svg.setAttribute('height', '50');
  svg.setAttribute('viewBox', '0 0 40 50');
  svg.style.position = 'absolute';
  svg.style.top = '0';
  svg.style.left = '0';
  
  const pinPath = document.createElementNS(svgNS, 'path');
  pinPath.setAttribute('d', 'M20 0C9 0 0 9 0 20c0 13.4 20 30 20 30s20-16.6 20-30C40 9 31 0 20 0z');
  pinPath.setAttribute('fill', isOn ? '#4CAF50' : '#F44336');
  pinPath.setAttribute('stroke', '#FFF');
  pinPath.setAttribute('stroke-width', '2');
  
  const circle = document.createElementNS(svgNS, 'circle');
  circle.setAttribute('cx', '20');
  circle.setAttribute('cy', '19');
  circle.setAttribute('r', '10');
  circle.setAttribute('fill', '#FFFFFF');
  
  const icon = document.createElementNS(svgNS, 'path');
  if (isOn) {
    icon.setAttribute('d', 'M26 17H25V16C25 15.45 24.55 15 24 15H16C15.45 15 15 15.45 15 16V17H14C13.45 17 13 17.45 13 18V23C13 23.55 13.45 24 14 24H15C15 25.1 15.9 26 17 26C18.1 26 19 25.1 19 24H21C21 25.1 21.9 26 23 26C24.1 26 25 25.1 25 24H26C26.55 24 27 23.55 27 23V18C27 17.45 26.55 17 26 17ZM17 25C16.45 25 16 24.55 16 24C16 23.45 16.45 23 17 23C17.55 23 18 23.45 18 24C18 24.55 17.55 25 17 25ZM23 25C22.45 25 22 24.55 22 24C22 23.45 22.45 23 23 23C23.55 23 24 23.45 24 24C24 24.55 23.55 25 23 25ZM24 17H16V16H24V17Z');
    icon.setAttribute('fill', '#4CAF50');
  } else {
    icon.setAttribute('d', 'M26 17H25V16C25 15.45 24.55 15 24 15H16C15.45 15 15 15.45 15 16V17H14C13.45 17 13 17.45 13 18V23C13 23.55 13.45 24 14 24H15C15 25.1 15.9 26 17 26C18.1 26 19 25.1 19 24H21C21 25.1 21.9 26 23 26C24.1 26 25 25.1 25 24H26C26.55 24 27 23.55 27 23V18C27 17.45 26.55 17 26 17ZM17 25C16.45 25 16 24.55 16 24C16 23.45 16.45 23 17 23C17.55 23 18 23.45 18 24C18 24.55 17.55 25 17 25ZM23 25C22.45 25 22 24.55 22 24C22 23.45 22.45 23 23 23C23.55 23 24 23.45 24 24C24 24.55 23.55 25 23 25ZM24 17H16V16H24V17Z');
    icon.setAttribute('fill', '#F44336');
  }
  
  svg.appendChild(pinPath);
  svg.appendChild(circle);
  svg.appendChild(icon);
  
  element.appendChild(svg);
  
  const plateLabel = document.createElement('div');
  plateLabel.style.position = 'absolute';
  plateLabel.style.width = '48px';
  plateLabel.style.top = '50px';
  plateLabel.style.left = '-4px';
  plateLabel.style.textAlign = 'center';
  plateLabel.style.color = '#FFFFFF';
  plateLabel.style.fontWeight = 'bold';
  plateLabel.style.fontSize = '9px';
  plateLabel.style.textShadow = '1px 1px 2px rgba(0,0,0,0.8)';
  plateLabel.style.background = isOn ? 'rgba(76, 175, 80, 0.7)' : 'rgba(244, 67, 54, 0.7)';
  plateLabel.style.borderRadius = '3px';
  plateLabel.style.padding = '2px';
  plateLabel.textContent = vehicle.plate;
  
  element.appendChild(plateLabel);
  
  return element;
};

const MapTracker: React.FC<MapTrackerProps> = ({ vehicles }) => {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [selectedVehicle, setSelectedVehicle] = useState<LocationVehicle | null>(null);
  const [markerElements, setMarkerElements] = useState<google.maps.marker.AdvancedMarkerElement[]>([]);

  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const GOOGLE_MAPS_MAP_ID = import.meta.env.VITE_GOOGLE_MAPS_MAP_ID;

  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: apiKey || '',
    libraries: LIBRARIES,
    language: navigator.language.split('-')[0]
  });

  const onLoad = useCallback((map: google.maps.Map) => {
    setMap(map);
  }, []);

  const onUnmount = useCallback(() => {
    markerElements.forEach(marker => {
      marker.map = null;
    });
    setMarkerElements([]);
    setMap(null);
  }, [markerElements]);

  const handleMarkerClick = (vehicle: LocationVehicle) => {
    setSelectedVehicle(vehicle);
  };

  const createMarkers = useCallback(() => {
    if (!map || !google.maps.marker || !vehicles.length) return;
    
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
    
    setMarkerElements(newMarkers);
  }, [map, vehicles]); 

  useEffect(() => {
    if (map) {
      createMarkers();
    }
  }, [map, vehicles, createMarkers]);

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
    <div className="relative">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={defaultCenter}
        zoom={4}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={{
          mapId: GOOGLE_MAPS_MAP_ID,
          mapTypeId: 'roadmap',
          backgroundColor: '#192734',
          minZoom: 3,
          maxZoom: 18,
          colorScheme: ColorScheme.DARK,
          restriction: {
            latLngBounds: {
              north: 5.271786,
              south: -33.750706,
              east: -34.793452,
              west: -73.982816
            },
            strictBounds: false
          },
          disableDefaultUI: true,
          zoomControl: true
        }}
      >
        {selectedVehicle && (
          <InfoWindow
            position={{
              lat: selectedVehicle.lat,
              lng: selectedVehicle.lng
            }}
            onCloseClick={() => setSelectedVehicle(null)}
            options={{
              pixelOffset: new google.maps.Size(0, -32)
            }}
          >
            <div className="p-2 min-w-[200px] bg-[#1a1a1a] rounded text-white">
              <h3 className="mb-2 text-base font-bold text-white">
                {selectedVehicle.name} - {selectedVehicle.plate}
              </h3>
              <p className="my-1 text-gray-300">Frota: {selectedVehicle.fleet}</p>
              <p className="my-1 text-gray-300">Equipamento: {selectedVehicle.equipmentId}</p>
              <p className={`my-1 font-bold ${
                selectedVehicle.ignition === 'Ligado' ? 'text-green-400' : 'text-red-400'
              }`}>
                Ignição: {selectedVehicle.ignition}
              </p>
              <p className="my-1 text-xs text-gray-400">
                Última atualização: {new Date(selectedVehicle.createdAt).toLocaleString('pt-BR')}
              </p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  );
};

export default MapTracker;