import { renderHook, act } from '@testing-library/react';
import { useVehicles } from '../useVehicles';
import api from '../../config/api';

// Mock do api
jest.mock('../../config/api', () => ({
  __esModule: true,
  default: {
    get: jest.fn()
  }
}));

describe('useVehicles', () => {
  const mockVehicles = {
    content: {
      vehicles: [
        { id: '1', plate: 'ABC123', model: 'Fiat Uno', nameOwner: 'João', status: 'Ativo', createdAt: '2024-03-20' }
      ],
      locationVehicles: [
        { id: '1', lat: -23.5505, lng: -46.6333, plate: 'ABC123', ignition: 'Ligado' }
      ],
      totalPages: 2,
      perPage: 20
    }
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (api.get as jest.Mock).mockResolvedValue({ data: mockVehicles });
  });

  it('deve iniciar com estado inicial correto', () => {
    const { result } = renderHook(() => useVehicles());

    expect(result.current.vehicles).toEqual([]);
    expect(result.current.trackedVehicles).toEqual([]);
    expect(result.current.filter).toBe('');
    expect(result.current.page).toBe(1);
    expect(result.current.loading).toBe(false);
  });

  it('deve buscar veículos com sucesso', async () => {
    const { result } = renderHook(() => useVehicles());

    await act(async () => {
      await result.current.fetchVehicles(1, 'tracked');
    });

    expect(api.get).toHaveBeenCalledWith('recruitment/vehicles/list-with-paginate', {
      params: {
        type: 'tracked',
        page: 1,
        filter: '',
        perPage: 20
      }
    });

    expect(result.current.vehicles).toEqual(mockVehicles.content.vehicles);
    expect(result.current.trackedVehicles).toEqual(mockVehicles.content.locationVehicles);
    expect(result.current.totalPages).toBe(2);
  });

  it('deve atualizar o filtro corretamente', () => {
    const { result } = renderHook(() => useVehicles());

    act(() => {
      result.current.setFilter('ABC123');
    });

    expect(result.current.filter).toBe('ABC123');
  });

  it('deve lidar com erro na busca de veículos', async () => {
    const error = new Error('Erro na API');
    (api.get as jest.Mock).mockRejectedValue(error);

    const { result } = renderHook(() => useVehicles());

    await act(async () => {
      await result.current.fetchVehicles(1, 'tracked');
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.vehicles).toEqual([]);
  });
}); 