function TechnologyCard({ title, description, icons, color }) {
  return (
    <div
      className="technology-card"
      style={{ "--accent": color }}
    >

      <h3>{title}</h3>

      <p>{description}</p>

      <div className="technology-icons">

        {icons.map(({ icon: Icon, name }) => (

          <div
            key={name}
            className="tech-item"
          >

            <Icon size={30} />

            <span>{name}</span>

          </div>

        ))}

      </div>

    </div>
  );
}

export default TechnologyCard;