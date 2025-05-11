import type { Vehicle } from '../../types/vehicle';
interface VehicleTableProps {
    vehicles: Vehicle[];
    lastVehicleElementRef: (node: HTMLTableRowElement | HTMLDivElement | null) => void;
}
declare const VehicleTable: ({ vehicles, lastVehicleElementRef }: VehicleTableProps) => import("react/jsx-runtime").JSX.Element;
export default VehicleTable;
