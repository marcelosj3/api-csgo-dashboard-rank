import { Repository } from "typeorm";

import { AppDataSource } from "../data-source";
import { Match } from "../entities";

class MatchRepository {
  private repo: Repository<Match>;

  constructor() {
    this.repo = AppDataSource.getRepository(Match);
  }

  create = (match: Match) => this.repo.create(match);

  find = () => this.repo.find({ relations: ["platform", "scoreboard"] });

  save = async (match: Match) => await this.repo.save(match);
}

export default new MatchRepository();
