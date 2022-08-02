import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Platform } from "./platform.entity";
import { Player } from "./player.entity";

@Entity("platformCredentials")
export class PlatformCredentials {
  @PrimaryGeneratedColumn("uuid")
  readonly platformCredentialsId?: string;

  @Column()
  platformPlayerId: string;

  @OneToMany(() => Platform, (platform) => platform.platformCredentials)
  platformNames: Platform[];

  @OneToMany(() => Player, (player) => player.platformCredentials)
  players: Player[];
}
