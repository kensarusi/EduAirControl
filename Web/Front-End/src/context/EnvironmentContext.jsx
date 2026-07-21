import { createContext, useContext, useState } from "react";
import environmentData from "../modules/environment/data/environmentData";

const EnvironmentContext = createContext();

export function EnvironmentProvider({ children }) {

  const [environments, setEnvironments] = useState(environmentData);

  const toggleFavorite = (id, favorite) => {
    setEnvironments(prev =>
      prev.map(env =>
        env.id === id
          ? {
              ...env,
              isFavorite: favorite,
            }
          : env
      )
    );
  };

<<<<<<< Updated upstream
=======
  const addEnvironment = (environment) => {

    const newEnvironment = {
      ...environment,
      id: Date.now(),
      isFavorite: false,
    };

    setEnvironments(prev => [...prev, newEnvironment]);

  };

  const editEnvironment = (id, data) => {

    setEnvironments(prev =>
      prev.map(env =>
        env.id === id
          ? {
              ...env,
              ...data,
            }
          : env
      )
    );

  };

  const deleteEnvironment = (id) => {

    setEnvironments(prev =>
      prev.filter(env => env.id !== id)
    );

  };

>>>>>>> Stashed changes
  return (
    <EnvironmentContext.Provider
      value={{
        environments,
        toggleFavorite,
      }}
    >
      {children}
    </EnvironmentContext.Provider>
  );

}

export function useEnvironment() {
  return useContext(EnvironmentContext);
<<<<<<< Updated upstream
}
=======
}

export const useEnvironments = useEnvironment;
>>>>>>> Stashed changes
