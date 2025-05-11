import type { LocationVehicle } from '../../types/vehicle';
interface VehicleInfoWindowProps {
    vehicle: LocationVehicle;
    onClose: () => void;
}
export declare const VehicleInfoWindow: React.FC<VehicleInfoWindowProps>;
export {};
