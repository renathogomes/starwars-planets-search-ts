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
    <>
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
      </thead>
      <table className={ styles.tableContainer }>
        <tbody className={ styles.conjunto }>
          <tr className={ styles.titles }>
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
            <th className={ styles.created }>Created</th>
            <th className={ styles.edited }>Edited</th>
            <th className={ styles.url }>URL</th>
          </tr>
          {planets.length < 1 ? (
            <tr>
              <td>Loading...</td>
            </tr>
          ) : (
            dataPlanets.map((planet) => (
              <tr className={ styles.tableIndividual } key={ planet.name }>
                <td data-testid="planet-name" className={ styles.name }>{planet.name}</td>
                <td className={ styles.rotation }>{planet.rotation_period}</td>
                <td className={ styles.orbital }>{planet.orbital_period}</td>
                <td className={ styles.diameter }>{planet.diameter}</td>
                <td className={ styles.climate }>{planet.climate}</td>
                <td className={ styles.gravity }>{planet.gravity}</td>
                <td className={ styles.terrain }>{planet.terrain}</td>
                <td className={ styles.surface }>{planet.surface_water}</td>
                <td className={ styles.population }>{planet.population}</td>
                <td className={ styles.film }>{planet.films}</td>
                <td className={ styles.created }>{planet.created}</td>
                <td className={ styles.edited }>{planet.edited}</td>
                <td className={ styles.url }>{planet.url}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </>
  );
}

export default Table;
