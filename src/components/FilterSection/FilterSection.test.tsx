import { render, screen, fireEvent } from '@testing-library/react';
import { FilterSection } from './index';

describe('FilterSection', () => {
  const mockOnFilterChange = jest.fn();
  const mockOnSearch = jest.fn();
  const mockOnTypeChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve renderizar os filtros corretamente', () => {
    render(
      <FilterSection
        filter=""
        onFilterChange={mockOnFilterChange}
        onSearch={mockOnSearch}
        onTypeChange={mockOnTypeChange}
        selectedType="tracked"
      />
    );

    // Verifica se os radio buttons estão presentes
    expect(screen.getByLabelText('Rastreados')).toBeInTheDocument();
    expect(screen.getByLabelText('Não rastreados')).toBeInTheDocument();

    // Verifica se o campo de busca está presente
    expect(screen.getByPlaceholderText('Buscar por placa ou frota')).toBeInTheDocument();

    // Verifica se o botão de busca está presente
    expect(screen.getByRole('button', { name: 'Buscar' })).toBeInTheDocument();
  });

  it('deve chamar onFilterChange quando o input é modificado', () => {
    render(
      <FilterSection
        filter=""
        onFilterChange={mockOnFilterChange}
        onSearch={mockOnSearch}
        onTypeChange={mockOnTypeChange}
        selectedType="tracked"
      />
    );

    const input = screen.getByPlaceholderText('Buscar por placa ou frota');
    fireEvent.change(input, { target: { value: 'ABC123' } });

    expect(mockOnFilterChange).toHaveBeenCalledWith('ABC123');
  });

  it('deve chamar onSearch quando o botão de busca é clicado', () => {
    render(
      <FilterSection
        filter="ABC123"
        onFilterChange={mockOnFilterChange}
        onSearch={mockOnSearch}
        onTypeChange={mockOnTypeChange}
        selectedType="tracked"
      />
    );

    const searchButton = screen.getByRole('button', { name: 'Buscar' });
    fireEvent.click(searchButton);

    expect(mockOnSearch).toHaveBeenCalled();
  });

  it('deve chamar onTypeChange quando o tipo é alterado', () => {
    render(
      <FilterSection
        filter=""
        onFilterChange={mockOnFilterChange}
        onSearch={mockOnSearch}
        onTypeChange={mockOnTypeChange}
        selectedType="tracked"
      />
    );

    const untrackedRadio = screen.getByLabelText('Não rastreados');
    fireEvent.click(untrackedRadio);

    expect(mockOnTypeChange).toHaveBeenCalledWith('untracked');
  });

  it('deve ter o layout responsivo correto', () => {
    render(
      <FilterSection
        filter=""
        onFilterChange={mockOnFilterChange}
        onSearch={mockOnSearch}
        onTypeChange={mockOnTypeChange}
        selectedType="tracked"
      />
    );

    const container = screen.getByTestId('filter-section');
    expect(container).toHaveClass('flex', 'flex-col', 'md:flex-row', 'gap-4');
  });
}); 