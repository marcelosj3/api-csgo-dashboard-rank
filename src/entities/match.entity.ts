import {
  Column,
  Entity,
  JoinTable,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

import { Platform } from "./platform.entity";
import { PlayerMatch } from "./player-match.entity";
import { Scoreboard } from "./scoreboard.entity";

@Entity("matches")
export class Match {
  @PrimaryGeneratedColumn("uuid")
  readonly matchId?: string;

  @Column()
  platformMatchId: string;

  @Column()
  date: Date;

  @Column()
  mapName: string;

  @Column()
  matchUrl: string;

  @ManyToOne(() => Scoreboard, (scoreboard) => scoreboard.matches, {
    onDelete: "SET NULL",
  })
  scoreboard: Scoreboard;

  @ManyToOne(() => Platform, (platform) => platform.matches, {
    onDelete: "SET NULL",
  })
  platform: Platform;

  @OneToMany(() => PlayerMatch, (playerMatch) => playerMatch.match, {
    onDelete: "CASCADE",
  })
  @JoinTable()
  playerMatches: PlayerMatch[];
}
