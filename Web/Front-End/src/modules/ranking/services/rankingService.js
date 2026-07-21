import rankingData from "../data/rankingData";

const rankingService = {

  async getRanking() {
    return rankingData;
  }

};

export default rankingService;