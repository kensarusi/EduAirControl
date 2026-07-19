import { useEffect, useState } from "react";

import Navbar from "../../dashboard/components/Navbar/Navbar";
import RankingHeader from "../components/RankingHeader";
import RankingStats from "../components/RankingStats";
import RankingFilters from "../components/RankingFilters";
import RankingTopThree from "../components/RankingTopThree";
import RankingList from "../components/RankingList";

import { getRanking } from "../services/rankingService";

import "../styles/rankingScreen.css";

function RankingScreen() {

    const [environments, setEnvironments] = useState([]);

    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");

    const [filter, setFilter] = useState("Todos");

    const [order, setOrder] = useState("desc");

    useEffect(() => {

        getRanking().then((data) => {

            setEnvironments(data);

            setLoading(false);

        });

    }, []);

     const filteredEnvironments = environments.filter((environment)=>{

        const matchesSearch = environment.name
            .toLowerCase()
            .includes(search.toLowerCase());

        const matchesFilter =
            filter === "Todos" ||
            environment.status === filter;

        return matchesSearch && matchesFilter;

    });

return (
    <>
        <Navbar />

        <main className="ranking-screen">

            <RankingHeader />

            <RankingStats
                environments={filteredEnvironments}
            />

            <RankingFilters
                search={search}
                setSearch={setSearch}
                filter={filter}
                setFilter={setFilter}
                order={order}
                setOrder={setOrder}
            />

            <RankingTopThree
                environments={filteredEnvironments}
            />

            <RankingList
                environments={filteredEnvironments}
                loading={loading}
                search={search}
                filter={filter}
                order={order}
            />

        </main>
    </>
);

}

export default RankingScreen;