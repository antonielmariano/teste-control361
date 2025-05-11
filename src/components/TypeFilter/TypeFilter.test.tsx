import { render, screen, fireEvent } from '@testing-library/react';
import { TypeFilter } from './index';

describe('TypeFilter', () => {
  const mockOnChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve renderizar os radio buttons corretamente', () => {
    render(
      <TypeFilter
        selectedType="tracked"
        onChange={mockOnChange}
      />
    );

    expect(screen.getByLabelText('Rastreados')).toBeInTheDocument();
    expect(screen.getByLabelText('Não rastreados')).toBeInTheDocument();
  });

  it('deve ter o tipo rastreado selecionado por padrão', () => {
    render(
      <TypeFilter
        selectedType="tracked"
        onChange={mockOnChange}
      />
    );

    const trackedRadio = screen.getByLabelText('Rastreados');
    expect(trackedRadio).toBeChecked();
  });

  it('deve chamar onChange quando o tipo é alterado', () => {
    render(
      <TypeFilter
        selectedType="tracked"
        onChange={mockOnChange}
      />
    );

    const untrackedRadio = screen.getByLabelText('Não rastreados');
    fireEvent.click(untrackedRadio);

    expect(mockOnChange).toHaveBeenCalledWith('untracked');
  });

  it('deve ter as classes corretas', () => {
    render(
      <TypeFilter
        selectedType="tracked"
        onChange={mockOnChange}
      />
    );

    const container = screen.getByTestId('type-filter-container');
    expect(container).toHaveClass('flex', 'gap-4');
  });

  it('deve ter os labels com as classes corretas', () => {
    render(
      <TypeFilter
        selectedType="tracked"
        onChange={mockOnChange}
      />
    );

    const labels = screen.getAllByRole('label');
    labels.forEach(label => {
      expect(label).toHaveClass('flex', 'items-center', 'gap-2', 'cursor-pointer');
    });
  });
}); 