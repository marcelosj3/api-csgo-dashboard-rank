import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

import { Platform } from "./platform.entity";
import { Scoreboard } from "./scoreboard.entity";

@Entity("matches")
export class Match {
  @PrimaryGeneratedColumn("uuid")
  readonly matchId?: string;

  @Column({ nullable: false })
  platformMatchId: string;

  @Column({ nullable: false })
  date: Date;

  @Column({ nullable: false })
  mapName: string;

  @Column({ nullable: false })
  matchUrl: string;

  @OneToMany(() => Platform, (platform) => platform.matches)
  platform: Platform;

  @OneToMany(() => Scoreboard, (scoreboard) => scoreboard.matches)
  scoreboard: Scoreboard;
}
