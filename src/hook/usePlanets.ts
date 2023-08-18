import { useContext } from 'react';
import { PlanetsContext } from '../contexts/ContextProvider';

function usePlanets() {
  const context = useContext(PlanetsContext);

  if (!context) {
    throw new Error('PlanetsContext não está disponivel');
  }

  return context.planets;
}

export default usePlanets;
