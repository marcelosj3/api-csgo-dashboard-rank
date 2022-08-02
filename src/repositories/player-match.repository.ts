import { Repository } from "typeorm";

import { AppDataSource } from "../data-source";
import { PlayerMatch } from "../entities";

class PlayerMatchRepository {
  private repo: Repository<PlayerMatch>;

  constructor() {
    this.repo = AppDataSource.getRepository(PlayerMatch);
  }

  create = (PlayerMatch: PlayerMatch) => this.repo.create(PlayerMatch);

  findAll = () => this.repo.find({ relations: ["player"] });

  save = async (PlayerMatch: PlayerMatch) => await this.repo.save(PlayerMatch);
}

export default new PlayerMatchRepository();
