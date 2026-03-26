import { useTranslation } from 'react-i18next'
import { IoTrendingUp, IoTrendingDown } from 'react-icons/io5'
import { TiWarning } from 'react-icons/ti'
import { MdShowChart } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import '../../styles/components/FilterBar.css'

function FilterBar({ activeFilter, setActiveFilter, counts }) {
  const navigate = useNavigate()
  const { t } = useTranslation()

  const filters = [
    { id: 'all', label: t('filterBar.all'), sublabel: t('filterBar.allSub'), icon: <MdShowChart />, color: '#5de6c8', count: null },
    { id: 'normal', label: t('filterBar.normal'), icon: <IoTrendingUp />, color: '#4CAF50', count: counts.normal },
    { id: 'warning', label: t('filterBar.warnings'), icon: <TiWarning />, color: '#FFC107', count: counts.warning },
    { id: 'alert', label: t('filterBar.alerts'), icon: <IoTrendingDown />, color: '#F44336', count: counts.alert },
  ]

  const handleClick = (filterId) => {
    if (filterId === 'all') navigate('/all-environments')
    else setActiveFilter(filterId)
  }

  return (
    <div className="filter-bar">
      {filters.map((filter) => (
        <button
          key={filter.id}
          className={`filter-btn ${activeFilter === filter.id ? 'active' : ''}`}
          onClick={() => handleClick(filter.id)}
          style={{
            borderColor: activeFilter === filter.id ? filter.color : undefined,
            backgroundColor: activeFilter === filter.id ? `${filter.color}15` : undefined,
          }}
        >
          <div className="filter-info">
            <span className="filter-label">{filter.label}</span>
            {filter.sublabel && <span className="filter-sublabel">{filter.sublabel}</span>}
            {filter.count !== null && (
              <span className="filter-count" style={{ color: filter.color }}>
                {filter.count}
              </span>
            )}
          </div>
          <div className="filter-icon" style={{ color: filter.color }}>{filter.icon}</div>
        </button>
      ))}
    </div>
  )
}

export default FilterBar
