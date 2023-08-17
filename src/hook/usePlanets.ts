import { useContext } from 'react';
import { PlanetsContext } from '../contexts/Context';

function usePlanets() {
  const planets = useContext(PlanetsContext);

  if (!planets) {
    throw new Error('Planets data not available');
  }

  return planets;
}

export default usePlanets;
