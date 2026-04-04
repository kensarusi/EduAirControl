import { useNavigate, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { MdOutlineMeetingRoom } from 'react-icons/md'
import { FaUser, FaHeart } from 'react-icons/fa'
import { IoStatsChart, IoSettings, IoLogOut } from 'react-icons/io5'
import NavbarInfo from './NavbarInfo'
import '../../styles/layout/Navbar.css'

function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()
  const { t } = useTranslation()

  const menuItems = [
    { icon: <MdOutlineMeetingRoom />, label: t('nav.environments'), path: '/dashboard' },
    { icon: <FaUser />,               label: t('nav.profile'),      path: '/profile' },
    { icon: <IoStatsChart />,         label: t('nav.activity'),     path: '/all-environments' },
    { icon: <FaHeart />,              label: t('nav.favorites'),    path: '/favorites' },
    { icon: <IoSettings />,           label: t('nav.settings'),     path: '/settings' },
    { icon: <MdOutlineMeetingRoom />, label: t('nav.management'), path: '/management' }, 
   ]

  const menu = (
    <div className="navbar-menu">
      {menuItems.map((item) => (
        <div
          key={item.path}
          className={`navbar-item ${location.pathname === item.path ? 'active' : ''}`}
          onClick={() => navigate(item.path)}
        >
          {item.icon}
          <span>{item.label}</span>
        </div>
      ))}
      <div className="navbar-item logout" onClick={() => navigate('/')}>
        <IoLogOut />
        <span>{t('nav.logout')}</span>
      </div>
    </div>
  )

  return (
    <nav className="navbar">
      {/* Fila 1: logo + info (siempre juntos) */}
      <div className="navbar-top-row">
        <div className="navbar-logo" onClick={() => navigate('/dashboard')}>
          <h2>EduAirControl</h2>
        </div>
        <NavbarInfo role="admin" />
      </div>

      {/* Fila 2 en móvil / misma fila en desktop */}
      {menu}
    </nav>
  )
}

export default Navbar