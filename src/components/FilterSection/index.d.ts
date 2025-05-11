import type { FC } from 'react';
interface FilterSectionProps {
    type: 'tracked' | 'others';
    onTypeChange: (type: 'tracked' | 'others') => void;
    filter: string;
    onFilterChange: (filter: string) => void;
    onSearch: () => void;
}
export declare const FilterSection: FC<FilterSectionProps>;
export {};
