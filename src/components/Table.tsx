import { useEffect, useState } from 'react';
import { usePlanets } from '../hook/usePlanets';
import { PlanetType } from '../types';

function Table() {
  const { planets, fetchPlanets, setPlanets } = usePlanets();

  const [valueFilter, setValueFilter] = useState(0);
  const [nameFilter, setNameFilter] = useState('');
  const [column, setColumn] = useState('population');
  const [filterComparison, setFilterComparison] = useState('maior que');

  const [arrayFilter, setArrayFilter] = useState([] as any);

  const [arrayColumn, setArrayColumn] = useState([
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ]);

  useEffect(() => {
    fetchPlanets();
  }, []);

  const dataPlanets = planets
    .filter((element) => element.name
      .toLowerCase()
      .includes(nameFilter.toLowerCase()));

  useEffect(() => {
    let result: PlanetType[] = planets;
    console.log(arrayFilter, 'aaaa');

    if (!arrayFilter.length) {
      setPlanets(planets);
    } else {
      arrayFilter.forEach((filter: any) => {
        switch (filter.comparison) {
          case 'maior que':
            result = result
              .filter((p: any) => Number(p[filter.column]) > Number(filter.value));
            break;
          case 'menor que':
            result = result.filter(
              (p: any) => Number(p[filter.column]) < Number(filter.value),
            );
            break;
          case 'igual a':
            result = result.filter(
              (p: any) => Number(p[filter.column]) === Number(filter.value),
            );
            break;
          default:
            break;
        }
        setPlanets(result);
      });
    }
  }, [arrayFilter]);
  console.log(planets, 'bbbbb');

  const handleFilter = () => {
    setArrayFilter([...arrayFilter,
      { column,
        comparison: filterComparison,
        value: valueFilter,
      }]);

    setArrayColumn(arrayColumn.filter((filt:any) => filt !== column));
  };

  const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleFilter();
    if (arrayColumn.length > 1) setColumn(arrayColumn[1]);
  };

  const handleClickRemove = (index:string) => {
    setArrayFilter(arrayFilter.filter((filt:any) => filt.column !== index));
    setArrayColumn(arrayColumn.filter((prevColumn:any) => [...prevColumn, index]));
  };

  return (
    <>
      <form onSubmit={ handleSubmit }>
        <label htmlFor="column">Colunas:</label>
        <select
          id="column"
          name="column"
          value={ column }
          onChange={ (e) => setColumn(e.target.value) }
          data-testid="column-filter"
        >
          { arrayColumn.map((columnOption) => (
            <option
              key={ columnOption }
              value={ columnOption }
              data-testid={ columnOption }
            >
              {columnOption}

            </option>
          ))}
        </select>
        <label htmlFor="comparison">Comparação:</label>
        <select
          id="comparison"
          value={ filterComparison }
          data-testid="comparison-filter"
          onChange={ (e) => setFilterComparison(e.target.value) }
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
        <label htmlFor="value">Valor:</label>
        <input
          id="value"
          type="number"
          data-testid="value-filter"
          value={ valueFilter }
          onChange={ (e) => setValueFilter(e.target.value as unknown as number) }
        />
        <button
          type="submit"
          data-testid="button-filter"
        >
          Filtrar
        </button>
      </form>
      <label htmlFor="nameFilter">Nome:</label>
      <input
        id="nameFilter"
        type="text"
        value={ nameFilter }
        data-testid="name-filter"
        onChange={ (e) => setNameFilter(e.target.value) }
      />

      { arrayFilter.map((multFilter: any, index: number) => (

        <li key={ index } data-testid="filter">
          { `${multFilter.column} ${multFilter.comparison} ${multFilter.value}` }
          <button
            data-testid="button-remove-filters"
            onClick={ () => handleClickRemove(multFilter.column) }
          >
            X
          </button>
        </li>

      ))}
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
