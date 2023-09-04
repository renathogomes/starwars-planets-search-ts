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

    test('verifica se os dados da api são renderizados na tela', async () => {
      render(<PlanetsProvider><App /></PlanetsProvider>)
      const columnSelect = screen.getByLabelText('Colunas:');
      const comparisonSelect = screen.getByLabelText('Comparação:');
      const valueInput = screen.getByLabelText('Valor:');
  
      userEvent.selectOptions(columnSelect, 'population');
      userEvent.selectOptions(comparisonSelect, 'maior que');
      userEvent.type(valueInput, '');
      await waitFor(() => {
        const resultElement = screen.getByText('Tatooine');
        expect(resultElement).toBeInTheDocument();
      })
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
      const tatooineElement = screen.getByText('Tatooine');
      const nabooElement = screen.getByText('Naboo');
      const dagobahElement = screen.getByText('Dagobah');

      expect(tatooineElement).toBeInTheDocument();
      expect(nabooElement).toBeInTheDocument();
      expect(dagobahElement).toBeInTheDocument();
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

  test('verifica se ao digitar a letra "d" em Nome, as palavras "Alderaan", "Dagobah" e "Endor" são renderizadas', async () => {
    render(<PlanetsProvider><App /></PlanetsProvider>)
   
    const nameSelect = screen.getByLabelText('Nome:');
    
    userEvent.type(nameSelect, 'd');
    
    await waitFor(() => {
      const resultAlderaan = screen.getByText('Alderaan');
      const resultDagobah = screen.getByText('Dagobah');
      const resultEndor = screen.getByText('Endor');

      expect(resultAlderaan).toBeInTheDocument();
      expect(resultDagobah).toBeInTheDocument();
      expect(resultEndor).toBeInTheDocument();
    })
  });

  test('verifica se aparece a mensagem de "Loading..." na tela antes das informações da api serem renderizadas', async () => {
    render(<PlanetsProvider><App /></PlanetsProvider>)
    const loadingText = screen.getByText('Loading...');
    expect(loadingText).toBeInTheDocument();

    await waitFor(() => {
      const resultElement = screen.getByText('Tatooine');
      expect(resultElement).toBeInTheDocument();
      expect(loadingText).not.toBeInTheDocument();
    })
    });
  
  test('verifica se "Tatooine" é exibido quando a coluna "diameter" é "igual a" "10465"', async () => {
    render(<PlanetsProvider><App /></PlanetsProvider>)
    const columnSelect = screen.getByLabelText('Colunas:');
    const comparisonSelect = screen.getByLabelText('Comparação:');
    const valueInput = screen.getByLabelText('Valor:');
  
    userEvent.selectOptions(columnSelect, 'diameter');
    userEvent.selectOptions(comparisonSelect, 'igual a');
    userEvent.type(valueInput, '10465');
    await waitFor(() => {
      const resultElement = screen.getByText('Tatooine');
      expect(resultElement).toBeInTheDocument();
    })
  });

  test('verifica se "Naboo" é exibido quando a coluna "surface_water" é "igual a" "12"', async () => {
    render(<PlanetsProvider><App /></PlanetsProvider>)
    const columnSelect = screen.getByLabelText('Colunas:');
    const comparisonSelect = screen.getByLabelText('Comparação:');
    const valueInput = screen.getByLabelText('Valor:');
  
    userEvent.selectOptions(columnSelect, 'surface_water');
    userEvent.selectOptions(comparisonSelect, 'igual a');
    userEvent.type(valueInput, '12');
    await waitFor(() => {
      const resultElement = screen.getByText('Naboo');
      expect(resultElement).toBeInTheDocument();
    })
  });

  test('verifica se Yavin IV é renderizado na tela quando ordena por Ascendente', async () => {
    render(<PlanetsProvider><App /></PlanetsProvider>)
    const columnSelect = screen.getByTestId('column-sort');
  
    userEvent.selectOptions(columnSelect, 'population');
    await waitFor(() => {
      const resultElement = screen.getByText('Yavin IV');
      expect(resultElement).toBeInTheDocument();
    })
  });

});
