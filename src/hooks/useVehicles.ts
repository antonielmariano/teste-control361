import { useState, useCallback, useRef, useEffect } from 'react';
import type { Vehicle, LocationVehicle } from '../types/vehicle';
import api from '../config/api';

export const useVehicles = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [trackedVehicles, setTrackedVehicles] = useState<LocationVehicle[]>([]);
  const [filter, setFilter] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [perPage, setPerPage] = useState(20);
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState<'tracked' | 'others'>('tracked');
  const isInitialMount = useRef(true);

  const setLocationVehicles = useCallback((locationVehicles: LocationVehicle[]) => {
    const latestLocations = new Map();
    locationVehicles?.forEach((location: LocationVehicle) => {
      const existing = latestLocations.get(location.id);
      if (!existing || new Date(location.createdAt) > new Date(existing.createdAt)) {
        latestLocations.set(location.id, location);
      }
    });
    setTrackedVehicles(Array.from(latestLocations.values()));
  }, []);

  const fetchVehicles = useCallback(async (pageNumber: number, vehicleType: 'tracked' | 'others') => {
    try {
      setLoading(true);
      const response = await api.get('recruitment/vehicles/list-with-paginate', {
        params: {
          type: vehicleType,
          page: pageNumber,
          filter,
          perPage
        },
      });
      
      const locationVehicles = response.data.content.locationVehicles;
      setLocationVehicles(locationVehicles);

      if (pageNumber === 1) {
        setVehicles(response.data.content.vehicles);
      } else {
        setVehicles(prev => [...prev, ...response.data.content.vehicles]);
      }
      
      setTotalPages(response.data.content.totalPages);
      setPerPage(response.data.content.perPage);
    } catch (error) {
      console.error('Erro ao carregar veículos:', error);
    } finally {
      setLoading(false);
    }
  }, [filter, perPage, setLocationVehicles]);

  const setPageWithFetch = useCallback((newPage: number, vehicleType: 'tracked' | 'others') => {
    setPage(newPage);
    setType(vehicleType);
    if (newPage > 1 || !isInitialMount.current) {
      fetchVehicles(newPage, vehicleType);
    }
    isInitialMount.current = false;
  }, [fetchVehicles]);

  // Efeito para carregar os veículos inicialmente
  useEffect(() => {
    fetchVehicles(1, type);
  }, []);

  return {
    vehicles,
    trackedVehicles,
    filter,
    setFilter,
    page,
    setPage: setPageWithFetch,
    totalPages,
    loading,
    fetchVehicles,
    type,
    setType
  };
}; 