import { render, screen } from '@testing-library/react';
import { VehicleTable } from './index';

describe('VehicleTable', () => {
  const mockVehicles = [
    {
      id: '1',
      plate: 'ABC123',
      model: 'Fiat Uno',
      nameOwner: 'João',
      status: 'Ativo',
      createdAt: '2024-03-20'
    }
  ];

  it('deve renderizar a tabela com os veículos fornecidos', () => {
    render(<VehicleTable vehicles={mockVehicles} />);
    
    // Verifica se os cabeçalhos estão presentes
    expect(screen.getByText('Placa')).toBeInTheDocument();
    expect(screen.getByText('Modelo')).toBeInTheDocument();
    expect(screen.getByText('Proprietário')).toBeInTheDocument();
    expect(screen.getByText('Status')).toBeInTheDocument();
    expect(screen.getByText('Data de Cadastro')).toBeInTheDocument();

    // Verifica se os dados dos veículos estão presentes
    expect(screen.getByText('ABC123')).toBeInTheDocument();
    expect(screen.getByText('Fiat Uno')).toBeInTheDocument();
    expect(screen.getByText('João')).toBeInTheDocument();
    expect(screen.getByText('Ativo')).toBeInTheDocument();
    expect(screen.getByText('20/03/2024')).toBeInTheDocument();
  });

  it('deve renderizar mensagem quando não houver veículos', () => {
    render(<VehicleTable vehicles={[]} />);
    expect(screen.getByText('Nenhum veículo encontrado')).toBeInTheDocument();
  });

  it('deve renderizar a tabela com a classe correta', () => {
    render(<VehicleTable vehicles={mockVehicles} />);
    const table = screen.getByRole('table');
    expect(table).toHaveClass('min-w-full', 'divide-y', 'divide-gray-200');
  });

  it('deve renderizar os cards em telas pequenas', () => {
    // Simula uma tela pequena
    window.innerWidth = 500;
    window.dispatchEvent(new Event('resize'));

    render(<VehicleTable vehicles={mockVehicles} />);
    
    // Verifica se os cards estão presentes
    expect(screen.getByText('ABC123')).toBeInTheDocument();
    expect(screen.getByText('Fiat Uno')).toBeInTheDocument();
    expect(screen.getByText('João')).toBeInTheDocument();
    expect(screen.getByText('Ativo')).toBeInTheDocument();
    expect(screen.getByText('20/03/2024')).toBeInTheDocument();
  });
}); 