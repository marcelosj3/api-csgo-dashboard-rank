import { Repository } from "typeorm";

import { AppDataSource } from "../data-source";
import { Match } from "../entities";

class MatchRepository {
  private repo: Repository<Match>;

  constructor() {
    this.repo = AppDataSource.getRepository(Match);
  }

  create = (match: Match) => this.repo.create(match);

  findAll = (players = false) => {
    if (players)
      return this.repo.find({
        relations: [
          "platform",
          "scoreboard",
          "playerMatches",
          "playerMatches.player",
          "playerMatches.player.platformCredentials",
          "playerMatches.player.platformCredentials.platform",
        ],
      });

    return this.repo.find({ relations: ["platform", "scoreboard"] });
  };

  findOne = (platformMatchId: string) =>
    this.repo.findOne({ where: { platformMatchId } });

  save = async (match: Match) => await this.repo.save(match);
}

export default new MatchRepository();
