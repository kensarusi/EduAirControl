import "./Header.css";
import { useTranslation } from "react-i18next";
import { ChevronDown, MapPin } from "lucide-react";

export default function Header() {
    const { t } = useTranslation();
    
    return (
        <div className="dashboard-header">

            <div className="header-info">

                <h2>{t("landing.hero.dashboard.headerTitle")}</h2>

                <span className="subtitle">{t("landing.hero.dashboard.headerSubtitle")}</span>

            </div>

            <div className="header-actions">

                <div className="room-selector-wrapper">
                    <MapPin size={16} className="selector-icon" />
                    <select className="premium-select">
                        <option>{t("landing.hero.dashboard.roomPrefix")} 209-1</option>
                        <option>{t("landing.hero.dashboard.roomPrefix")} 209-2</option>
                        <option>{t("landing.hero.dashboard.roomPrefix")} 209-3</option>
                    </select>
                    <ChevronDown size={16} className="selector-arrow" />
                </div>

                <div className="status-badge">

                    <span className="status-dot"></span>

                    <span className="status-text">{t("landing.hero.dashboard.statusOnline")}</span>

                </div>

            </div>

        </div>
    );
}
