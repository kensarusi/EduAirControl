import "./DesignedFor.css";
import UserCard from "./UserCard";
import { users } from "./usersData";

function DesignedFor() {
  return (
    <section id="designed" className="designed-for">

      <span className="section-badge">
        Usuarios del sistema
      </span>

      <h2>
        Diseñado para
        <span> toda la comunidad educativa</span>
      </h2>

      <p>
        EduAirControl ofrece herramientas específicas para cada perfil,
        permitiendo una gestión ambiental eficiente dentro de las instituciones educativas.
      </p>

      <div className="users-grid">

        {users.map((user) => (
          <UserCard
            key={user.title}
            {...user}
          />
        ))}

      </div>

    </section>
  );
}

export default DesignedFor;