import { createContext, useContext, useState } from "react";
import environmentData from "../modules/environment/data/environmentData";

const EnvironmentContext = createContext();

export function EnvironmentProvider({ children }) {
  const [environments, setEnvironments] = useState(environmentData);

  const toggleFavorite = (id, favorite) => {
    setEnvironments((prev) =>
      prev.map((env) =>
        env.id === id
          ? {
              ...env,
              isFavorite: favorite,
            }
          : env
      )
    );
  };

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
}