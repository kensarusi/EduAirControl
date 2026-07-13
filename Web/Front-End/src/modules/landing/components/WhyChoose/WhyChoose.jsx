import "./WhyChoose.css";
import {
  Cpu,
  BellRing,
  BarChart3,
  ShieldCheck,
} from "lucide-react";

function WhyChoose() {
  return (
    <section id="why" className="why">
        
      <span className="why-badge">
        ¿Por qué EduAirControl?
      </span>

      <h2>
        Todo lo que necesitas para
        <span> monitorear ambientes educativos</span>
      </h2>

      <p className="why-description">
        EduAirControl integra sensores IoT, análisis inteligente
        y visualización en tiempo real para mantener espacios
        saludables y seguros.
      </p>

       <div className="section-divider"></div>

      <div className="why-grid">

        <div className="why-card">
          <Cpu size={34}/>
          <h3>Sensores IoT</h3>
          <p>
            Captura datos ambientales en tiempo real
            desde múltiples dispositivos.
          </p>
        </div>

        <div className="why-card">
          <BellRing size={34}/>
          <h3>Alertas Inteligentes</h3>
          <p>
            Detecta riesgos automáticamente y notifica
            antes de que se conviertan en un problema.
          </p>
        </div>

        <div className="why-card">
          <BarChart3 size={34}/>
          <h3>Dashboard Analítico</h3>
          <p>
            Visualiza indicadores, gráficas e históricos
            desde cualquier lugar.
          </p>
        </div>

        <div className="why-card">
          <ShieldCheck size={34}/>
          <h3>Ambientes Seguros</h3>
          <p>
            Ayuda a mejorar la calidad del aire y el bienestar
            de estudiantes y docentes.
          </p>
        </div>

      </div>

    </section>
  );
}

export default WhyChoose;