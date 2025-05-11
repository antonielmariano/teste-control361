import { render, screen } from '@testing-library/react';
import { MapTracker } from './index';
import { useGoogleMaps } from '../../../hooks/useGoogleMaps';
import { useMapMarkers } from '../../../hooks/useMapMarkers';

// Mock dos hooks
jest.mock('../../../hooks/useGoogleMaps');
jest.mock('../../../hooks/useMapMarkers');

describe('MapTracker', () => {
  const mockVehicles = [
    {
      id: '1',
      lat: -23.5505,
      lng: -46.6333,
      plate: 'ABC123',
      ignition: 'Ligado'
    }
  ];

  beforeEach(() => {
    // Mock do useGoogleMaps
    (useGoogleMaps as jest.Mock).mockReturnValue({
      isLoaded: true,
      loadError: null
    });

    // Mock do useMapMarkers
    (useMapMarkers as jest.Mock).mockReturnValue({
      markerElements: [],
      selectedVehicle: null,
      setSelectedVehicle: jest.fn()
    });
  });

  it('deve renderizar o mapa quando carregado', () => {
    render(<MapTracker vehicles={mockVehicles} />);
    expect(screen.getByTestId('map-container')).toBeInTheDocument();
  });

  it('deve mostrar mensagem de erro quando houver erro no carregamento', () => {
    (useGoogleMaps as jest.Mock).mockReturnValue({
      isLoaded: false,
      loadError: new Error('Erro ao carregar Google Maps')
    });

    render(<MapTracker vehicles={mockVehicles} />);
    expect(screen.getByText('Erro ao carregar o mapa')).toBeInTheDocument();
  });

  it('deve mostrar loading quando o mapa está carregando', () => {
    (useGoogleMaps as jest.Mock).mockReturnValue({
      isLoaded: false,
      loadError: null
    });

    render(<MapTracker vehicles={mockVehicles} />);
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
  });

  it('deve renderizar o mapa com os veículos fornecidos', () => {
    render(<MapTracker vehicles={mockVehicles} />);
    expect(screen.getByTestId('google-map')).toBeInTheDocument();
  });
}); 