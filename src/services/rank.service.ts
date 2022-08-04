import { PlayerMatchRepository } from "../repositories";

class RankService {
  getKills = async () => {
    const playerMatches = await PlayerMatchRepository.findAll();

    const playerByKills = playerMatches
      .map((playerMatch) => {
        return { name: playerMatch.player.name, kills: playerMatch.kills };
      })
      .sort((playerA, playerB) => {
        if (playerA.kills > playerB.kills) return -1;
        if (playerA.kills < playerB.kills) return 1;
        return 0;
      });

    return { status: 200, message: playerByKills };
  };
}

export default new RankService();
