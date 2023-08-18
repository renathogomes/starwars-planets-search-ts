import { createContext, useContext } from 'react';
import { ContextType } from '../types';

export const PlanetsContext = createContext<ContextType>({
} as ContextType);

export const usePlanets = () => useContext(PlanetsContext);
