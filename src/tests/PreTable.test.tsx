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

test('Ordena planetas por diâmetro em ordem descendente', async () => {
  render(<PlanetsProvider><PreTable /></PlanetsProvider>);

  const columnSortSelect = screen.getByTestId('column-sort');
  userEvent.selectOptions(columnSortSelect, 'diameter');

  const columnSortDescRadio = screen.getByTestId('column-sort-input-desc');
  userEvent.click(columnSortDescRadio);

  waitFor(() => {
    const planetNames = screen.getAllByTestId('planet-name');
    expect(planetNames[0]).toHaveTextContent('Bespin');
  });
});


test('Filtra planetas por período orbital corretamente', async () => {
  render(<PlanetsProvider><PreTable /></PlanetsProvider>);

  const columnFilterSelect = screen.getByTestId('column-filter');
  userEvent.selectOptions(columnFilterSelect, 'orbital_period');

  const comparisonFilterSelect = screen.getByTestId('comparison-filter');
  userEvent.selectOptions(comparisonFilterSelect, 'menor que');

  const valueFilterInput = screen.getByTestId('value-filter');
  userEvent.type(valueFilterInput, '5000');

  const filterButton = screen.getByTestId('button-filter');
  userEvent.click(filterButton);

  waitFor(() => {
    const planetNames = screen.getAllByTestId('planet-name');
    expect(planetNames.length).toBe(2);
    expect(planetNames[0]).toHaveTextContent('Tatooine');
  });
});
