import { render, screen } from '@testing-library/react';
import { Header } from './index';

describe('Header', () => {
  it('deve renderizar o nome do usuário corretamente', () => {
    render(<Header name="Antoniel Mariano" />);
    expect(screen.getByText('Antoniel Mariano')).toBeInTheDocument();
  });

  it('deve renderizar o título da aplicação', () => {
    render(<Header name="Antoniel Mariano" />);
    expect(screen.getByText('Mapa rastreador')).toBeInTheDocument();
  });

  it('deve ter a classe correta no container', () => {
    render(<Header name="Antoniel Mariano" />);
    const header = screen.getByRole('banner');
    expect(header).toHaveClass('bg-white', 'shadow');
  });

  it('deve ter a estrutura correta do layout', () => {
    render(<Header name="Antoniel Mariano" />);
    
    // Verifica se o container principal existe
    expect(screen.getByTestId('header-container')).toBeInTheDocument();
    
    // Verifica se o nome do usuário está dentro do container
    const nameContainer = screen.getByTestId('header-container');
    expect(nameContainer).toContainElement(screen.getByText('Antoniel Mariano'));
    
    // Verifica se o título está dentro do container
    expect(nameContainer).toContainElement(screen.getByText('Mapa rastreador'));
  });
}); 