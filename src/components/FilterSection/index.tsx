import type { FC } from 'react';
import TypeFilter from '../TypeFilter';
import SearchInput from '../SearchInput';

interface FilterSectionProps {
  type: 'tracked' | 'others';
  onTypeChange: (type: 'tracked' | 'others') => void;
  filter: string;
  onFilterChange: (filter: string) => void;
  onSearch: () => void;
}

export const FilterSection: FC<FilterSectionProps> = ({
  type,
  onTypeChange,
  filter,
  onFilterChange,
  onSearch
}) => (
  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
    <TypeFilter value={type} onChange={onTypeChange} />
    <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
      <SearchInput 
        value={filter} 
        onChange={onFilterChange} 
        placeholder="Buscar por placa ou frota" 
      />
      <button 
        className="bg-[#0094FF] text-white rounded-lg px-6 py-2 font-semibold w-full md:w-auto" 
        onClick={onSearch}
      >
        Buscar
      </button>
    </div>
  </div>
); 