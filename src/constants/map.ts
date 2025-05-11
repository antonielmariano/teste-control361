import type { MapConfig } from '../types/map';

export const MAP_CONFIG: MapConfig = {
  containerStyle: {
    width: '100%',
    height: '400px',
    borderRadius: '20px'
  },
  defaultCenter: {
    lat: -15.7801,
    lng: -47.9292 
  },
  brazilBounds: {
    north: 5.271786,
    south: -33.750706,
    east: -34.793452,
    west: -73.982816
  }
};

export const LIBRARIES: ["marker"] = ["marker"]; 