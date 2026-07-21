import { useMemo, useState } from "react";
import environmentData from "../modules/environment/data/environmentData";

export function useAllEnvironmentsVM() {

  const [environments, setEnvironments] = useState(environmentData);

  const [filters, setFilters] = useState({
    name: "",
    building: "",
    floor: "",
    favorite: false
  });


  const filtered = useMemo(() => {
  return environments.filter((env) => {

    const matchName =
      env.name
        .toLowerCase()
        .trim()
        .includes(filters.name.toLowerCase().trim());

    const matchBuilding =
      !filters.building ||
      env.building === filters.building;

    const matchFloor =
      !filters.floor ||
      env.floor === filters.floor;

    const matchFavorite =
      !filters.favorite ||
      env.isFavorite;

    return (
      matchName &&
      matchBuilding &&
      matchFloor &&
      matchFavorite
    );
  });
}, [environments, filters]);

  const counts = useMemo(() => ({

    total: environments.length,

    favorites: environments.filter(
      e => e.isFavorite
    ).length,

    normal: environments.filter(
      e => e.statusKey === "dashboard.statusNormal"
    ).length,

    warning: environments.filter(
      e => e.statusKey === "dashboard.statusWarning"
    ).length,

    alert: environments.filter(
      e => e.statusKey === "dashboard.statusAlert"
    ).length

  }), [environments]);

  const toggleFavorite = (id, favorite) => {

    setEnvironments((prev) =>
      prev.map((env) =>
        env.id === id
          ? {
              ...env,
              isFavorite: favorite
            }
          : env
      )
    );

  };

  const suggestions = useMemo(() => ({

    buildings: [...new Set(
      environments.map(e => e.building)
    )],

    floors: [...new Set(
      environments.map(e => e.floor)
    )]

  }), [environments]);

  return {

    environments,

    filtered,

    filters,

    setFilters,

    counts,

    suggestions,

    toggleFavorite

  };

}