import "./Header.css";

export default function Header() {
    return (
        <div className="dashboard-header">

            <div>

                <h2>Descripción General</h2>

                <span>Datos ambientales en tiempo real</span>

            </div>

            <div className="header-actions">

                <select>

                    <option>Ambiente 209-1</option>
                    <option>Ambiente 209-2</option>
                    <option>Ambiente 209-3</option>

                </select>

                <div className="status">

                    <span className="status-dot"></span>

                    En Linea

                </div>

            </div>

        </div>
    );
}