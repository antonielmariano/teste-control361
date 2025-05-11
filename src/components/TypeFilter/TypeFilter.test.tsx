import { render, screen, fireEvent } from '@testing-library/react';
import TypeFilter from './index';

describe('TypeFilter', () => {
  const mockOnChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve renderizar os radio buttons corretamente', () => {
    render(
      <TypeFilter
        value="tracked"
        onChange={mockOnChange}
      />
    );

    expect(screen.getByLabelText('Rastreados')).toBeInTheDocument();
    expect(screen.getByLabelText('Não rastreados')).toBeInTheDocument();
  });

  it('deve chamar onChange quando um radio button é clicado', () => {
    render(
      <TypeFilter
        value="tracked"
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
        value="tracked"
        onChange={mockOnChange}
      />
    );

    const container = screen.getByTestId('type-filter-container');
    expect(container).toHaveClass('flex', 'gap-4');
  });

  it('deve ter o radio button correto selecionado', () => {
    render(
      <TypeFilter
        value="tracked"
        onChange={mockOnChange}
      />
    );

    const trackedRadio = screen.getByLabelText('Rastreados');
    expect(trackedRadio).toBeChecked();
  });

  it('deve ter o layout responsivo correto', () => {
    render(
      <TypeFilter
        value="tracked"
        onChange={mockOnChange}
      />
    );

    const container = screen.getByTestId('type-filter-container');
    expect(container).toHaveClass('flex', 'gap-4');
  });
}); 