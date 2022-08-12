import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { Platform } from "./platform.entity";
import { Player } from "./player.entity";

@Entity("platform_credentials")
export class PlatformCredentials {
  @PrimaryGeneratedColumn("uuid")
  readonly platformCredentialsId?: string;

  @Column({ unique: true })
  platformPlayerId: string;

  @ManyToOne(() => Platform, (platform) => platform.platformCredentials)
  platform: Platform;

  @ManyToOne(() => Player, (player) => player.platformCredentials, {
    onDelete: "CASCADE",
  })
  players: Player;
}
