import "../styles/rankingHeader.css";

function RankingHeader() {

    return (

        <div className="ranking-header">

            <div className="ranking-header-info">

                <h1> Ranking de Ambientes</h1>

                <p>
                    Índice de Salud Ambiental calculado según
                    temperatura, CO₂, humedad y nivel de ruido.
                </p>

            </div>

            <button className="ranking-refresh-btn">

                Actualizar

            </button>

        </div>

    );

}

export default RankingHeader;