import { Repository } from "typeorm";

import { AppDataSource } from "../data-source";
import { Player } from "../entities";

class PlayerRepository {
  private repo: Repository<Player>;

  constructor() {
    this.repo = AppDataSource.getRepository(Player);
  }

  create = (Player: Player) => this.repo.create(Player);

  findAll = () => this.repo.find({});

  findOne = (platformPlayerId: string) =>
    this.repo.findOne({
      where: { platformCredentials: { platformPlayerId } },
    });

  save = async (Player: Player) => await this.repo.save(Player);
}

export default new PlayerRepository();
