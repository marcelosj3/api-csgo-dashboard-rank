import { Repository } from "typeorm";

import { AppDataSource } from "../data-source";
import { Platform } from "../entities";

class PlatformRepository {
  private repo: Repository<Platform>;

  constructor() {
    this.repo = AppDataSource.getRepository(Platform);
  }

  create = (Platform: Platform) => this.repo.create(Platform);

  save = async (Platform: Platform) => await this.repo.save(Platform);
}

export default new PlatformRepository();
