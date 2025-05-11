import { renderHook } from '@testing-library/react';
import { useInfiniteScroll } from '../useInfiniteScroll';

describe('useInfiniteScroll', () => {
  const mockOnPageChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve retornar uma função de referência', () => {
    const { result } = renderHook(() => 
      useInfiniteScroll({
        loading: false,
        page: 1,
        totalPages: 2,
        onPageChange: mockOnPageChange
      })
    );

    expect(typeof result.current.lastElementRef).toBe('function');
  });

  it('não deve chamar onPageChange quando loading é true', () => {
    const { result } = renderHook(() => 
      useInfiniteScroll({
        loading: true,
        page: 1,
        totalPages: 2,
        onPageChange: mockOnPageChange
      })
    );

    const mockNode = document.createElement('tr');
    result.current.lastElementRef(mockNode);

    expect(mockOnPageChange).not.toHaveBeenCalled();
  });

  it('não deve chamar onPageChange quando page é igual a totalPages', () => {
    const { result } = renderHook(() => 
      useInfiniteScroll({
        loading: false,
        page: 2,
        totalPages: 2,
        onPageChange: mockOnPageChange
      })
    );

    const mockNode = document.createElement('tr');
    result.current.lastElementRef(mockNode);

    expect(mockOnPageChange).not.toHaveBeenCalled();
  });
}); 