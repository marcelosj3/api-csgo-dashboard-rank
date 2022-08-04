import { Repository } from "typeorm";

import { AppDataSource } from "../data-source";
import { Match } from "../entities";

class MatchRepository {
  private repo: Repository<Match>;

  constructor() {
    this.repo = AppDataSource.getRepository(Match);
  }

  create = (match: Match) => this.repo.create(match);

  findAll = () => this.repo.find({ relations: ["platform", "scoreboard"] });

  findOne = (platformMatchId: string) =>
    this.repo.findOne({ where: { platformMatchId } });

  save = async (match: Match) => await this.repo.save(match);
}

export default new MatchRepository();
