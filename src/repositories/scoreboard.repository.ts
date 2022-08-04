import { Repository } from "typeorm";

import { AppDataSource } from "../data-source";
import { Scoreboard } from "../entities";

class ScoreboardRepository {
  private repo: Repository<Scoreboard>;

  constructor() {
    this.repo = AppDataSource.getRepository(Scoreboard);
  }

  create = (Scoreboard: Scoreboard) => this.repo.create(Scoreboard);

  findAll = () => this.repo.find();

  save = async (Scoreboard: Scoreboard) => await this.repo.save(Scoreboard);
}

export default new ScoreboardRepository();
