import { useEffect, useState } from 'react';
import MapTracker from '../components/MapTracker';
import VehicleTable from '../components/VehicleTable/';
import LoadingSpinner from '../components/LoadingSpinner';
import { Header } from '../components/Header';
import { FilterSection } from '../components/FilterSection/';
import { useVehicles } from '../hooks/useVehicles';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';
import { Toaster } from 'react-hot-toast';

const Home: React.FC = () => {
  const [type, setType] = useState<'tracked' | 'others'>('tracked');
  const {
    vehicles,
    trackedVehicles,
    filter,
    setFilter,
    page,
    setPage,
    totalPages,
    loading,
    fetchVehicles
  } = useVehicles();

  const { lastElementRef } = useInfiniteScroll({
    loading,
    page,
    totalPages,
    onPageChange: setPage
  });

  useEffect(() => {
    setPage(1);
    fetchVehicles(1, type);
  }, [type, fetchVehicles, setPage]);

  useEffect(() => {
    if (page > 1) {
      fetchVehicles(page, type);
    }
  }, [page, type, fetchVehicles]);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchVehicles(1, type);
    }, 30000);
    return () => clearInterval(interval);
  }, [type, fetchVehicles]);

  return (
    <div className="p-10">
      <Toaster />
      <Header name="Antoniel Mariano" />
      <FilterSection
        type={type}
        onTypeChange={setType}
        filter={filter}
        onFilterChange={setFilter}
        onSearch={() => fetchVehicles(1, type)}
      />
      <div className="bg-[#16232E] rounded-2xl p-6 mb-8">
        <h2 className="text-white text-lg mb-4">Mapa rastreador</h2>
        <MapTracker vehicles={trackedVehicles} />
      </div>
      <div className="bg-[#16232E] rounded-2xl relative">
        <VehicleTable 
          vehicles={vehicles} 
          lastVehicleElementRef={lastElementRef} 
        />
        {loading && <LoadingSpinner message="Carregando mais veículos..." />}
      </div>
    </div>
  );
};

export default Home; 