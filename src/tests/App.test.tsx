import { render, screen } from '@testing-library/react';
import App from '../App';
import { vi } from 'vitest';
import { PlanetsProvider } from '../context/ContextProvider';

afterEach(() => {
  vi.clearAllMocks();
});

beforeEach(() => {
  global.fetch = vi.fn().mockResolvedValue({
    json: async () => (dataApi),
  });
});

test('Testa se ao iniciar, inputs são renderizados na tela', () => {
  render(
    <PlanetsProvider>
      <App />
    </PlanetsProvider>
  );
  expect(screen.getByTestId('name-filter')).toBeInTheDocument();
  expect(screen.getByTestId('column-filter')).toBeInTheDocument();
  expect(screen.getByTestId('comparison-filter')).toBeInTheDocument();
  expect(screen.getByTestId('value-filter')).toBeInTheDocument();
  expect(screen.getByTestId('button-filter')).toBeInTheDocument();
});

