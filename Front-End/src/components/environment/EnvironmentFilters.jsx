import { useTranslation } from 'react-i18next'

function EnvironmentFilters({ filters, setFilters }) {
  const { t } = useTranslation()

  const update = (key) => (e) => setFilters({ ...filters, [key]: e.target.value })

  return (
    <div className="all-env-headers">
      <input
        type="text"
        placeholder={t('allEnvironments.ambiente')}
        value={filters.name}
        onChange={update('name')}
      />
      <input
        type="text"
        placeholder="CO2"
        value={filters.co2}
        onChange={update('co2')}
      />
      <input
        type="text"
        placeholder="dB"
        value={filters.db}
        onChange={update('db')}
      />
      <input
        type="text"
        placeholder="Temp"
        value={filters.temp}
        onChange={update('temp')}
      />
    </div>
  )
}

export default EnvironmentFilters
