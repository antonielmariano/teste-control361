import '@testing-library/jest-dom';

// Mock do import.meta.env
Object.defineProperty(globalThis, 'import', {
  value: { meta: { env: { VITE_API_URL: 'http://localhost' } } },
  writable: true,
});

// Mock do api
jest.mock('./config/api');

// Mock do Google Maps
const mockGoogleMaps = {
  maps: {
    Map: jest.fn(),
    Marker: jest.fn(),
    LatLng: jest.fn(),
    LatLngBounds: jest.fn(),
    event: {
      addListener: jest.fn(),
      removeListener: jest.fn(),
    },
  },
};

// Mock do objeto window.google
Object.defineProperty(window, 'google', {
  value: mockGoogleMaps,
  writable: true,
});

// Mock do IntersectionObserver
class MockIntersectionObserver {
  observe = jest.fn();
  unobserve = jest.fn();
  disconnect = jest.fn();
}

Object.defineProperty(window, 'IntersectionObserver', {
  writable: true,
  configurable: true,
  value: MockIntersectionObserver,
});

// Mock do ResizeObserver
class MockResizeObserver {
  observe = jest.fn();
  unobserve = jest.fn();
  disconnect = jest.fn();
}

Object.defineProperty(window, 'ResizeObserver', {
  writable: true,
  configurable: true,
  value: MockResizeObserver,
}); 