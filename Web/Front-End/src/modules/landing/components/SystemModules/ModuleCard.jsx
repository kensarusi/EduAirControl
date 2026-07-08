import "./SystemModules.css";

function ModuleCard({ icon: Icon, title, description }) {
  return (
    <div className="module-card">

      <div className="module-icon">
        <Icon size={28} />
      </div>

      <div className="module-content">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>

    </div>
  );
}

export default ModuleCard;