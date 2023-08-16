import { TableTypes } from '../types';

export function Table({
  climate,
  created,
  diameter,
  edited,
  films,
  gravity,
  name,
  orbital_period,
  population,
  rotation_period,
  surface_water,
  terrain,
  url,
}: TableTypes) {
  return (
    <table>
      <thead>
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
      </thead>
      <tbody>
        <td>{ name }</td>
        <td>{ rotation_period }</td>
        <td>{ orbital_period }</td>
        <td>{ diameter }</td>
        <td>{ climate }</td>
        <td>{ gravity }</td>
        <td>{ terrain }</td>
        <td>{ surface_water }</td>
        <td>{ population }</td>
        <td>{ films }</td>
        <td>{ created }</td>
        <td>{ edited }</td>
        <td>{ url }</td>
      </tbody>
    </table>
  );
}
