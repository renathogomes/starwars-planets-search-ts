import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PreTable from '../components/PreTable';
import { PlanetsProvider } from '../context/ContextProvider';
import { dataApi } from './dataApi';
import { vi } from 'vitest';

describe('Todos os testes da aplicação', () => {

    beforeEach(() => {
      global.fetch = vi.fn().mockResolvedValue({
        json: async () => (dataApi)
      })
    });
  
    afterEach(() => {
      vi.clearAllMocks();
    });
  

    test('Renderiza a tabela de planetas', () => {
    render(<PlanetsProvider><PreTable /></PlanetsProvider>);

    const table = screen.getByRole('table');
    expect(table).toBeInTheDocument();
    });

    test('Adiciona e remove filtro de população corretamente', async () => {
    render(<PlanetsProvider><PreTable /></PlanetsProvider>
    );

    const columnFilter = screen.getByTestId('column-filter');
    const comparisonFilter = screen.getByTestId('comparison-filter');
    const valueFilterInput = screen.getByTestId('value-filter');
    const filterButton = screen.getByTestId('button-filter');
    
    userEvent.selectOptions(columnFilter, 'population');
    userEvent.selectOptions(comparisonFilter, 'maior que');
    userEvent.type(valueFilterInput, '5000000');
    userEvent.click(filterButton);
    
    const filterTag = screen.getByTestId('filter');
    expect(filterTag).toBeInTheDocument();

    const removeFilterButton = screen.getByTestId('button-remove-filters');
    userEvent.click(removeFilterButton);

    waitFor(() => {
        const filterTags = screen.queryAllByTestId('filter');
        expect(filterTags.length).toBe(0);
    });
    });

    test('Ordena planetas por diâmetro em ordem descendente', async () => {
    render(<PlanetsProvider><PreTable /></PlanetsProvider>);

    const columnSort = screen.getByTestId('column-sort');
    userEvent.selectOptions(columnSort, 'diameter');

    const columnSortDescRadio = screen.getByTestId('column-sort-input-desc');
    userEvent.click(columnSortDescRadio);

    waitFor(() => {
        const planetNames = screen.getAllByTestId('planet-name');
        expect(planetNames[0]).toHaveTextContent('Bespin');
    });
    });


    test('Filtra planetas por período orbital corretamente', async () => {
    render(<PlanetsProvider><PreTable /></PlanetsProvider>);

    const columnFilter = screen.getByTestId('column-filter');
    userEvent.selectOptions(columnFilter, 'orbital_period');

    const comparisonFilterSelect = screen.getByTestId('comparison-filter');
    userEvent.selectOptions(comparisonFilterSelect, 'menor que');

    const valueFilter = screen.getByTestId('value-filter');
    userEvent.type(valueFilter, '5000');

    const filterButton = screen.getByTestId('button-filter');
    userEvent.click(filterButton);

    waitFor(() => {
        const planetNames = screen.getAllByTestId('planet-name');
        expect(planetNames.length).toBe(2);
        expect(planetNames[0]).toHaveTextContent('Tatooine');
    });
    });
});