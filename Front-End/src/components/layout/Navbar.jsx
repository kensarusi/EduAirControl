import { useNavigate, useLocation } from 'react-router-dom'
import { MdOutlineMeetingRoom } from 'react-icons/md'
import { FaUser, FaHeart } from 'react-icons/fa'
import { IoStatsChart, IoSettings, IoLogOut } from 'react-icons/io5'
import '../../styles/Navbar.css'

function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()

  const menuItems = [
    { icon: <MdOutlineMeetingRoom />, label: 'Ambientes', path: '/dashboard' },
    { icon: <FaUser />, label: 'Mi perfil', path: '/profile' },
    { icon: <IoStatsChart />, label: 'Actividad', path: '/all-environments' },
    { icon: <FaHeart />, label: 'Favoritos', path: '/favorites' },
    { icon: <IoSettings />, label: 'Configuración', path: '/settings' },
  ]

  const handleLogout = () => {
    console.log('Cerrando sesión...')
    navigate('/')
  }

  return (
    <nav className="navbar">
      <div className="navbar-logo" onClick={() => navigate('/dashboard')}>
        <h2>EduAirControl</h2>
      </div>
      <div className="navbar-menu">
        {menuItems.map((item) => (
          <div
            key={item.id}
            className={`navbar-item ${location.pathname === item.path ? 'active' : ''}`}
            onClick={() => navigate(item.path)}
          >
            {item.icon}
            <span>{item.label}</span>
          </div>
        ))}
        <div className="navbar-item logout" onClick={handleLogout}>
          <IoLogOut />
          <span>Cerrar sesión</span>
        </div>
      </div>
    </nav>
  )
}

export default Navbar