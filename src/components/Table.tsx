import { PlanetType } from '../types';

type PropsTable = {
  planets: PlanetType[],
  dataPlanets: PlanetType[],
};

function Table({ planets, dataPlanets }: PropsTable) {
  return (
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
          : dataPlanets.map((planet) => (
            <tr key={ planet.name }>
              <td data-testid="planet-name">{planet.name}</td>
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
  );
}

export default Table;

/*

      ))}
      <label htmlFor="columnSort">Ordenar por:</label>
      <select
        id="columnSort"
        value={ sorting.column }
        data-testid="column-sort"
        onChange={ (e) => setSorting({ ...sorting, column: e.target.value }) }
      >
        {arrayColumn.map((columnOption) => (
          <option key={ columnOption } value={ columnOption }>
            {columnOption}
          </option>
        ))}
      </select>
      <label>
        Ascendente
        <input
          type="radio"
          value="ASC"
          data-testid="sort-direction-asc"
          onChange={ () => setSorting({ ...sorting, sort: 'ASC' }) }
          checked={ sorting.sort === 'ASC' }
        />
      </label>
      <label>
        Descendente
        <input
          type="radio"
          value="DESC"
          data-testid="sort-direction-desc"
          onChange={ () => setSorting({ ...sorting, sort: 'DESC' }) }
          checked={ sorting.sort === 'DESC' }
        />
      </label>
      <button
        type="button"
        data-testid="column-sort-button"
        onClick={ handleSort }
      >
        Ordenar
      </button>

    */
