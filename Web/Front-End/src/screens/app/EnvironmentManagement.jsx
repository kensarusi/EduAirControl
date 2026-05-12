import { useState } from "react"
import { useTranslation } from "react-i18next"
import Navbar from "../../components/layout/Navbar"
import { MdEdit, MdDelete, MdAdd, MdClose } from "react-icons/md"
import { MdOutlineMeetingRoom } from "react-icons/md"
import { useEnvironments } from "../../context/EnvironmentsContext"
import "../../styles/app/environment.css"

function EnvironmentManagement() {
  const { t } = useTranslation()
  const { environments, addEnvironment, editEnvironment, deleteEnvironment } = useEnvironments()

  const [drawer, setDrawer] = useState({ open: false, mode: "add", env: null })
  const [form, setForm] = useState({ name: "", capacity: "", location: "" })
  const [deleteConfirm, setDeleteConfirm] = useState(null)

  const openAdd = () => {
    setForm({ name: "", capacity: "", location: "" })
    setDrawer({ open: true, mode: "add", env: null })
  }

  const openEdit = (env) => {
    setForm({
      name: env.nameKey ? t(env.nameKey) : env.name,
      capacity: env.capacity,
      location: env.location,
    })
    setDrawer({ open: true, mode: "edit", env })
  }

  const closeDrawer = () => setDrawer({ open: false, mode: "add", env: null })

  const handleSave = () => {
    if (!form.name.trim()) return
    if (drawer.mode === "add") {
      addEnvironment({
        name: form.name,
        capacity: Number(form.capacity) || 0,
        location: form.location || "Unknown",
      })
    } else {
      editEnvironment(drawer.env.id, {
        nameKey: null,
        name: form.name,
        capacity: Number(form.capacity) || 0,
        location: form.location,
      })
    }
    closeDrawer()
  }

  const handleDelete = (id) => {
    deleteEnvironment(id)
    setDeleteConfirm(null)
    if (drawer.env?.id === id) closeDrawer()
  }

  return (
    <div className="mgmt-page">
      <Navbar />
      <div className="mgmt-container">

        {/* Header card: título + botón agregar */}
        <div className="mgmt-header-card">
          <div className="mgmt-header-left">
            <MdOutlineMeetingRoom className="mgmt-title-icon" />
            <h1 className="mgmt-title">{t("management.title")}</h1>
          </div>
          <button className="btn-add-env" onClick={openAdd}>
            <MdAdd /> {t("management.addBtn")}
          </button>
        </div>

        {/* Layout principal: lista + drawer lateral */}
        <div className={`mgmt-layout ${drawer.open ? "mgmt-layout--open" : ""}`}>

          {/* Lista de ambientes */}
          <div className="mgmt-list-panel">
            {environments.length === 0 ? (
              <div className="mgmt-empty">
                <p>{t("management.empty")}</p>
              </div>
            ) : (
              environments.map((env) => (
                <div
                  className={`mgmt-card ${drawer.env?.id === env.id ? "mgmt-card--active" : ""}`}
                  key={env.id}
                >
                  <div className="mgmt-card-info">
                    <h3>{env.nameKey ? t(env.nameKey) : env.name}</h3>
                    <p>
                      {t("management.capacity")}: {env.capacity} · {env.location}
                    </p>
                  </div>
                  <div className="mgmt-card-indicator">
                    <span
                      className={`mgmt-status-dot ${drawer.env?.id === env.id ? "mgmt-status-dot--active" : ""}`}
                    />
                    <div className="mgmt-card-actions">
                      <button
                        className="btn-edit"
                        onClick={() => openEdit(env)}
                        title={t("management.editBtn")}
                      >
                        <MdEdit />
                      </button>
                      <button
                        className="btn-delete"
                        onClick={() => setDeleteConfirm(env.id)}
                        title={t("management.deleteBtn")}
                      >
                        <MdDelete />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Drawer lateral inline */}
          {drawer.open && (
            <div className="mgmt-drawer">
              <div className="mgmt-drawer-header">
                <h3>
                  {drawer.mode === "add"
                    ? t("management.addTitle")
                    : t("management.editTitle")}
                </h3>
                <button className="btn-close" onClick={closeDrawer}>
                  <MdClose />
                </button>
              </div>

              <div className="mgmt-drawer-body">
                <label>{t("management.nameLabel")} *</label>
                <input
                  className="mgmt-input"
                  placeholder={t("management.namePlaceholder")}
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />

                <label>{t("management.capacityLabel")}</label>
                <input
                  className="mgmt-input"
                  type="number"
                  placeholder={t("management.capacityPlaceholder")}
                  value={form.capacity}
                  onChange={(e) => setForm({ ...form, capacity: e.target.value })}
                />

                <label>{t("management.locationLabel")}</label>
                <input
                  className="mgmt-input"
                  placeholder={t("management.locationPlaceholder")}
                  value={form.location}
                  onChange={(e) => setForm({ ...form, location: e.target.value })}
                />
              </div>

              <div className="mgmt-drawer-footer">
                <button className="btn-save btn-save--full" onClick={handleSave}>
                  {drawer.mode === "add"
                    ? t("management.addConfirmBtn")
                    : t("management.saveBtn")}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal confirmación eliminar */}
      {deleteConfirm && (
        <div className="mgmt-overlay" onClick={() => setDeleteConfirm(null)}>
          <div className="mgmt-modal mgmt-modal--sm" onClick={(e) => e.stopPropagation()}>
            <div className="mgmt-modal-header">
              <h3>{t("management.deleteTitle")}</h3>
              <button className="btn-close" onClick={() => setDeleteConfirm(null)}>
                <MdClose />
              </button>
            </div>
            <div className="mgmt-modal-body">
              <p>{t("management.deleteMsg")}</p>
            </div>
            <div className="mgmt-modal-footer">
              <button className="btn-cancel" onClick={() => setDeleteConfirm(null)}>
                {t("management.cancelBtn")}
              </button>
              <button
                className="btn-delete-confirm"
                onClick={() => handleDelete(deleteConfirm)}
              >
                {t("management.deleteBtn")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default EnvironmentManagement