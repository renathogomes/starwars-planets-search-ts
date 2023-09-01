import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { PlanetsProvider } from '../context/ContextProvider';
import { vi } from 'vitest'
import { dataApi } from './dataApi';

describe('Todos os testes da aplicação', () => {

  beforeEach(() => {
    global.fetch = vi.fn().mockResolvedValue({
      json: async () => dataApi
    })
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  test('verifica se na tela existe um elemento com o dataTestId = column-filter', () => {
    render(<PlanetsProvider><App /></PlanetsProvider>)
    const elementWithTestId = screen.getByTestId('column-filter');
    expect(elementWithTestId).toBeInTheDocument();
    });

  test('verifica se na tela existe um elemento com o dataTestId = comparison-filter', () => {
    render(<PlanetsProvider><App /></PlanetsProvider>)
    const elementWithTestId = screen.getByTestId('comparison-filter');
    expect(elementWithTestId).toBeInTheDocument();
    });

  test('verifica se na tela existe um elemento com o dataTestId = button-filter', () => {
    render(<PlanetsProvider><App /></PlanetsProvider>)
    const elementWithTestId = screen.getByTestId('button-filter');
    expect(elementWithTestId).toBeInTheDocument();
    });

  test('verifica se na tela existe um elemento com o dataTestId = name-filter', () => {
    render(<PlanetsProvider><App /></PlanetsProvider>)
    const elementWithTestId = screen.getByTestId('name-filter');
    expect(elementWithTestId).toBeInTheDocument();
    });

  test('verifica se "Tatooine" é exibido quando Coluna é "population", Comparação é "maior que" e Valor é "10000"', async () => {
    render(<PlanetsProvider><App /></PlanetsProvider>)
    const columnSelect = screen.getByLabelText('Colunas:');
    const comparisonSelect = screen.getByLabelText('Comparação:');
    const valueInput = screen.getByLabelText('Valor:');

    userEvent.selectOptions(columnSelect, 'population');
    userEvent.selectOptions(comparisonSelect, 'maior que');
    userEvent.type(valueInput, '10000');
    await waitFor(() => {
      const resultElement = screen.getByText('Tatooine');
      expect(resultElement).toBeInTheDocument();
    })
  });

  test('verifica se "Bespin" é exibido quando Coluna é "population", Comparação é "maior que" e Valor é "10000"', async () => {
    render(<PlanetsProvider><App /></PlanetsProvider>)
    const columnSelect = screen.getByLabelText('Colunas:');
    const comparisonSelect = screen.getByLabelText('Comparação:');
    const valueInput = screen.getByLabelText('Valor:');

    userEvent.selectOptions(columnSelect, 'rotation_period');
    userEvent.selectOptions(comparisonSelect, 'menor que');
    userEvent.type(valueInput, '18');
    await waitFor(() => {
      const resultElement = screen.getByText('Bespin');
      expect(resultElement).toBeInTheDocument();
    })
  });
});
