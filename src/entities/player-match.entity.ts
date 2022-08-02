import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

import { Teams } from "../enums";
import { Match } from "./match.entity";
import { Multikill } from "./multikill.entity";
import { Player } from "./player.entity";

@Entity("playersMatches")
export class PlayerMatch {
  @PrimaryGeneratedColumn("uuid")
  readonly playerMatchId?: string;

  @Column()
  team: Teams;

  @Column({ type: "int" })
  kills: number;

  @Column({ type: "int" })
  deaths: number;

  @Column({ type: "int" })
  assists: number;

  @Column({ type: "int" })
  killDeathDifference: number;

  @Column({ type: "float" })
  killDeathRatio: number;

  @Column({ type: "float" })
  averageDamagePerRound: number;

  @Column({ type: "float" })
  headshotPercentage: number;

  @Column({ type: "float" })
  kast: number;

  @Column({ type: "int" })
  enemiesFlashed: number;

  @Column({ type: "int" })
  flashAssists: number;

  @Column({ type: "float", default: 0 })
  enemiesBlindTime: number;

  @Column({ type: "int", default: 0 })
  utilityDamage: number;

  @Column({ type: "int" })
  clutch1vx: number;

  @Column({ type: "int" })
  tradeKills: number;

  @ManyToOne(() => Multikill, (multikill) => multikill.playerMatches, {
    onDelete: "SET NULL",
  })
  multikill: Multikill;

  @ManyToOne(() => Player, (player) => player.playerMatches, {
    onDelete: "CASCADE",
  })
  player: Player;

  @ManyToMany(() => Match, (match) => match.playerMatches)
  matches: Match[];
}
