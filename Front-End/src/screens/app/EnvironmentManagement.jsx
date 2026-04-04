import { useState } from "react";
import { useTranslation } from "react-i18next";
import Navbar from "../../components/layout/Navbar";
import { MdEdit, MdDelete, MdAdd, MdClose } from "react-icons/md";
import { MdOutlineMeetingRoom } from "react-icons/md";
import "../../styles/app/environment.css";

function EnvironmentManagement() {
  const { t } = useTranslation();

  const INITIAL_ENVIRONMENTS = [
    { id: 1, nameKey: "management.env1", capacity: 30, location: "Room A" },
    { id: 2, nameKey: "management.env2", capacity: 25, location: "Room B" },
    { id: 3, nameKey: "management.env3", capacity: 20, location: "Room C" },
  ];

  const [environments, setEnvironments] = useState(INITIAL_ENVIRONMENTS);
  const [modal, setModal] = useState({ open: false, mode: "add", env: null });
  const [form, setForm] = useState({ name: "", capacity: "", location: "" });
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const openAdd = () => {
    setForm({ name: "", capacity: "", location: "" });
    setModal({ open: true, mode: "add", env: null });
  };

  const openEdit = (env) => {
    setForm({
      name: env.nameKey ? t(env.nameKey) : env.name,
      capacity: env.capacity,
      location: env.location,
    });
    setModal({ open: true, mode: "edit", env });
  };

  const closeModal = () => setModal({ open: false, mode: "add", env: null });

  const handleSave = () => {
    if (!form.name.trim()) return;
    if (modal.mode === "add") {
      setEnvironments([
        ...environments,
        {
          id: Date.now(),
          name: form.name,
          capacity: Number(form.capacity) || 0,
          location: form.location || "Unknown",
        },
      ]);
    } else {
      setEnvironments(
        environments.map((e) =>
          e.id === modal.env.id
            ? {
                ...e,
                nameKey: null,
                name: form.name,
                capacity: Number(form.capacity) || 0,
                location: form.location,
              }
            : e
        )
      );
    }
    closeModal();
  };

  const handleDelete = (id) => {
    setEnvironments(environments.filter((e) => e.id !== id));
    setDeleteConfirm(null);
  };

  return (
    <div className="mgmt-page">
      <Navbar />

      <div className="mgmt-container">
        <div className="mgmt-title-row">
          <MdOutlineMeetingRoom className="mgmt-title-icon" />
          <h1 className="mgmt-title">{t("management.title")}</h1>
        </div>

        <div className="mgmt-actions-top">
          <button className="btn-add-env" onClick={openAdd}>
            <MdAdd /> {t("management.addBtn")}
          </button>
        </div>

        <div className="mgmt-list">
          {environments.length === 0 ? (
            <div className="mgmt-empty">
              <p>{t("management.empty")}</p>
            </div>
          ) : (
            environments.map((env) => (
              <div className="mgmt-card" key={env.id}>
                <div className="mgmt-card-info">
                  <h3>{env.nameKey ? t(env.nameKey) : env.name}</h3>
                  <p><span>{t("management.capacity")}:</span> {env.capacity}</p>
                  <p><span>{t("management.location")}:</span> {env.location}</p>
                </div>
                <div className="mgmt-card-actions">
                  <button className="btn-edit" onClick={() => openEdit(env)}>
                    <MdEdit /> {t("management.editBtn")}
                  </button>
                  <button className="btn-delete" onClick={() => setDeleteConfirm(env.id)}>
                    <MdDelete /> {t("management.deleteBtn")}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Modal agregar/editar */}
      {modal.open && (
        <div className="mgmt-overlay" onClick={closeModal}>
          <div className="mgmt-modal" onClick={(e) => e.stopPropagation()}>
            <div className="mgmt-modal-header">
              <h3>{modal.mode === "add" ? t("management.addTitle") : t("management.editTitle")}</h3>
              <button className="btn-close" onClick={closeModal}><MdClose /></button>
            </div>
            <div className="mgmt-modal-body">
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
            <div className="mgmt-modal-footer">
              <button className="btn-cancel" onClick={closeModal}>{t("management.cancelBtn")}</button>
              <button className="btn-save" onClick={handleSave}>
                {modal.mode === "add" ? t("management.addConfirmBtn") : t("management.saveBtn")}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal confirmar eliminar */}
      {deleteConfirm && (
        <div className="mgmt-overlay" onClick={() => setDeleteConfirm(null)}>
          <div className="mgmt-modal mgmt-modal--sm" onClick={(e) => e.stopPropagation()}>
            <div className="mgmt-modal-header">
              <h3>{t("management.deleteTitle")}</h3>
              <button className="btn-close" onClick={() => setDeleteConfirm(null)}><MdClose /></button>
            </div>
            <div className="mgmt-modal-body">
              <p>{t("management.deleteMsg")}</p>
            </div>
            <div className="mgmt-modal-footer">
              <button className="btn-cancel" onClick={() => setDeleteConfirm(null)}>{t("management.cancelBtn")}</button>
              <button className="btn-delete-confirm" onClick={() => handleDelete(deleteConfirm)}>
                {t("management.deleteBtn")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default EnvironmentManagement;