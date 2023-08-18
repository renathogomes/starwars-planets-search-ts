import { useState } from 'react';
import usePlanets from '../hook/usePlanets';

function Table() {
  const planets = usePlanets();

  const [filter, setFilter] = useState('');
  const [column, setColumn] = useState('');

  const test = planets
    .filter((element) => element.name.toLowerCase().includes(filter.toLowerCase()));

  // const lo = 'reNatHo';
  // console.log(lo.toLocaleLowerCase().includes(lo.toLocaleLowerCase()));

  return (
    <>
      <label htmlFor="column">Colunas:</label>
      <select
        id={ column }
        onChange={ (e) => setColumn(e.target.value) }
        data-testid="column-filter"
      >
        <option value="">population</option>
        <option value="">orbital_period</option>
        <option value="">diameter</option>
        <option value="">rotation_period</option>
        <option value="">surface_water</option>
      </select>
      <label htmlFor="comparison">Comparação:</label>
      <select
        id="comparison"
        data-testid="comparison-filter"
      >
        <option value="">maior que</option>
        <option value="">menor que</option>
        <option value="">igual a</option>
      </select>
      <input
        type="number"
        data-testid="value-filter"
      />
      <button data-testid="button-filter">Filtrar</button>
      <input
        type="text"
        data-testid="name-filter"
        value={ filter }
        onChange={ (e) => setFilter(e.target.value) }
      />
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Rotation Period</th>
            <th>Orbital Period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface Water</th>
            <th>Population</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody>
          { planets.length < 1 ? <tr><td>Loading...</td></tr>
            : test.map((planet) => (
              <tr key={ planet.name }>
                <td>{planet.name}</td>
                <td>{planet.rotation_period}</td>
                <td>{planet.orbital_period}</td>
                <td>{planet.diameter}</td>
                <td>{planet.climate}</td>
                <td>{planet.gravity}</td>
                <td>{planet.terrain}</td>
                <td>{planet.surface_water}</td>
                <td>{planet.population}</td>
                <td>{planet.films}</td>
                <td>{planet.created}</td>
                <td>{planet.edited}</td>
                <td>{planet.url}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
}

export default Table;
