import { useEffect } from 'react';

export const Context = async () => {
  useEffect(() => {
    const api = async () => {
      const response = await fetch('https://swapi.dev/api/planets');
      const dataJson = await response.json();
      const data = dataJson.results;
      console.log(data);
    };
    console.log(api());
  }, []);

  return (
    <p>
      {  }
    </p>
  );
};
