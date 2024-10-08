import { useEffect, useState } from 'react';
import { usePlanets } from '../hook/usePlanets';
import { PlanetType } from '../types';
import Table from './Table';
import styles from './PreTable.module.css';

type SortingType = {
  column: string,
  sort: string,
};

function PreTable() {
  const { planets, fetchPlanets, setPlanets } = usePlanets();

  const [valueFilter, setValueFilter] = useState(0);
  const [nameFilter, setNameFilter] = useState('');
  const [column, setColumn] = useState('population');
  const [filterComparison, setFilterComparison] = useState('maior que');

  const [sorting,
    setSorting] = useState<SortingType>({ column: 'population', sort: 'ASC' });

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
    let result: PlanetType[] = [...planets];

    console.log(result);

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
            result = result
              .filter((p: any) => Number(p[filter.column]) < Number(filter.value));
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

  const sortPlanets = () => {
    const sortedPlanets = [...planets].sort((a, b) => {
      console.log(planets);
      const columnA = a[sorting.column as keyof PlanetType];
      const columnB = b[sorting.column as keyof PlanetType];

      if (columnB === 'unknown') {
        return sorting.sort === 'ASC' ? -1 : 1;
      }

      if (sorting.sort === 'ASC') {
        return Number(columnA) - Number(columnB);
      }

      return Number(columnB) - Number(columnA);
    });

    setPlanets(sortedPlanets);
  };

  const handleSort = (selectedColumn: string, selectedSort: string) => {
    setSorting({ column: selectedColumn, sort: selectedSort });
    sortPlanets();
  };

  return (
    <div className={ styles.preTableContainer }>
      <form onSubmit={ handleSubmit } className={ styles.preTableFilter }>
        <label htmlFor="column">Colunas:</label>
        <select
          id="column"
          name="column"
          value={ column }
          // onChange={ (e) => setSorting({ ...sorting, column: (e.target.value) }) }
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
      <section className={ styles.preTableName }>
        <label htmlFor="nameFilter">Nome:</label>
        <input
          id="nameFilter"
          type="text"
          value={ nameFilter }
          data-testid="name-filter"
          onChange={ (e) => setNameFilter(e.target.value) }
        />
      </section>

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
      <Table
        planets={ planets }
        dataPlanets={ dataPlanets }
        sorting={ sorting }
        handleSort={ handleSort }
      />
    </div>
  );
}

export default PreTable;
