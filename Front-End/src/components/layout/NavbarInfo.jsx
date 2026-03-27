import { useEffect, useState } from "react"

function NavbarInfo({ role }) {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="navbar-info">
      <span className="navbar-info-greeting">
        Hola {role === "admin" ? "Administrador" : "Usuario"}
      </span>
      <span className="navbar-info-time">
        {time.toLocaleDateString()} {time.toLocaleTimeString()}
      </span>
    </div>
  )
}

export default NavbarInfo