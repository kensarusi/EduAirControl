import { useState } from "react";
import "../../styles/app/environment.css";

export default function EnvironmentManagement() {
  const [environments, setEnvironments] = useState([
    { id: 1, name: "Environment 290-1" },
    { id: 2, name: "Environment 290-2" },
    { id: 3, name: "Environment 290-3" },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [newEnv, setNewEnv] = useState("");

  //  agregar
  const handleAdd = () => {
    if (!newEnv.trim()) return;

    setEnvironments([
      ...environments,
      { id: Date.now(), name: newEnv },
    ]);

    setNewEnv("");
    setShowModal(false);
  };

  //  eliminar
  const handleDelete = (id) => {
    setEnvironments(environments.filter((env) => env.id !== id));
  };

  return (
    <div className="management-container">

      {/* Header */}
      <div className="header">
        <span className="back">← Back</span>
        <h1>Environment Management</h1>
      </div>

      {/* Botón agregar */}
      <button className="btn-add" onClick={() => setShowModal(true)}>
        + Add Environment
      </button>

      {/* Lista */}
      <div className="env-list">
        {environments.map((env) => (
          <div key={env.id} className="env-item">
            <span>{env.name}</span>

            <div className="actions">
              <button className="btn-edit">Edit</button>
              <button
                className="btn-delete"
                onClick={() => handleDelete(env.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Create Environment</h2>

            <input
              type="text"
              placeholder="Environment name"
              value={newEnv}
              onChange={(e) => setNewEnv(e.target.value)}
            />

            <div className="modal-actions">
              <button onClick={() => setShowModal(false)}>Cancel</button>
              <button onClick={handleAdd}>Save</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}