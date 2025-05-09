import type { Vehicle } from '../types/vehicle';

interface VehicleTableProps {
  vehicles: Vehicle[];
  lastVehicleElementRef: (node: HTMLTableRowElement | null) => void;
}

const VehicleTable = ({ vehicles, lastVehicleElementRef }: VehicleTableProps) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-200 rounded-2xl">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b text-center">Placa</th>
            <th className="px-4 py-2 border-b text-center">Modelo</th>
            <th className="px-4 py-2 border-b text-center">Proprietário</th>
            <th className="px-4 py-2 border-b text-center">Status</th>
            <th className="px-4 py-2 border-b text-center">Data de Cadastro</th>
          </tr>
        </thead>
        <tbody>
          {vehicles.map((vehicle, index) => (
            <tr 
              key={vehicle.id} 
              ref={index === vehicles.length - 1 ? lastVehicleElementRef : null}
            >
              <td className="px-4 py-2 border-b text-center">{vehicle.plate}</td>
              <td className="px-4 py-2 border-b text-center">{vehicle.model}</td>
              <td className="px-4 py-2 border-b text-center">{vehicle.nameOwner}</td>
              <td className="px-4 py-2 border-b capitalize text-center">{vehicle.status}</td>
              <td className="px-4 py-2 border-b text-center">{new Date(vehicle.createdAt).toLocaleDateString('pt-BR')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VehicleTable; 