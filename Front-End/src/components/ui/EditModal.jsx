import { useState } from 'react'
import { IoClose } from 'react-icons/io5'
import '../../styles/components/EditModal.css'

const DATE_FORMATS = [
  { label: 'DD/MM/YYYY', example: (d) => `${d.dd}/${d.mm}/${d.yyyy}` },
  { label: 'MM/DD/YYYY', example: (d) => `${d.mm}/${d.dd}/${d.yyyy}` },
  { label: 'YYYY-MM-DD', example: (d) => `${d.yyyy}-${d.mm}-${d.dd}` },
  { label: 'DD-MM-YYYY', example: (d) => `${d.dd}-${d.mm}-${d.yyyy}` },
  { label: 'DD.MM.YYYY', example: (d) => `${d.dd}.${d.mm}.${d.yyyy}` },
  { label: 'YYYY/MM/DD', example: (d) => `${d.yyyy}/${d.mm}/${d.dd}` },
]

function getTodayParts() {
  const now = new Date()
  const dd   = String(now.getDate()).padStart(2, '0')
  const mm   = String(now.getMonth() + 1).padStart(2, '0')
  const yyyy = now.getFullYear()
  return { dd, mm, yyyy }
}

function EditModal({ field, value, onSave, onClose }) {
  const isDateFormat = field === 'dateFormat'

  const [newValue, setNewValue] = useState(value)
  const today = getTodayParts()

  const handleSave = () => {
    onSave(field, newValue)
    onClose()
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          <IoClose />
        </button>

        <h2>{isDateFormat ? 'Date format' : `Update ${field}`}</h2>

        {isDateFormat ? (
          <>
            <p className="modal-subtitle">Choose how dates are displayed across the app</p>

            <div className="format-chips">
              {DATE_FORMATS.map(({ label, example }) => (
                <button
                  key={label}
                  className={`format-chip ${newValue === label ? 'format-chip--active' : ''}`}
                  onClick={() => setNewValue(label)}
                >
                  <span className="chip-label">{label}</span>
                  <span className="chip-example">{example(today)}</span>
                </button>
              ))}
            </div>

            <div className="format-preview">
              <span className="preview-label">Preview</span>
              <span className="preview-value">
                {DATE_FORMATS.find(f => f.label === newValue)?.example(today) ?? newValue}
              </span>
            </div>
          </>
        ) : (
          <input
            type="text"
            value={newValue}
            onChange={(e) => setNewValue(e.target.value)}
            className="modal-input"
          />
        )}

        <div className="modal-buttons">
          <button className="btn-cancel" onClick={onClose}>Cancel</button>
          <button className="btn-save" onClick={handleSave}>Save</button>
        </div>
      </div>
    </div>
  )
}

export default EditModal