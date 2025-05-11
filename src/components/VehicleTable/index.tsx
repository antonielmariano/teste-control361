import type { Vehicle } from '../../types/vehicle';

interface VehicleTableProps {
  vehicles: Vehicle[];
  lastVehicleElementRef: (node: HTMLTableRowElement | null) => void;
}

const VehicleTable = ({ vehicles, lastVehicleElementRef }: VehicleTableProps) => {
  return (
    <div>
      {/* Tabela para telas maiores */}
      <div className="hidden md:block">
        <table className="min-w-full border border-gray-200 rounded-2xl">
          <thead className="bg-[#1a1a1a]">
            <tr>
              <th className="px-4 py-3 border-b text-left text-white font-semibold">Placa</th>
              <th className="px-4 py-3 border-b text-left text-white font-semibold">Modelo</th>
              <th className="px-4 py-3 border-b text-left text-white font-semibold">Proprietário</th>
              <th className="px-4 py-3 border-b text-left text-white font-semibold">Status</th>
              <th className="px-4 py-3 border-b text-left text-white font-semibold">Data de Cadastro</th>
            </tr>
          </thead>
          <tbody className="bg-[#16232E]">
            {vehicles.map((vehicle, index) => (
              <tr 
                key={vehicle.id} 
                ref={index === vehicles.length - 1 ? lastVehicleElementRef : null}
                className="hover:bg-[#1a1a1a] transition-colors"
              >
                <td className="px-4 py-3 border-b text-white">{vehicle.plate}</td>
                <td className="px-4 py-3 border-b text-white">{vehicle.model}</td>
                <td className="px-4 py-3 border-b text-white">{vehicle.nameOwner}</td>
                <td className="px-4 py-3 border-b text-white capitalize">{vehicle.status}</td>
                <td className="px-4 py-3 border-b text-white">{new Date(vehicle.createdAt).toLocaleDateString('pt-BR')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Cards para telas menores */}
      <div className="md:hidden space-y-4">
        {vehicles.map((vehicle, index) => (
          <div
            key={vehicle.id}
            ref={index === vehicles.length - 1 ? lastVehicleElementRef : null}
            className="bg-[#16232E] rounded-xl p-4 border border-gray-200"
          >
            <div className="grid grid-cols-2 gap-2">
              <div>
                <p className="text-gray-400 text-sm">Placa</p>
                <p className="text-white font-medium">{vehicle.plate}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Modelo</p>
                <p className="text-white font-medium">{vehicle.model}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Proprietário</p>
                <p className="text-white font-medium">{vehicle.nameOwner}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Status</p>
                <p className="text-white font-medium capitalize">{vehicle.status}</p>
              </div>
              <div className="col-span-2">
                <p className="text-gray-400 text-sm">Data de Cadastro</p>
                <p className="text-white font-medium">{new Date(vehicle.createdAt).toLocaleDateString('pt-BR')}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VehicleTable; 