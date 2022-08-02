import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

import { Teams } from "../enums";

import { Match } from "./match.entity";

@Entity("scoreboards")
export class Scoreboard {
  @PrimaryGeneratedColumn("uuid")
  readonly scoreboardId?: string;

  @Column({ type: "int", nullable: false })
  team1Rounds: number;

  @Column({ type: "int", nullable: false })
  team2Rounds: number;

  @Column({ nullable: false })
  winner: Teams;

  @OneToMany(() => Match, (match) => match.scoreboard, { eager: true })
  matches: Match[];
}
