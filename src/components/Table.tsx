import usePlanets from '../hook/usePlanets';

function Table() {
  const planets = usePlanets();

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
        { planets.length < 1 ? <h2>Loading...</h2>
          : planets.map((planet) => (
            <tr key={ planet.name }>
              <td>{planet.name}</td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}

export default Table;
