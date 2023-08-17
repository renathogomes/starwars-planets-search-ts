import { useContext } from 'react';
import { PlanetsProvider } from '../context/Contex';

function Table() {
  const planets = useContext(PlanetsProvider);

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Climate</th>
          <th>Created</th>
          <th>Diameter</th>
          {/* Adicione mais colunas aqui conforme necessário */}
        </tr>
      </thead>
      <tbody>
        {planets.map((planet) => (
          <tr key={planet.name}>
            <td>{planet.name}</td>
            <td>{planet.climate}</td>
            <td>{planet.created}</td>
            <td>{planet.diameter}</td>
            {/* Preencha as células da tabela com os outros campos */}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
