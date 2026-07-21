import { FaSearch } from "react-icons/fa";

import "../styles/rankingFilters.css";

function RankingFilters({

    search,
    setSearch,
    filter,
    setFilter,
    order,
    setOrder

}){

    return(

        <section className="ranking-filters">

            <div className="ranking-search">

                <FaSearch/>

                <input

                    type="text"

                    placeholder="Buscar ambiente..."

                    value={search}

                    onChange={(e)=>setSearch(e.target.value)}

                />

            </div>

            <div className="ranking-filter-buttons">

                <button

                    className={filter==="Todos"?"active":""}

                    onClick={()=>setFilter("Todos")}

                >

                    Todos

                </button>

                <button

                    className={filter==="Normal"?"active":""}

                    onClick={()=>setFilter("Normal")}

                >

                    🟢 Normales

                </button>

                <button

                    className={filter==="Advertencia"?"active":""}

                    onClick={()=>setFilter("Advertencia")}

                >

                    🟡 Advertencia

                </button>

                <button

                    className={filter==="Crítico"?"active":""}

                    onClick={()=>setFilter("Crítico")}

                >

                    🔴 Crítico

                </button>

            </div>

            <select

                value={order}

                onChange={(e)=>setOrder(e.target.value)}

            >

                <option value="desc">

                    Mayor Puntaje
                </option>

                <option value="asc">

                    Menor Puntaje

                </option>

            </select>

        </section>

    );

}

export default RankingFilters;