import { useEffect, useState } from 'react';
import { usePlanets } from '../hook/usePlanets';

function Table() {
  const { planets, fetchPlanets, setPlanets } = usePlanets();

  const [valueFilter, setValueFilter] = useState('');
  const [nameFilter, setNameFilter] = useState('');
  const [column, setColumn] = useState('');
  const [filterComparison, setFilterComparison] = useState('');

  const [arrayFilter, setArrayFilter] = useState([] as any);

  useEffect(() => {
    fetchPlanets();
  }, [fetchPlanets]);

  const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setArrayFilter([...arrayFilter,
      { column,
        comparison: filterComparison,
        value: valueFilter,
      },
    ]);

    // let result: PlanetType[] = [];

    // arrayFilter.forEach((filter: any) => {
    //   if (filter.comparison === 'maior que') {
    //     result = planets.filter((p) => Number(p[column]) > Number(filter.value));
    //   }
    // });
    // setPlanets(result);
  };

  const test = planets
    .filter((element) => element.name.toLowerCase().includes(nameFilter.toLowerCase()));

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
          <option value="population">population</option>
          <option value="orbital_period">orbital_period</option>
          <option value="diameter">diameter</option>
          <option value="rotation_period">rotation_period</option>
          <option value="surface_water">surface_water</option>
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
          onChange={ (e) => setValueFilter(e.target.value) }
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
