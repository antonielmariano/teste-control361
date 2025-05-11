import type { Vehicle, LocationVehicle } from '../types/vehicle';
export declare const useVehicles: () => {
    vehicles: Vehicle[];
    trackedVehicles: LocationVehicle[];
    filter: string;
    setFilter: import("react").Dispatch<import("react").SetStateAction<string>>;
    page: number;
    setPage: (newPage: number, type: "tracked" | "others") => void;
    totalPages: number;
    loading: boolean;
    fetchVehicles: (pageNumber: number, type: "tracked" | "others") => Promise<void>;
};
