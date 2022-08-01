import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { Teams } from "../enums";

import { Match } from "./match.entity";

@Entity("scoreboards")
export class Scoreboard {
  @PrimaryGeneratedColumn("uuid")
  readonly scoreboardId?: string;

  @Column({ type: "int", nullable: false })
  team1Rounds: string;

  @Column({ type: "int", nullable: false })
  team2Rounds: string;

  @Column({ nullable: false })
  winner: Teams;

  @ManyToOne(() => Match, (match) => match.scoreboard)
  matches: Match[];
}
