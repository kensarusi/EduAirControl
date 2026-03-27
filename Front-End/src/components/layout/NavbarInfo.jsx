import { useEffect, useState } from "react";

function NavbarInfo({ role }) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const fecha = time.toLocaleDateString();
  const hora = time.toLocaleTimeString();

  return (
    <div className="navbar-info">
      <span>
        Hola {role === "admin" ? "Administrador" : "Usuario"}
      </span>
      <span>{fecha} {hora}</span>
    </div>
  );
}

export default NavbarInfo;