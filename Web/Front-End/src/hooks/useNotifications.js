import { useMemo } from "react";
import { useEnvironments } from "../context/EnvironmentsContext";

export const useNotifications = () => {
  const { environments } = useEnvironments();

  const notifications = useMemo(() => {
    let list = [];

    // ✅ VARIABLES QUE TE FALTABAN
    let alerts = 0;
    let warnings = 0;

    environments.forEach(env => {

      // 🚨 CO2
      if (env.co2 > 1000) {
        alerts++;

        list.push({
          id: `co2-${env.id}`,
          type: "danger",
          title: "notifications.co2High",
          message: "notifications.co2Message",
          data: {
            name: env.nameKey,
            value: env.co2
          },
          time: new Date()
        });
      }

      // 🌡️ TEMP
      if (env.temp > 28) {
        alerts++;

        list.push({
          id: `temp-${env.id}`,
          type: "danger",
          title: "notifications.tempHigh",
          message: "notifications.tempMessage",
          data: {
            name: env.nameKey,
            value: env.temp
          },
          time: new Date()
        });
      }

      // 🔊 NOISE
      if (env.noise > 70) {
        warnings++;

        list.push({
          id: `noise-${env.id}`,
          type: "warning",
          title: "notifications.warning",
          message: "notifications.warningMessage",
          data: {
            name: env.nameKey
          },
          time: new Date()
        });
      }

    });

    // 📊 RESUMEN (YA NO CRASHEA)
    list.push({
      id: "summary",
      type: "info",
      title: "notifications.dailySummary",
      message: "notifications.summaryMessage",
      data: {
        alerts: alerts || 0,
        warnings: warnings || 0
      },
      time: new Date()
    });

    return list;
  }, [environments]);

  return { notifications };
};