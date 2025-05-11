import { render, screen } from '@testing-library/react';
import { LoadingSpinner } from './index';

describe('LoadingSpinner', () => {
  it('deve renderizar o spinner corretamente', () => {
    render(<LoadingSpinner />);
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
  });

  it('deve ter as classes corretas', () => {
    render(<LoadingSpinner />);
    const spinner = screen.getByTestId('loading-spinner');
    expect(spinner).toHaveClass('animate-spin', 'h-5', 'w-5', 'text-white');
  });

  it('deve ter o SVG com os atributos corretos', () => {
    render(<LoadingSpinner />);
    const svg = screen.getByTestId('loading-spinner').querySelector('svg');
    expect(svg).toHaveAttribute('xmlns', 'http://www.w3.org/2000/svg');
    expect(svg).toHaveAttribute('fill', 'none');
    expect(svg).toHaveAttribute('viewBox', '0 0 24 24');
  });

  it('deve ter o círculo de loading com os atributos corretos', () => {
    render(<LoadingSpinner />);
    const circle = screen.getByTestId('loading-spinner').querySelector('circle');
    expect(circle).toHaveAttribute('stroke', 'currentColor');
    expect(circle).toHaveAttribute('stroke-width', '4');
  });

  it('deve ter o container com as classes corretas', () => {
    render(<LoadingSpinner />);
    const container = screen.getByTestId('loading-spinner-container');
    expect(container).toHaveClass('flex', 'items-center', 'justify-center', 'p-2');
  });
}); 