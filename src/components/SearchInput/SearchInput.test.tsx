import { render, screen, fireEvent } from '@testing-library/react';
import SearchInput from './index';

describe('SearchInput', () => {
  const mockOnChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve renderizar o input corretamente', () => {
    render(
      <SearchInput
        value=""
        onChange={mockOnChange}
        placeholder="Buscar por placa ou frota"
      />
    );

    expect(screen.getByPlaceholderText('Buscar por placa ou frota')).toBeInTheDocument();
  });

  it('deve chamar onChange quando o input é modificado', () => {
    render(
      <SearchInput
        value=""
        onChange={mockOnChange}
        placeholder="Buscar por placa ou frota"
      />
    );

    const input = screen.getByPlaceholderText('Buscar por placa ou frota');
    fireEvent.change(input, { target: { value: 'ABC123' } });

    expect(mockOnChange).toHaveBeenCalledWith('ABC123');
  });

  it('deve ter as classes corretas', () => {
    render(
      <SearchInput
        value=""
        onChange={mockOnChange}
        placeholder="Buscar por placa ou frota"
      />
    );

    const input = screen.getByPlaceholderText('Buscar por placa ou frota');
    expect(input).toHaveClass('w-full', 'px-4', 'py-2', 'border', 'rounded-lg');
  });

  it('deve ter o valor correto', () => {
    render(
      <SearchInput
        value="ABC123"
        onChange={mockOnChange}
        placeholder="Buscar por placa ou frota"
      />
    );

    const input = screen.getByPlaceholderText('Buscar por placa ou frota');
    expect(input).toHaveValue('ABC123');
  });

  it('deve ter o container com as classes corretas', () => {
    render(
      <SearchInput
        value=""
        onChange={mockOnChange}
        placeholder="Buscar por placa ou frota"
      />
    );

    const container = screen.getByTestId('search-input-container');
    expect(container).toHaveClass('relative', 'w-full');
  });
}); 