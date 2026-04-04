import { useState } from "react";
import Navbar from "../../components/layout/Navbar";
import { MdEdit, MdDelete, MdAdd, MdClose } from "react-icons/md";
import { MdOutlineMeetingRoom } from "react-icons/md";
import "../../styles/app/environment.css";

const INITIAL_ENVIRONMENTS = [
  { id: 1, name: "Environment 290-1", capacity: 30, location: "Room A" },
  { id: 2, name: "Environment 290-2", capacity: 25, location: "Room B" },
  { id: 3, name: "Environment 290-3", capacity: 20, location: "Room C" },
];

function EnvironmentManagement() {
  const [environments, setEnvironments] = useState(INITIAL_ENVIRONMENTS);
  const [modal, setModal] = useState({ open: false, mode: "add", env: null });
  const [form, setForm] = useState({ name: "", capacity: "", location: "" });
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const openAdd = () => {
    setForm({ name: "", capacity: "", location: "" });
    setModal({ open: true, mode: "add", env: null });
  };

  const openEdit = (env) => {
    setForm({ name: env.name, capacity: env.capacity, location: env.location });
    setModal({ open: true, mode: "edit", env });
  };

  const closeModal = () => setModal({ open: false, mode: "add", env: null });

  const handleSave = () => {
    if (!form.name.trim()) return;
    if (modal.mode === "add") {
      setEnvironments([
        ...environments,
        { id: Date.now(), name: form.name, capacity: Number(form.capacity) || 0, location: form.location || "Unknown" },
      ]);
    } else {
      setEnvironments(environments.map((e) =>
        e.id === modal.env.id
          ? { ...e, name: form.name, capacity: Number(form.capacity) || 0, location: form.location }
          : e
      ));
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
        {/* Título */}
        <div className="mgmt-title-row">
          <MdOutlineMeetingRoom className="mgmt-title-icon" />
          <h1 className="mgmt-title">Environment Management</h1>
        </div>

        {/* Botón agregar */}
        <div className="mgmt-actions-top">
          <button className="btn-add-env" onClick={openAdd}>
            <MdAdd /> Add Environment
          </button>
        </div>

        {/* Lista */}
        <div className="mgmt-list">
          {environments.length === 0 ? (
            <div className="mgmt-empty">
              <p>No environments yet. Add one!</p>
            </div>
          ) : (
            environments.map((env) => (
              <div className="mgmt-card" key={env.id}>
                <div className="mgmt-card-info">
                  <h3>{env.name}</h3>
                  <p><span>Capacity:</span> {env.capacity}</p>
                  <p><span>Location:</span> {env.location}</p>
                </div>
                <div className="mgmt-card-actions">
                  <button className="btn-edit" onClick={() => openEdit(env)}>
                    <MdEdit /> Edit
                  </button>
                  <button className="btn-delete" onClick={() => setDeleteConfirm(env.id)}>
                    <MdDelete /> Delete
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
              <h3>{modal.mode === "add" ? "Add Environment" : "Edit Environment"}</h3>
              <button className="btn-close" onClick={closeModal}><MdClose /></button>
            </div>

            <div className="mgmt-modal-body">
              <label>Name *</label>
              <input
                className="mgmt-input"
                placeholder="e.g. Environment 290-4"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
              <label>Capacity</label>
              <input
                className="mgmt-input"
                type="number"
                placeholder="e.g. 30"
                value={form.capacity}
                onChange={(e) => setForm({ ...form, capacity: e.target.value })}
              />
              <label>Location</label>
              <input
                className="mgmt-input"
                placeholder="e.g. Room A"
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
              />
            </div>

            <div className="mgmt-modal-footer">
              <button className="btn-cancel" onClick={closeModal}>Cancel</button>
              <button className="btn-save" onClick={handleSave}>
                {modal.mode === "add" ? "Add" : "Save Changes"}
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
              <h3>Delete Environment</h3>
              <button className="btn-close" onClick={() => setDeleteConfirm(null)}><MdClose /></button>
            </div>
            <div className="mgmt-modal-body">
              <p>Are you sure you want to delete this environment? This action cannot be undone.</p>
            </div>
            <div className="mgmt-modal-footer">
              <button className="btn-cancel" onClick={() => setDeleteConfirm(null)}>Cancel</button>
              <button className="btn-delete-confirm" onClick={() => handleDelete(deleteConfirm)}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default EnvironmentManagement;