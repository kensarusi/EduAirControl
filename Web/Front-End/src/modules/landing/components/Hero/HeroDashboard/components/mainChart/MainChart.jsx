import "./MainChart.css";

export default function MainChart() {
    return (

        <div className="main-chart">

            <div className="chart-top">

                <h3>Tendencia de la calidad del aire</h3>

                <select>

                    <option>Ultimas 24 Horas</option>
                    <option>Ultimos 7 Dias</option>
                    <option>Ultimo Mes</option>

                </select>

            </div>

            <svg
                viewBox="0 0 900 260"
                preserveAspectRatio="none"
                className="chart-svg"
            >

                <defs>

                    <linearGradient
                        id="chartGradient"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                    >

                        <stop
                            offset="0%"
                            stopColor="#28F4D6"
                            stopOpacity=".35"
                        />

                        <stop
                            offset="100%"
                            stopColor="#28F4D6"
                            stopOpacity="0"
                        />

                    </linearGradient>

                    <linearGradient
                        id="lineGradient"
                        x1="0"
                        x2="1"
                    >

                        <stop offset="0%" stopColor="#27F5D2"/>
                        <stop offset="100%" stopColor="#6AFFC7"/>

                    </linearGradient>

                </defs>

                {/* Área */}

                <path

                    fill="url(#chartGradient)"

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

            </svg>

        </div>

    );
}