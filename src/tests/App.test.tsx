import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { PlanetsProvider } from '../context/ContextProvider';
import { vi } from 'vitest'
import { dataApi } from './dataApi';

describe('Todos os testes da aplicação', () => {

  beforeEach(() => {
    global.fetch = vi.fn().mockResolvedValue({
      json: async () => (dataApi)
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

  test('verifica se o checkbox Ascendente dica desmarcado após clicar em "Ordenar"', () => {
    render(<PlanetsProvider><App /></PlanetsProvider>)
    const ascendenteCheckbox = screen.getByLabelText('Ascendente')
    const buttonOrdenar = screen.getByText('Ordenar')

    userEvent.click(buttonOrdenar)
    expect(ascendenteCheckbox).not.toBeChecked();

  });

  test('verifica se o checkbox Ascendente marcado antes de clicar em "Ordenar"', () => {
    render(<PlanetsProvider><App /></PlanetsProvider>)
    const ascendenteCheckbox = screen.getByLabelText('Ascendente')
    expect(ascendenteCheckbox).toBeChecked();
  })

  test('Verifica se a Table tem 13 colunas', () => {
    render(<PlanetsProvider><App /></PlanetsProvider>)
    const table = screen.getByRole('table')

    const th = table.querySelectorAll('thead th')
    const td = table.querySelectorAll('tbody td')

    const total = th.length + td.length -1

    expect(total).toBe(13)
  })

  test('verifica se a os planetas estão ficando ordenados', async () => {
    render(<PlanetsProvider><App /></PlanetsProvider>)
    waitFor(() => {

      const columnSort = screen.getByTestId('column-sort')
      userEvent.selectOptions(columnSort, 'orbital_period')
    
      const columnSortDesc = screen.getByTestId('column-sort-input-desc')
       userEvent.click(columnSortDesc);

       const planetNames = screen.getAllByTestId('planet-name')
       expect(planetNames[0]).toHaveTextContent('Tatooine')
       expect(planetNames[1]).toHaveTextContent('Naboo')
       expect(planetNames[2]).toHaveTextContent('Dagobah')
    })
  })

  test('Botão de ordenação funciona corretamente', async () => {
    render(<PlanetsProvider><App /></PlanetsProvider>)
    
    waitFor(() => {

      const columnSort = screen.getByTestId('column-sort')
      userEvent.selectOptions(columnSort, 'orbital_period');
      
      const columnSortDesc = screen.getByTestId('column-sort-input-desc');
      userEvent.click(columnSortDesc);
     
      const planetNames = screen.getAllByTestId('planet-name');
      expect(planetNames[0]).toHaveTextContent('Tatooine');
      expect(planetNames[1]).toHaveTextContent('Naboo');
      expect(planetNames[2]).toHaveTextContent('Dagobah');
      
      const columnSortButton = screen.getByTestId('column-sort-button');
      userEvent.click(columnSortButton);
      
      expect(planetNames[0]).toHaveTextContent('Bespin');
      expect(planetNames[1]).toHaveTextContent('Yavin IV');
      expect(planetNames[2]).toHaveTextContent('Hoth');
    })
  });

  test('Botão "Remover Filtros" funciona corretamente', async () => {
    render(<PlanetsProvider><App /></PlanetsProvider>)
    
    const columnFilter = screen.getByTestId('column-filter');
    userEvent.selectOptions(columnFilter, 'diameter');
    const comparisonFilter = screen.getByTestId('comparison-filter');
    userEvent.selectOptions(comparisonFilter, 'maior que');
    const valueFilter = screen.getByTestId('value-filter');
    userEvent.type(valueFilter, '100');
    const filterButton = screen.getByTestId('button-filter');
    userEvent.click(filterButton);
    
    const removeFiltersButton = screen.getByTestId('button-remove-filters');
    userEvent.click(removeFiltersButton);
    
    expect(screen.queryByTestId('filtered-column')).toBeNull();
    expect(screen.queryByTestId('filtered-comparison')).toBeNull();
    expect(screen.queryByTestId('filtered-value')).toBeNull();
  });
});
