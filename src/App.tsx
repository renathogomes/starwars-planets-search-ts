import React, { ContextType } from 'react';
import './App.css';
import { Context } from './context/Contex';
import { MainContext } from './context/ContextType';

function App() {
  return (
    <MainContext.Provider
      value={ {
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
      } }
    >
      <span>Hello, App!</span>
      <Context />
    </MainContext.Provider>
  );
}

export default App;
