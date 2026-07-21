function getRankingStatus(score) {

  if (score >= 90) {
    return {
      label: "dashboard.statusNormal",
      color: "#22c55e",
      background: "rgba(34,197,94,.15)"
    };
  }

  if (score >= 70) {
    return {
      label: "dashboard.statusWarning",
      color: "#f59e0b",
      background: "rgba(245,158,11,.15)"
    };
  }

  return {
    label: "dashboard.statusAlert",
    color: "#ef4444",
    background: "rgba(239,68,68,.15)"
  };

}

export default getRankingStatus;