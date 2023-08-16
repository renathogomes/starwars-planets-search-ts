import { createContext } from 'react';

type ContextProp = {
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

export const MainContext = createContext({
  <MainContext.Provider 
} as ContextProp);
