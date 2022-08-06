import { Repository } from "typeorm";

import { AppDataSource } from "../data-source";
import { Player } from "../entities";
import { PlatformNames } from "../enums";

class PlayerRepository {
  private repo: Repository<Player>;

  constructor() {
    this.repo = AppDataSource.getRepository(Player);
  }

  create = (Player: Player) => this.repo.create(Player);

  findAll = (plaftormCredentials = false) => {
    if (plaftormCredentials)
      return this.repo.find({
        relations: ["platformCredentials", "platformCredentials.platform"],
      });

    return this.repo.find({});
  };

  findOne = (platformPlayerId: string, platformName: PlatformNames) =>
    this.repo.findOne({
      where: {
        platformCredentials: {
          platformPlayerId,
          platform: { name: platformName },
        },
      },
    });

  save = async (Player: Player) => await this.repo.save(Player);
}

export default new PlayerRepository();
