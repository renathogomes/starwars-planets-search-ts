import usePlanets from '../hook/usePlanets';

function Table() {
  const planets = usePlanets();

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Climate</th>
          <th>Created</th>
          <th>Diameter</th>
        </tr>
      </thead>
      <tbody>
        {planets.map((planet:any) => (
          <tr key={ planet.name }>
            <td>{planet.name}</td>
            <td>{planet.climate}</td>
            <td>{planet.created}</td>
            <td>{planet.diameter}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
