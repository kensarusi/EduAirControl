import { useTranslation } from 'react-i18next'

function EnvironmentFilters({ filters, setFilters }) {
  const { t } = useTranslation()

  return (
    <div className="all-env-headers">
      <input
        type="text"
        placeholder={t('allEnvironments.ambiente')}
        value={filters.name}
        onChange={(e) => setFilters({ ...filters, name: e.target.value })}
      />

      <input
        type="text"
        placeholder="CO2"
        value={filters.co2}
        onChange={(e) => setFilters({ ...filters, co2: e.target.value })}
      />

      <input
        type="text"
        placeholder="dB"
        value={filters.db}
        onChange={(e) => setFilters({ ...filters, db: e.target.value })}
      />

      <input
        type="text"
        placeholder="Temp"
        value={filters.temp}
        onChange={(e) => setFilters({ ...filters, temp: e.target.value })}
      />
    </div>
  )
}

export default EnvironmentFilters