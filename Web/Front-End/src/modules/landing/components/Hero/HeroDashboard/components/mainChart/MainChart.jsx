import "./MainChart.css";

export default function MainChart() {

    return (

        <div className="main-chart">

            <div className="chart-top">

                <div>

                    <h3>Tendencia de la Calidad del Aire</h3>

                    <p>Monitoreo en tiempo real</p>

                </div>

                <select>

                    <option>Últimas 24 horas</option>
                    <option>Últimos 7 días</option>
                    <option>Último mes</option>

                </select>

            </div>

            <svg
                viewBox="0 0 900 260"
                preserveAspectRatio="none"
                className="chart-svg"
            >

                <defs>

                    <linearGradient
                        id="areaGradient"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                    >

                        <stop
                            offset="0%"
                            stopColor="#27F5D2"
                            stopOpacity=".28"
                        />

                        <stop
                            offset="100%"
                            stopColor="#27F5D2"
                            stopOpacity="0"
                        />

                    </linearGradient>

                    <linearGradient
                        id="lineGradient"
                        x1="0"
                        x2="1"
                    >

                        <stop offset="0%" stopColor="#27F5D2"/>

                        <stop offset="50%" stopColor="#49FFD8"/>

                        <stop offset="100%" stopColor="#6DFFC8"/>

                    </linearGradient>

                </defs>

                {/* Área inferior */}

                <path

                    className="chart-area"

                    d="

                    M0 190

                    C80 160 150 170 230 120

                    S390 60 470 110

                    S630 220 710 130

                    S820 80 900 100

                    L900 260

                    L0 260

                    Z

                    "

                />

                {/* Línea */}

                <path

                    className="chart-line"

                    d="

                    M0 190

                    C80 160 150 170 230 120

                    S390 60 470 110

                    S630 220 710 130

                    S820 80 900 100

                    "

                />

                {/* Puntos */}

                <circle className="chart-dot" cx="80" cy="160" r="5"/>

                <circle className="chart-dot" cx="230" cy="120" r="5"/>

                <circle className="chart-dot" cx="470" cy="110" r="5"/>

                <circle className="chart-dot" cx="710" cy="130" r="5"/>

                <circle className="chart-dot" cx="900" cy="100" r="5"/>

            </svg>

            <div className="chart-labels">

                <span>00:00</span>

                <span>06:00</span>

                <span>12:00</span>

                <span>18:00</span>

                <span>24:00</span>

            </div>

        </div>

    );

}