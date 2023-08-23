export type PlanetType = {
  name: string,
  rotation_period: string,
  orbital_period: string,
  diameter: string,
  climate: string,
  gravity: string,
  terrain: string,
  surface_water: string,
  population: string,
  films: string[],
  created: string,
  edited: string,
  url: string,
};

export type ContextProviderType = {
  children: React.ReactNode;
};

export type ContextType = {
  planets: PlanetType[];
  fetchPlanets: () => void;
  setPlanets: React.Dispatch<React.SetStateAction<PlanetType[]>>;
  // setGlobalFilter: React.Dispatch<React.SetStateAction<PlanetType[]>>
};
