import { PlanetType } from '../types';
import styles from './Table.module.css';

type PropsTable = {
  planets: PlanetType[],
  dataPlanets: PlanetType[],
  sorting: { column: string; sort: string };
  handleSort: (selectedColumn: string, selectedSort: string) => void;
};

const testOption = [
  'population',
  'orbital_period',
  'diameter',
  'rotation_perio',
  'surface_water',
];

function Table({ planets, dataPlanets, sorting, handleSort }: PropsTable) {
  return (
    <table className={ styles.tableContainer }>
      <thead>
        <section className={ styles.tableFilter }>
          <label htmlFor="columnSort">Ordenar por:</label>
          <select
            id="columnSort"
            value={ sorting.column }
            onChange={ (e) => handleSort(e.target.value, sorting.sort) }
              // data-testid="column-sort-select"
            data-testid="column-sort"
          >
            {testOption.map((option) => (
              <option
                key={ option }
                value={ option }
              >
                { option }
              </option>))}

          </select>
          <label htmlFor="asc">Ascendente</label>
          <input
            id="asc"
            type="radio"
            value="ASC"
            checked={ sorting.sort === 'ASC' }
            onChange={ () => handleSort(sorting.column, 'ASC') }
            data-testid="column-sort-input-asc"
          />
          <label htmlFor="asc">Descendente</label>
          <input
            id="desc"
            type="radio"
            value="DESC"
            checked={ sorting.sort === 'DESC' }
            onChange={ () => handleSort(sorting.column, 'DESC') }
            data-testid="column-sort-input-desc"
          />

          <button
            type="button"
            onClick={ () => handleSort(sorting.column, sorting.sort === 'ASC'
              ? 'DESC' : 'ASC') }
            data-testid="column-sort-button"
          >
            Ordenar
          </button>
        </section>
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
        {planets.length < 1 ? (
          <tr>
            <td>Loading...</td>
          </tr>
        ) : (
          dataPlanets.map((planet) => (
            <tr className={ styles.tableIndividual } key={ planet.name }>
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
          ))
        )}
      </tbody>
    </table>
  );
}

export default Table;
