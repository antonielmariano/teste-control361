import type { LocationVehicle } from '../../types/vehicle';
export declare const useMapMarkers: (map: google.maps.Map | null, vehicles: LocationVehicle[]) => {
    markerElements: google.maps.marker.AdvancedMarkerElement[];
    selectedVehicle: LocationVehicle | null;
    setSelectedVehicle: import("react").Dispatch<import("react").SetStateAction<LocationVehicle | null>>;
};
