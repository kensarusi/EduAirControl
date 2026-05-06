import { useState, useRef, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { MdOutlineMeetingRoom } from 'react-icons/md'
import { FaUser, FaHeart, FaChevronDown, FaBell } from 'react-icons/fa'
import { IoStatsChart, IoSettings, IoLogOut } from 'react-icons/io5'

import NavbarInfo from './NavbarInfo'
import NotificationPanel from '../ui/NotificationPanel'

import '../../styles/layout/Navbar.css'

function Navbar() {
  const navigate  = useNavigate()
  const location  = useLocation()
  const { t }     = useTranslation()

  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [notificationsOpen, setNotificationsOpen] = useState(false)

  const dropdownRef = useRef(null)

  // cerrar dropdown al hacer click fuera
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const menuItems = [
    { icon: <MdOutlineMeetingRoom />, label: t('nav.environments'), path: '/dashboard' },
    { icon: <IoStatsChart />,         label: t('nav.activity'),     path: '/all-environments' },
    { icon: <FaHeart />,              label: t('nav.favorites'),    path: '/favorites' },
    { icon: <FaUser />,               label: t('nav.management'),   path: '/management' },
  ]

  const isProfileActive =
    location.pathname === '/profile' || location.pathname === '/settings'

  return (
    <>
      <nav className="navbar">

        {/* LOGO */}
        <div className="navbar-logo" onClick={() => navigate('/dashboard')}>
          <h2>EduAirControl</h2>
        </div>

        {/* INFO (saludo + hora) */}
        <NavbarInfo role="admin" />

        {/* MENU */}
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

          {/* 🔔 NOTIFICACIONES */}
          <div
            className="navbar-item notification-bell"
            onClick={() => setNotificationsOpen(true)}
          >
            <FaBell />
          </div>

          {/* 👤 PROFILE DROPDOWN */}
          <div
            className={`navbar-item navbar-profile ${isProfileActive ? 'active' : ''}`}
            onClick={() => setDropdownOpen((v) => !v)}
            ref={dropdownRef}
          >
            <FaUser />
            <span>{t('nav.profile')}</span>
            <FaChevronDown className={`profile-chevron ${dropdownOpen ? 'open' : ''}`} />

            {dropdownOpen && (
              <div className="profile-dropdown">

                <div
                  className="profile-dropdown-item"
                  onClick={(e) => {
                    e.stopPropagation()
                    navigate('/profile')
                    setDropdownOpen(false)
                  }}
                >
                  <FaUser />
                  <span>{t('nav.profile')}</span>
                </div>

                <div
                  className="profile-dropdown-item"
                  onClick={(e) => {
                    e.stopPropagation()
                    navigate('/settings')
                    setDropdownOpen(false)
                  }}
                >
                  <IoSettings />
                  <span>{t('nav.settings')}</span>
                </div>

                <div className="profile-dropdown-divider" />

                <div
                  className="profile-dropdown-item logout"
                  onClick={(e) => {
                    e.stopPropagation()
                    navigate('/')
                    setDropdownOpen(false)
                  }}
                >
                  <IoLogOut />
                  <span>{t('nav.logout')}</span>
                </div>

              </div>
            )}
          </div>

        </div>
      </nav>

      {/* PANEL DE NOTIFICACIONES */}
      <NotificationPanel
        isOpen={notificationsOpen}
        onClose={() => setNotificationsOpen(false)}
      />
    </>
  )
}

export default Navbar