import { useEffect, useState, useRef, useCallback } from 'react';
import MapTracker from '../components/MapTracker';
import TypeFilter from '../components/TypeFilter';
import SearchInput from '../components/SearchInput';
import VehicleTable from '../components/VehicleTable';
import LoadingSpinner from '../components/LoadingSpinner';
import type { Vehicle, LocationVehicle } from '../types/vehicle';
import api from '../config/api';
import { Toaster } from 'react-hot-toast';

const Home: React.FC = () => {
  const [type, setType] = useState<'tracked' | 'others'>('tracked');
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [trackedVehicles, setTrackedVehicles] = useState<LocationVehicle[]>([]);
  const [filter, setFilter] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [perPage, setPerPage] = useState(20);
  const [loading, setLoading] = useState(false);

  const observer = useRef<IntersectionObserver | null>(null);
  const lastVehicleElementRef = useCallback((node: HTMLTableRowElement | null) => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && page < totalPages) {
        setPage(prevPage => prevPage + 1);
      }
    });
    if (node) observer.current.observe(node);
  }, [loading, page, totalPages]);

  const fetchVehicles = async (pageNumber: number) => {
    try {
      setLoading(true);
      const response = await api.get('recruitment/vehicles/list-with-paginate', {
        params: {
          type,
          page: pageNumber,
          filter,
          perPage
        },
      });
      
      if (pageNumber === 1) {
        setVehicles(response.data.content.vehicles);
        
        const locationVehicles = response.data.content.locationVehicles;
        const latestLocations = new Map();

        locationVehicles?.forEach((location: LocationVehicle) => {
          const existing = latestLocations.get(location.id);
          if (!existing || new Date(location.createdAt) > new Date(existing.createdAt)) {
            latestLocations.set(location.id, location);
          }
        });
        
        setTrackedVehicles(Array.from(latestLocations.values()));
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
  };

  useEffect(() => {
    setPage(1);
    fetchVehicles(1);
  }, [type]);

  useEffect(() => {
    if (page > 1) {
      fetchVehicles(page);
    }
  }, [page]);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchVehicles(1);
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-10">
      <Toaster />
      <header className="text-white text-lg mb-6">
        Antoniel Mariano
      </header>
      <div className="flex items-center justify-between mb-4">
        <TypeFilter value={type} onChange={setType} />
        <div className="flex gap-4">
          <SearchInput value={filter} onChange={setFilter} placeholder="Buscar por placa ou frota" />
          <button className="bg-[#0094FF] text-white rounded-lg px-6 font-semibold" onClick={() => fetchVehicles(1)}>Buscar</button>
        </div>
      </div>
      <div className="bg-[#16232E] rounded-2xl p-6 mb-8">
        <h2 className="text-white text-lg mb-4">Mapa rastreador</h2>
        <MapTracker vehicles={trackedVehicles} />
      </div>
      <div className="bg-[#16232E] rounded-2xl relative">
        <VehicleTable vehicles={vehicles} lastVehicleElementRef={lastVehicleElementRef} />
        {loading && <LoadingSpinner message="Carregando mais veículos..." />}
      </div>
    </div>
  );
};

export default Home; 