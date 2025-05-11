import { render, screen } from '@testing-library/react';
import { VehicleInfoWindow } from './index';

describe('VehicleInfoWindow', () => {
  const mockVehicle = {
    id: '1',
    plate: 'ABC123',
    model: 'Fiat Uno',
    nameOwner: 'João',
    status: 'Ativo',
    createdAt: '2024-03-20',
    lat: -23.5505,
    lng: -46.6333,
    ignition: 'Ligado'
  };

  it('deve renderizar as informações do veículo corretamente', () => {
    render(<VehicleInfoWindow vehicle={mockVehicle} />);

    expect(screen.getByText('ABC123')).toBeInTheDocument();
    expect(screen.getByText('Fiat Uno')).toBeInTheDocument();
    expect(screen.getByText('João')).toBeInTheDocument();
    expect(screen.getByText('Ativo')).toBeInTheDocument();
    expect(screen.getByText('20/03/2024')).toBeInTheDocument();
    expect(screen.getByText('Ligado')).toBeInTheDocument();
  });

  it('deve ter as classes corretas', () => {
    render(<VehicleInfoWindow vehicle={mockVehicle} />);

    const container = screen.getByTestId('info-window-container');
    expect(container).toHaveClass('p-4', 'bg-white', 'rounded-lg', 'shadow-lg');
  });

  it('deve ter o status com a cor correta', () => {
    render(<VehicleInfoWindow vehicle={mockVehicle} />);

    const status = screen.getByText('Ativo');
    expect(status).toHaveClass('text-green-600');
  });

  it('deve ter a ignição com a cor correta', () => {
    render(<VehicleInfoWindow vehicle={mockVehicle} />);

    const ignition = screen.getByText('Ligado');
    expect(ignition).toHaveClass('text-green-600');
  });

  it('deve ter o layout correto das informações', () => {
    render(<VehicleInfoWindow vehicle={mockVehicle} />);

    const infoContainer = screen.getByTestId('info-window-container');
    expect(infoContainer).toHaveClass('space-y-2');
  });
}); 