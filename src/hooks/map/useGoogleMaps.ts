import { useJsApiLoader } from '@react-google-maps/api';
import { LIBRARIES } from '../../constants/map';

export const useGoogleMaps = () => {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  return useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: apiKey,
    libraries: LIBRARIES,
    language: navigator.language.split('-')[0]
  });
}; 