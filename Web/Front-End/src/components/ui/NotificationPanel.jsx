import { useNotifications } from "../../hooks/useNotifications";
import "../../styles/components/NotificationPanel.css";
import { useTranslation } from "react-i18next";
import { useEffect, useRef } from "react";

function NotificationPanel({ isOpen, onClose, notifications }) {
  const { notifications: defaultNotifications } = useNotifications();
  const { t } = useTranslation();
  const panelRef = useRef();

  const finalNotifications = notifications?.length
    ? notifications
    : defaultNotifications;

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (panelRef.current && !panelRef.current.contains(e.target)) {
        onClose();
      }
    };

    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEsc);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="notif-overlay">
      <div className="notification-panel" ref={panelRef}>
        
        {/* HEADER */}
        <div className="notification-header">
          <h3>{t("notifications.title")}</h3>
          <button className="close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        {/* LISTA */}
        <div className="notification-list">
          {finalNotifications.length === 0 ? (
            <p className="empty">
              {t("notifications.empty")}
            </p>
          ) : (
            finalNotifications.map((n) => (
              <div key={n.id} className={`notification-card ${n.type}`}>
                
                {/* ICONO */}
                <div className="notification-icon">
                  {n.type === "danger" && "🚨"}
                  {n.type === "warning" && "⚠️"}
                  {n.type === "info" && "ℹ️"}
                </div>

                {/* CONTENIDO */}
                <div className="notification-content">
                  
                  {/* TÍTULO */}
                  <strong>
                    {t(n.title)}
                  </strong>

                  {/* MENSAJE DINÁMICO */}
                  <p>
                    {t(n.message, n.data)}
                  </p>

                  {/* HORA */}
                  <span className="time">
                    {n.time
                      ? new Date(n.time).toLocaleTimeString()
                      : ""}
                  </span>

                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default NotificationPanel;