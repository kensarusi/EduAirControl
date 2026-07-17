import "./HeroDashboard.css";

import Header from "./components/header/Header";
import MetricCard from "./components/MetricCard/MetricCard";
import MainChart from "./components/MainChart/MainChart";
import MiniWidget from "./components/MiniWidget/MiniWidget";

import {
    Activity,
    Leaf,
    Thermometer,
    Droplets,
    Bell,
    Database
} from "lucide-react";

export default function HeroDashboard() {

    return (

        <div className="dashboard-mockup">

            {/* ================= Header ================= */}

            <Header />

            {/* ================= Métricas superiores ================= */}

            <div className="dashboard-metrics">

                {/* IAQ */}
                
              <MetricCard
                  icon={Activity}
                  title="Índice AQI"
                  value="28"
                  unit=""
                  status="Excelente"
                  color="#4ADE80"
              >

                  <svg
                      className="mini-chart aqi-chart"
                      viewBox="0 0 120 40"
                  >

                      <path
                          d="M0 30
                            L15 28
                            L30 25
                            L45 20
                            L60 18
                            L75 15
                            L90 10
                            L105 14
                            L120 8"
                      />

                  </svg>

              </MetricCard>


                {/* CO2 */}

                <MetricCard

                    icon={Leaf}

                    title="CO₂"

                    value="612"

                    unit="ppm"

                    status="Buena"

                    color="#27F5D2"

                >

                    <svg
                        className="mini-chart co2-chart"
                        viewBox="0 0 120 40"
                    >

                        <path

                            d="M0 30 L15 26 L30 28 L45 22 L60 25 L75 18 L90 20 L105 12 L120 15"

                        />

                    </svg>

                </MetricCard>

                {/* Humedad */}

                <MetricCard

                    icon={Droplets}

                    title="Humedad"

                    value="48"

                    unit="%"

                    status="Optimo"

                    color="#38BDF8"

                >

                    <svg
                        className="mini-chart humidity-chart"
                        viewBox="0 0 120 40"
                    >

                        <path

                            d="M0 28 L15 24 L30 30 L45 18 L60 20 L75 15 L90 23 L105 12 L120 18"

                        />

                    </svg>

                </MetricCard>

                {/* Temperatura */}

                <MetricCard

                    icon={Thermometer}

                    title="Temperatura"

                    value="23.6"

                    unit="°C"

                    status="Confortable"

                    color="#FBBF24"

                >

                    <svg
                        className="mini-chart temp-chart"
                        viewBox="0 0 120 40"
                    >

                        <path

                            d="M0 32 L20 30 L40 26 L60 24 L80 20 L100 22 L120 18"

                        />

                    </svg>

                </MetricCard>

            </div>

            {/* ================= Gráfico Principal ================= */}

            <MainChart />

            {/* ================= Widgets inferiores ================= */}

            <div className="dashboard-grid">

                <MiniWidget

                    icon={Droplets}

                    title="Humedad"

                    value="48%"

                    subtitle="Optimo"

                    color="#38BDF8"

                />

                <MiniWidget

                    icon={Bell}

                    title="Alertas"

                    value="2"

                    subtitle="1 Critico • 1 Advertencia"

                    color="#F59E0B"

                />

                <MiniWidget

                    icon={Database}

                    title="Dispositivos"

                    value="18"

                    subtitle="16 Activos • 2 Desconectado"

                    color="#A855F7"

                />

                <MiniWidget

                    icon={Activity}

                    title="Calidad de Aire"

                    value="Buena"

                    subtitle="Ambiente Saludable"

                    color="#4ADE80"

                />

            </div>

        </div>

    );

}