import { render, screen, fireEvent } from '@testing-library/react';
import { SearchInput } from './index';

describe('SearchInput', () => {
  const mockOnChange = jest.fn();
  const mockOnSearch = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve renderizar o input de busca corretamente', () => {
    render(
      <SearchInput
        value=""
        onChange={mockOnChange}
        onSearch={mockOnSearch}
      />
    );

    expect(screen.getByPlaceholderText('Buscar por placa ou frota')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Buscar' })).toBeInTheDocument();
  });

  it('deve chamar onChange quando o input é modificado', () => {
    render(
      <SearchInput
        value=""
        onChange={mockOnChange}
        onSearch={mockOnSearch}
      />
    );

    const input = screen.getByPlaceholderText('Buscar por placa ou frota');
    fireEvent.change(input, { target: { value: 'ABC123' } });

    expect(mockOnChange).toHaveBeenCalledWith('ABC123');
  });

  it('deve chamar onSearch quando o botão é clicado', () => {
    render(
      <SearchInput
        value="ABC123"
        onChange={mockOnChange}
        onSearch={mockOnSearch}
      />
    );

    const searchButton = screen.getByRole('button', { name: 'Buscar' });
    fireEvent.click(searchButton);

    expect(mockOnSearch).toHaveBeenCalled();
  });

  it('deve chamar onSearch quando Enter é pressionado', () => {
    render(
      <SearchInput
        value="ABC123"
        onChange={mockOnChange}
        onSearch={mockOnSearch}
      />
    );

    const input = screen.getByPlaceholderText('Buscar por placa ou frota');
    fireEvent.keyPress(input, { key: 'Enter', code: 13, charCode: 13 });

    expect(mockOnSearch).toHaveBeenCalled();
  });

  it('deve ter as classes corretas', () => {
    render(
      <SearchInput
        value=""
        onChange={mockOnChange}
        onSearch={mockOnSearch}
      />
    );

    const container = screen.getByTestId('search-input-container');
    expect(container).toHaveClass('flex', 'gap-2', 'w-full', 'md:w-auto');
  });
}); 