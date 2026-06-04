import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import './AddEnvironmentModal.css'

function AddEnvironmentModal({ onClose, onAdd }) {
  const { t } = useTranslation()

  const [name,     setName]     = useState('')
  const [capacity, setCapacity] = useState('')
  const [location, setLocation] = useState('')

  const handleSubmit = () => {
    if (!name.trim()) return
    onAdd({ name: name.trim(), capacity: Number(capacity) || 0, location: location.trim() })
    onClose()
  }

  return (
    <div className="env-modal-overlay" onClick={onClose}>
      <div className="env-modal" onClick={(e) => e.stopPropagation()}>
        <h2 className="env-modal__title">{t('management.addTitle', 'Add Environment')}</h2>

        <label className="env-modal__label">{t('management.nameLabel', 'Name')}</label>
        <input
          className="env-modal__input"
          placeholder={t('management.namePlaceholder', 'e.g. Environment 290-4')}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label className="env-modal__label">{t('management.capacityLabel', 'Capacity')}</label>
        <input
          className="env-modal__input"
          type="number"
          placeholder={t('management.capacityPlaceholder', 'e.g. 30')}
          value={capacity}
          onChange={(e) => setCapacity(e.target.value)}
        />

        <label className="env-modal__label">{t('management.locationLabel', 'Location')}</label>
        <input
          className="env-modal__input"
          placeholder={t('management.locationPlaceholder', 'e.g. Room A')}
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <div className="env-modal__actions">
          <button className="env-modal__btn-cancel" onClick={onClose}>
            {t('management.cancelBtn', 'Cancel')}
          </button>
          <button className="env-modal__btn-save" onClick={handleSubmit}>
            {t('management.addConfirmBtn', 'Add')}
          </button>
        </div>
      </div>
    </div>
  )
}

export default AddEnvironmentModal