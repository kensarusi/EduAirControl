/**
 * ViewModel: useNotificationsVM
 * Genera la lista de notificaciones derivada del estado de ambientes.
 * Mueve lógica derivada fuera del hook utilitario.
 */

import { useMemo } from 'react'
import { useEnvironments } from '../context/EnvironmentsContext'

export function useNotificationsVM() {
  const { environments } = useEnvironments()

  const notifications = useMemo(() => {
    const list = []
    let alerts   = 0
    let warnings = 0

    environments.forEach((env) => {
      if (env.co2 > 1000) {
        alerts++
        list.push({
          id:      `co2-${env.id}`,
          type:    'danger',
          title:   'notifications.co2High',
          message: 'notifications.co2Message',
          data:    { name: env.nameKey, value: env.co2 },
          time:    new Date(),
        })
      }

      if (env.temp > 28) {
        alerts++
        list.push({
          id:      `temp-${env.id}`,
          type:    'danger',
          title:   'notifications.tempHigh',
          message: 'notifications.tempMessage',
          data:    { name: env.nameKey, value: env.temp },
          time:    new Date(),
        })
      }

      if (env.noise > 70) {
        warnings++
        list.push({
          id:      `noise-${env.id}`,
          type:    'warning',
          title:   'notifications.warning',
          message: 'notifications.warningMessage',
          data:    { name: env.nameKey },
          time:    new Date(),
        })
      }
    })

    list.push({
      id:      'summary',
      type:    'info',
      title:   'notifications.dailySummary',
      message: 'notifications.summaryMessage',
      data:    { alerts, warnings },
      time:    new Date(),
    })

    return list
  }, [environments])

  const unreadCount = notifications.filter((n) => n.type === 'danger').length

  return { notifications, unreadCount }
}
