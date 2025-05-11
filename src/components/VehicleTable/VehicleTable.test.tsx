import { render, screen } from '@testing-library/react';
import VehicleTable from './index';

describe('VehicleTable', () => {
  const mockVehicles = [
    {
      id: '1',
      plate: 'ABC123',
      model: 'Fiat Uno',
      nameOwner: 'João',
      status: 'Ativo',
      createdAt: '2024-03-20',
      fleet: 'Frota A',
      type: 'tracked'
    }
  ];

  const mockLastVehicleElementRef = jest.fn();

  it('deve renderizar a tabela corretamente', () => {
    render(
      <VehicleTable
        vehicles={mockVehicles}
        lastVehicleElementRef={mockLastVehicleElementRef}
      />
    );

    expect(screen.getByText('ABC123')).toBeInTheDocument();
    expect(screen.getByText('Fiat Uno')).toBeInTheDocument();
    expect(screen.getByText('João')).toBeInTheDocument();
    expect(screen.getByText('Ativo')).toBeInTheDocument();
    expect(screen.getByText('20/03/2024')).toBeInTheDocument();
  });

  it('deve renderizar mensagem quando não há veículos', () => {
    render(
      <VehicleTable
        vehicles={[]}
        lastVehicleElementRef={mockLastVehicleElementRef}
      />
    );

    expect(screen.getByText('Nenhum veículo encontrado')).toBeInTheDocument();
  });

  it('deve ter as classes corretas', () => {
    render(
      <VehicleTable
        vehicles={mockVehicles}
        lastVehicleElementRef={mockLastVehicleElementRef}
      />
    );

    const table = screen.getByRole('table');
    expect(table).toHaveClass('min-w-full', 'divide-y', 'divide-gray-200');
  });

  it('deve ter o status com a cor correta', () => {
    render(
      <VehicleTable
        vehicles={mockVehicles}
        lastVehicleElementRef={mockLastVehicleElementRef}
      />
    );

    const status = screen.getByText('Ativo');
    expect(status).toHaveClass('text-green-600');
  });

  it('deve ter o layout responsivo correto', () => {
    render(
      <VehicleTable
        vehicles={mockVehicles}
        lastVehicleElementRef={mockLastVehicleElementRef}
      />
    );

    const container = screen.getByTestId('vehicle-table-container');
    expect(container).toHaveClass('overflow-x-auto');
  });
}); 