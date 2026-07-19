import RankingCard from "./RankingCard";
import RankingSkeleton from "./RankingSkeleton";

function RankingList({

    environments,
    loading,
    search,
    filter,
    order

}) {

    if (loading) {

        return (

            <section className="ranking-list">

                {[1,2,3].map((item)=>(

                    <RankingSkeleton key={item}/>

                ))}

            </section>

        );

    }

    const filtered = environments.filter((environment) => {

        const matchesSearch = environment.name
            .toLowerCase()
            .includes(search.toLowerCase());

        const matchesFilter =
            filter === "Todos" ||
            environment.status === filter;

        return matchesSearch && matchesFilter;

    });

    const ordered = [...filtered].sort((a, b) => {

        if (order === "asc") {
            return a.score - b.score;
        }

        return b.score - a.score;

    });

    if(ordered.length===0){

        return(

            <section className="ranking-empty">

                <h2>

                    📡 No se encontraron ambientes

                </h2>

                <p>

                    Intenta cambiar los filtros
                    o agregar nuevos ambientes.

                </p>

            </section>

        );

    }

        const rankingList = ordered.slice(3);

        return (

            <section className="ranking-list">

                {rankingList.map((environment) => (
                    <RankingCard
                        key={environment.id}
                        environment={environment}
                    />

                ))}

            </section>

        );

}

export default RankingList;