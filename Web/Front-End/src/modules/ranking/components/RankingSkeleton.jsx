import "../styles/rankingSkeleton.css";

function RankingSkeleton() {

    return (

        <div className="ranking-skeleton">

            <div className="ranking-skeleton-header"></div>

            <div className="ranking-skeleton-progress"></div>

            <div className="ranking-skeleton-line"></div>

            <div className="ranking-skeleton-line short"></div>

            <div className="ranking-skeleton-grid">

                <div></div>
                <div></div>
                <div></div>
                <div></div>

            </div>

            <div className="ranking-skeleton-button"></div>

        </div>

    );

}

export default RankingSkeleton;