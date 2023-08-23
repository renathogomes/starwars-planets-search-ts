import { useState } from 'react';
import { ContextProviderType, PlanetType } from '../types';
import { PlanetsContext } from '../hook/usePlanets';

const url = 'https://swapi.dev/api/planets';

export function PlanetsProvider({ children }: ContextProviderType) {
  const [planets, setPlanets] = useState<PlanetType[]>([]);
  // const [globalFilter, setGlobalFilter] = useState<PlanetType[]>([]);

  const fetchPlanets = async () => {
    const response = await fetch(url);
    const dataJson = await response.json();
    delete dataJson.residents;

    const data = await dataJson.results;
    setPlanets(data);
  };

  return (
    <PlanetsContext.Provider
      value={ {
        planets,
        fetchPlanets,
        setPlanets,
      } }
    >
      {children}
    </PlanetsContext.Provider>
  );
}
