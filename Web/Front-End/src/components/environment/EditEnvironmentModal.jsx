import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import './AddEnvironmentModal.css'

const STATUS_OPTIONS = [
  { value: 'dashboard.statusNormal',  labelKey: 'dashboard.statusNormal',  fallback: 'Normal'  },
  { value: 'dashboard.statusWarning', labelKey: 'dashboard.statusWarning', fallback: 'Warning' },
  { value: 'dashboard.statusAlert',   labelKey: 'dashboard.statusAlert',   fallback: 'Alert'   },
]

function EditEnvironmentModal({ environment, onClose, onSave }) {
  const { t } = useTranslation()

  const defaultName = environment.nameKey
    ? t(environment.nameKey)
    : (environment.name || '')

  const defaultLocation = environment.locationKey
    ? t(environment.locationKey)
    : (environment.location || '')

  const [name,     setName]     = useState(defaultName)
  const [capacity, setCapacity] = useState(environment.capacity || '')
  const [location, setLocation] = useState(defaultLocation)
  const [statusKey, setStatusKey] = useState(
    environment.statusKey || 'dashboard.statusNormal'
  )

  const handleSubmit = () => {
    if (!name.trim()) return
    onSave(environment.id, {
      name:        name.trim(),
      nameKey:     null,
      capacity:    Number(capacity),
      location:    location.trim(),
      locationKey: null,
      statusKey,
      qualityKey:  null,
    })
    onClose()
  }

  return (
    <div className="env-modal-overlay" onClick={onClose}>
      <div className="env-modal" onClick={(e) => e.stopPropagation()}>
        <h2 className="env-modal__title">{t('management.editTitle', 'Edit Environment')}</h2>

        <label className="env-modal__label">{t('management.nameLabel', 'Name')}</label>
        <input
          className="env-modal__input"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label className="env-modal__label">{t('management.capacityLabel', 'Capacity')}</label>
        <input
          className="env-modal__input"
          type="number"
          value={capacity}
          onChange={(e) => setCapacity(e.target.value)}
        />

        <label className="env-modal__label">{t('management.locationLabel', 'Location')}</label>
        <input
          className="env-modal__input"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <label className="env-modal__label">{t('management.statusLabel', 'Status')}</label>
        <select
          className="env-modal__input env-modal__select"
          value={statusKey}
          onChange={(e) => setStatusKey(e.target.value)}
        >
          {STATUS_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {t(opt.labelKey, opt.fallback)}
            </option>
          ))}
        </select>

        <div className="env-modal__actions">
          <button className="env-modal__btn-cancel" onClick={onClose}>
            {t('management.cancelBtn', 'Cancel')}
          </button>
          <button className="env-modal__btn-save" onClick={handleSubmit}>
            {t('management.saveBtn', 'Save Changes')}
          </button>
        </div>
      </div>
    </div>
  )
}

export default EditEnvironmentModal