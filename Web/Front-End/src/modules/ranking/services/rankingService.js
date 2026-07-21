import rankingData from "../data/RankingData";

const rankingService = {

  async getRanking() {
    return rankingData;
  }

};

export default rankingService;