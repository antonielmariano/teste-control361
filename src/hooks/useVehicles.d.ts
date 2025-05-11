import type { Vehicle, LocationVehicle } from '../types/vehicle';
export declare const useVehicles: () => {
    vehicles: Vehicle[];
    trackedVehicles: LocationVehicle[];
    filter: string;
    setFilter: import("react").Dispatch<import("react").SetStateAction<string>>;
    page: number;
    setPage: (newPage: number, vehicleType: "tracked" | "others") => void;
    totalPages: number;
    loading: boolean;
    fetchVehicles: (pageNumber: number, vehicleType: "tracked" | "others") => Promise<void>;
    type: "tracked" | "others";
    setType: import("react").Dispatch<import("react").SetStateAction<"tracked" | "others">>;
};
