import { ReactNode, createContext, useEffect, useState } from 'react';

const url = 'https://swapi.dev/api/planets';

type PlanetData = {
  climate: string;
  created: string;
  diameter: string;
  edited: string;
  films: string[];
  gravity: string;
  name: string;
  orbital_period: string;
  population: string;
  rotation_period: string;
  surface_water: string;
  terrain: string;
  url: string;
};

type ContextType = {
  planets: PlanetData[];
};

export const PlanetsContext = createContext<ContextType | undefined>(undefined);

type ContextProviderType = {
  children: ReactNode;
};

export function PlanetsProvider({ children }: ContextProviderType) {
  const [planets, setPlanets] = useState<PlanetData[]>([]);

  useEffect(() => {
    const fetchPlanets = async () => {
      const response = await fetch(url);
      const dataJson = await response.json();
      const data = dataJson.results;
      setPlanets(data);
    };

    fetchPlanets();
  }, []);

  return (
    <PlanetsContext.Provider value={ { planets } }>
      {children}
    </PlanetsContext.Provider>
  );
}
