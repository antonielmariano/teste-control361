import type { LocationVehicle } from './vehicle';
export interface MapTrackerProps {
    vehicles: LocationVehicle[];
}
export interface MapConfig {
    containerStyle: {
        width: string;
        height: string;
        borderRadius: string;
    };
    defaultCenter: {
        lat: number;
        lng: number;
    };
    brazilBounds: {
        north: number;
        south: number;
        east: number;
        west: number;
    };
}
export declare enum ColorScheme {
    DARK = "DARK",
    LIGHT = "LIGHT"
}
