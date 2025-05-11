import { render, screen } from '@testing-library/react';
import MapTracker from './index';

describe('MapTracker', () => {
  const mockVehicles = [
    {
      id: '1',
      lat: -23.5505,
      lng: -46.6333,
      plate: 'ABC123',
      ignition: 'Ligado',
      fleet: 'Frota A',
      equipmentId: 'EQ123',
      name: 'Veículo 1',
      createdAt: '2024-03-20'
    }
  ];

  it('deve renderizar o mapa corretamente', () => {
    render(<MapTracker vehicles={mockVehicles} />);
    expect(screen.getByTestId('map-container')).toBeInTheDocument();
  });

  it('deve ter as classes corretas', () => {
    render(<MapTracker vehicles={mockVehicles} />);
    const map = screen.getByTestId('map-container');
    expect(map).toHaveClass('w-full', 'h-full');
  });

  it('deve renderizar os marcadores dos veículos', () => {
    render(<MapTracker vehicles={mockVehicles} />);
    expect(screen.getAllByTestId('vehicle-marker')).toHaveLength(mockVehicles.length);
  });

  it('deve ter o container com as classes corretas', () => {
    render(<MapTracker vehicles={mockVehicles} />);
    const container = screen.getByTestId('map-container');
    expect(container).toHaveClass('relative', 'w-full', 'h-full');
  });
}); 