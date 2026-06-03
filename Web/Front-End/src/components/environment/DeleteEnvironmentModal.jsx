import { useTranslation } from 'react-i18next'
import { IoTrashOutline, IoWarningOutline } from 'react-icons/io5'
import './AddEnvironmentModal.css'

function DeleteEnvironmentModal({ environment, onClose, onConfirm }) {
  const { t } = useTranslation()

  const name = environment.nameKey
    ? t(environment.nameKey)
    : (environment.name || '')

  return (
    <div className="env-modal-overlay" onClick={onClose}>
      <div className="env-modal env-modal--delete" onClick={(e) => e.stopPropagation()}>

        <div className="env-modal__delete-icon">
          <IoWarningOutline size={28} />
        </div>

        <h2 className="env-modal__title">
          {t('management.deleteTitle', 'Delete environment')}
        </h2>

        <p className="env-modal__delete-desc">
          {t('management.deleteDesc', 'Are you sure you want to delete')}{' '}
          <strong>{name}</strong>?{' '}
          {t('management.deleteWarning', 'This action cannot be undone.')}
        </p>

        <div className="env-modal__actions">
          <button className="env-modal__btn-cancel" onClick={onClose}>
            {t('management.cancelBtn', 'Cancel')}
          </button>
          <button
            className="env-modal__btn-delete"
            onClick={() => onConfirm(environment.id)}
          >
            <IoTrashOutline size={15} />
            {t('management.deleteConfirmBtn', 'Delete')}
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeleteEnvironmentModal
