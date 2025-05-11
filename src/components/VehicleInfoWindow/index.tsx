import type { LocationVehicle } from '../../types/vehicle';
import { InfoWindow } from '@react-google-maps/api';

interface VehicleInfoWindowProps {
  vehicle: LocationVehicle;
  onClose: () => void;
}

export const VehicleInfoWindow: React.FC<VehicleInfoWindowProps> = ({ vehicle, onClose }) => {
  return (
    <InfoWindow
      position={{
        lat: vehicle.lat,
        lng: vehicle.lng
      }}
      onCloseClick={onClose}
      options={{
        pixelOffset: new google.maps.Size(0, -32)
      }}
    >
      <div className="p-2 min-w-[200px] bg-[#1a1a1a] rounded text-white">
        <h3 className="mb-2 text-base font-bold text-white">
          {vehicle.name} - {vehicle.plate}
        </h3>
        <p className="my-1 text-gray-300">Frota: {vehicle.fleet}</p>
        <p className="my-1 text-gray-300">Equipamento: {vehicle.equipmentId}</p>
        <p className={`my-1 font-bold ${
          vehicle.ignition === 'Ligado' ? 'text-green-400' : 'text-red-400'
        }`}>
          Ignição: {vehicle.ignition}
        </p>
        <p className="my-1 text-xs text-gray-400">
          Última atualização: {new Date(vehicle.createdAt).toLocaleString('pt-BR')}
        </p>
      </div>
    </InfoWindow>
  );
}; 