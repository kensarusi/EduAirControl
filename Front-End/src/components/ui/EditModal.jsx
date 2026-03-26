import { useState } from 'react'
import { IoClose } from 'react-icons/io5'
import '../../styles/components/EditModal.css'

function EditModal({ field, value, onSave, onClose }) {
  const [newValue, setNewValue] = useState(value)

  const handleSave = () => {
    onSave(field, newValue)
    onClose()
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>
          <IoClose />
        </button>
        <h2>Actualizar {field}</h2>
        <input
          type="text"
          value={newValue}
          onChange={(e) => setNewValue(e.target.value)}
          className="modal-input"
        />
        <div className="modal-buttons">
          <button className="btn-cancel" onClick={onClose}>Cancelar</button>
          <button className="btn-save" onClick={handleSave}>Guardar</button>
        </div>
      </div>
    </div>
  )
}

export default EditModal
