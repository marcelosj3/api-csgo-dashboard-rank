import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

import { Match } from "./match.entity";

@Entity("scoreboards")
export class Scoreboard {
  @PrimaryGeneratedColumn("uuid")
  readonly scoreboardId?: string;

  @Column({ type: "int", nullable: false })
  team1Rounds: number;

  @Column({ type: "int", nullable: false })
  team2Rounds: number;

  @OneToMany(() => Match, (match) => match.scoreboard)
  matches: Match[];
}
