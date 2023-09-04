import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PreTable from '../components/PreTable';
import { PlanetsProvider } from '../context/ContextProvider';
import { dataApi } from './dataApi';

const planets = dataApi.results;

test('Renderiza a tabela de planetas', () => {
  render(<PlanetsProvider><PreTable /></PlanetsProvider>);

  const table = screen.getByRole('table');
  expect(table).toBeInTheDocument();
});

test('Adiciona e remove filtro de população corretamente', async () => {
  render(<PlanetsProvider><PreTable /></PlanetsProvider>
  );

  const columnFilterSelect = screen.getByTestId('column-filter');
  userEvent.selectOptions(columnFilterSelect, 'population');

  const comparisonFilterSelect = screen.getByTestId('comparison-filter');
  userEvent.selectOptions(comparisonFilterSelect, 'maior que');

  const valueFilterInput = screen.getByTestId('value-filter');
  userEvent.type(valueFilterInput, '5000000');

  const filterButton = screen.getByTestId('button-filter');
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

